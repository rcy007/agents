#!/usr/bin/env node
import { existsSync } from "node:fs";
import { rename, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { cwd, exit } from "node:process";
import { randomBytes } from "node:crypto";
import { confirm, intro, isCancel, multiselect, note, outro } from "@clack/prompts";

const REPO_BASE = "https://raw.githubusercontent.com/rcy007/agents/main";
const FILES = ["AGENTS.md", "CLAUDE.md", "LINEAR.md"];

function bail(msg) {
  outro(msg);
  exit(1);
}

async function fetchFile(name) {
  const url = `${REPO_BASE}/${name}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return await res.text();
}

async function atomicWrite(targetPath, content) {
  const tmpPath = join(tmpdir(), `agents-${randomBytes(6).toString("hex")}-${basename(targetPath)}`);
  await writeFile(tmpPath, content, "utf8");
  try {
    await rename(tmpPath, targetPath);
  } catch (err) {
    if (err.code === "EXDEV") {
      await writeFile(targetPath, content, "utf8");
      await unlink(tmpPath).catch(() => {});
    } else {
      await unlink(tmpPath).catch(() => {});
      throw err;
    }
  }
}

intro("@rcy007/agents");
note(`Target directory: ${cwd()}`);

const picked = await multiselect({
  message: "Pick files to drop into the current directory",
  options: FILES.map((f) => ({ value: f, label: f })),
  initialValues: FILES,
  required: false,
});

if (isCancel(picked)) bail("Cancelled.");
if (!picked.length) bail("No files selected.");

let written = 0;
let skipped = 0;
let failed = 0;

for (const name of picked) {
  const target = resolve(cwd(), name);

  if (existsSync(target)) {
    const overwrite = await confirm({
      message: `${name} already exists. Overwrite?`,
      initialValue: false,
    });
    if (isCancel(overwrite)) bail("Cancelled.");
    if (!overwrite) {
      note(`skipped  ${name}`);
      skipped++;
      continue;
    }
  }

  try {
    const body = await fetchFile(name);
    await atomicWrite(target, body);
    note(`wrote    ${name}`);
    written++;
  } catch (err) {
    note(`failed   ${name} — ${err.message}`);
    failed++;
  }
}

outro(`Wrote ${written}, skipped ${skipped}${failed ? `, failed ${failed}` : ""}.`);
exit(failed ? 1 : 0);
