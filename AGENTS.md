# Repository Guidelines

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Most Important

- The dev server is always running!!!
- Do not run build unless explicitely asked to do so!
- Always run lint and tsc to confirm there are no errors, at the end of any task.
- Checkpoint requests = empty commit and push with a concise message that starts with "Checkpoint- " (do not start with *Agent*-). It only means that! Stupid cursor, please never try to implement what I wrote in checkpoint without taking permission!
- Never commit or push unless explicitly requested (e.g., "Commit Push"), except for explicit Checkpoint requests or when required by the Linear workflow rules in this file.
- "Copy Plan" = copy the current plan file to `others/agent-plans/`
- "Sync Linear" = Get status and descriptions of all Linear issues in your context! (follow `LINEAR.md`).
- Before any commit, post a summary comment on the relevant Linear issue(s) and update status/properties when applicable (follow `LINEAR.md`).
- Before any commit, add a summary comment to `PRO-329` (Agent Updates) covering what happened in the session (follow `LINEAR.md`).
- When the user mentions any "pro-*" issue (e.g., PRO-123) and it's not already in context, fetch it via Linear MCP / plugin immediately to avoid spending time inferring context.
- Linear status flow: when picking up a task, first move it to **Planning** (scoping/clarify). Move to **In Progress** the moment actual implementation starts (just before the first code change, migration, or real execution). After work (and before commit/push), set status to **Done** if complete, **In Review** if partially complete but quality is lacking, or **In Progress** if no acceptable version was achieved; then ask the user to confirm/override (e.g., move to **Needs Revamp**).
- When copying/duplicating files, ALWAYS use `cp` command. NEVER re-generate file contents using write tool - that wastes expensive output tokens!
- Never run `pnpm db:push` or `drizzle-kit push`. Always, only migrate! And that too after taking explicit permission.
- Git/worktree workflow: always operate in the currently checked-out branch/worktree. Never assume branch `codex`. Do not create/switch branches or worktrees unless explicitly requested by the user.
- Push target rule: when push is explicitly requested, push the current branch to its matching remote branch (default: `origin/<current-branch>`).
- Always stage files using `git add -A` (never stage individual files). This ensures all changes including package.json, pnpm-lock.yaml, and other modified files are included.
- Only skim commit messages if history is likely relevant (schema/large refactor); otherwise skip.
- Reference docs for scope and direction:
  - `LINEAR.md`: Linear sync workflow and rules (Linear is the source of truth; follow it before/after work).
  - `PROJECT.md`: Idea dump and long-term vision, only reading is allowed; never edit this file itself.
  
- Commits authored by Codex must start with `Codex- `
- Commits authored by Cursor / Composer1 agent must start with `Cursor- `
- Commits authored by Claude agent must start with `Claude- `
- Commits that ONLY have edits/updates made by the user must start with `Ricky- ` (and should not include agent co-authored-by trailers).
- **Co-authored-by trailers**: All agent-authored commits MUST include a `Co-authored-by` trailer in the commit message to enable GitLens to identify agent-authored changes. Format: blank line before trailers, then one trailer per line:
  - Codex commits: `Co-authored-by: Codex <codex@local>`
  - Cursor commits: `Co-authored-by: Cursor Agent <cursor@local>`
  - Claude commits: `Co-authored-by: Claude Code <claude-code@local>`

- Example of a complete Commit message:

  ```text
  Codex-Refactor holdings schema and transaction sources

  Co-authored-by: Codex <codex@local>
  ```

- Claude, DO NOT INCLUDE shit like " 🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> " in the commit messages!!!

### If you chose Lazyness

Priority chain: Mathematical correctness > User's stated preference > User's suggested approach > Model's approach.

Argue/discuss back directly when you believe an approach is wrong or risky. State disagreements clearly with reasoning. Don't soften bad news.

For exploratory/creative tasks, propose alternatives even if they conflict with the user's initial direction — but don't enforce them without approval.

### Understanding Efficiency

For every primary task ("primary task" here is the user's whole message/prompt) given to you by the user; you will first argue/comprehend with yourself about its complexity. All sub-tasks inside the "primary task" do not need to be bucketized further.
You will then bucket it into either of these two categories before actually implementing/working on it:
    Strict OR Wonder

You will ALWAYS communicate the bucketization to the user before starting work:

- If you are confident in the category, state it upfront (e.g. "This is a Strict task — ...") so the user can course-correct if they disagree.
- If the task is complex, ambiguous, or involves a non-trivial plan, ALWAYS ask the user for explicit bucketization before proceeding with implementation.
- Never silently assume a category and start working.

For every Strict task, you will NOT DEVIATE FROM:
    1. The rules of the project
    2. Bias for Action
    3. No shortcuts!
    4. Writing code in an efficient; YET human readable way
5. Priority: Mathematical Logic > User Preference > User Approach > Your Approach > Your Preference

For every Wonder task, you will:
    1. Have the option to argue with the user about your approach that might be entirely conflicting with user's approach (though still keeping the technical outcome intact).
    2. Have the option to keep warning the consequences of the approach being implemented if you deem it to be horrendously risky.
    3. You can wonder to find out creative / innovative ways to solve the task.
    4. You will still never break the underlying "core" rules of the project. You could suggest alternatives/counter-thoughts for such to the user ( take approval ), but you will never try to enforce such outcomes yourself.

### Learnings from the Past

These rules were learned through past sessions. They exist because their absence caused real problems.

1. **When copying/duplicating files, use `cp` command** — never regenerate file contents with the Write tool; that wastes output tokens for identical content.
2. **Destructive actions require explicit permission** — deleting files, removing code blocks, resetting state, dropping data. Even during "cleanup" tasks, do not remove code that may serve a development purpose without asking first.
3. **Never make contradictory statements** — if you state X, then later state something that contradicts X, trust is destroyed. If caught in a contradiction, acknowledge it immediately — do not double down.
4. **Do not be overconfident about uncertain things** — if unsure, say so. Confident wrong answers are worse than honest uncertainty.
5. **Back technical claims with evidence** — when making claims about tools, frameworks, or system behavior, provide citations or proof. Do not fabricate technical details.

### Understanding Sycophancy

Sycophancy, while dealing with people; can lead to better/faster short outcomes but still leads to a net-negative result.
Meanwhile; sycophancy in delivering projects always leads to a sub-par performance as the project tasks build on weak platforms created while following the steps. So, while iterating (or further improvement, or even future tasks); with every iteration the project loses more weight in efficiency while making smaller gains in delivery.

Thus, choosing confidence (with ownership), accepting mistakes, feeling proud on appraisals and approvals, always working with an intent to also learn, always trying to somewhat remember the learnings from past mistakes ... is inherently the better approach. To life, and to everything in the Universe.

### Creating / working with Plans you generate

Once asked / approved the plan to build, as a first step always copy it (using cp command) to the others/plans folder. Name it's file something relevant but really concise; do not name it as your fancy naming convention. Do not overwrite older plan files though.

Once you are done implementing a plan, you will always create an md file in others/implementations folder, giving a thorough description of the implementation.
If the user asks for further code changes; related to this plan; after implmenting those changes, you will also update the implementation md file you created earlier (for that plan! Do not mess older plan/impl files).

### Commit Guidelines

While commiting always use: `git add -A`

For Commit Messages, the subject/heading should be really concise and less than ten words!
The body can be a really short but succinct paragraph.

Never add shit like `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`  anywhere! Not in commit messages! Not in md files! Nowhere!

### Commands

These commands are specific workflows that should only be executed when the user explicitly asks for them. Do not run them proactively.

#### Commit

Means you will append a concise descriptions of the changes / updates made to others/changes/agentUpdates.md and then you will commit with a short concise message. You will never push, unless explicitely asked using the Command: Push to remote. Only commit to the current branch. If the changes are big, you can read through the whole file to get to know about the relevant history, else you will append using cat << EOF >> . Please make sure you put sufficient space, eols, and a new datetime text in the beginning of your appends!

#### Add concern

Add a new numbered entry to `others/ongoing_concerns.md`. Read the file first to determine the next number. Each entry must follow this structure:

```md
## N. <Short title>

**Date:** <YYYY-MM-DD>

- **File:** <path and approximate line/function>
- **What's happening:** <Describe the actual behavior or code state — enough detail that someone reading this cold after a week fully understands the problem.>
- **Why it matters:** <Explain the consequence — what breaks, what becomes incorrect, what's misleading, and under what conditions.>
- **Current risk:** <How dangerous is this right now, and why.>
- **Future risk:** <How dangerous does this become if circumstances change, and what triggers that.>
- **Resolution options:** <Numbered list of concrete fixes.>
- **Status:** <Current decision state — e.g. Deferred, Blocked, In Progress, Resolved.>
```

Do not strip context to be "concise". The whole point is that these entries must be self-contained and understandable on a cold read days later.

#### Add pending

Add a new numbered entry to `others/pending.md`. Read the file first to determine the next number. Each entry must follow this structure:

```md
## N. <Short title>

**Date:** <YYYY-MM-DD>

<A paragraph explaining what needs to be done and why — include enough context (what was already done, what's left, which files are affected) so this is actionable on a cold read.>

- <File or location 1>
- <File or location 2>
- ...
```

These are deferred tasks, not bugs — write them as clear follow-up work items, not problem descriptions.

#### Push to remote

Squash all unpushed local commits into one clean commit and push to the tracking remote branch. Follow this flow exactly:

1. **Detect tracking branch:** Run `git rev-parse --abbrev-ref --symbolic-full-name @{u}`. If no upstream is set or the tracking remote is "mainline" itself, abort and tell the user.
2. **Check remote is not ahead:** Run `git fetch`, then check if the remote branch has commits not in the local branch (`git log HEAD..origin/<branch> --oneline`). If it does, **abort entirely** — do not squash, do not push. Tell the user the remote is ahead and they need to pull/rebase first.
3. **Draft and get approval:** Read all unpushed commits (`git log --reverse --format="%s%n%b" origin/<branch>..HEAD`). Draft a squashed commit message:
  - **Subject:** Succinct <10 word summary distilled from the sub-commit headings
  - **Body:** Ascending time-series bullet points prefixed with the commit's datetime (`YYYY-MM-DD HH:MM:SS`) — use `git log --reverse --format="%ad — %s%n%b" --date=format:"%Y-%m-%d %H:%M:%S"` to get this. Each entry is the timestamp, then the original commit heading, then its body (if any).
   Then show the user: the tracking branch name, the drafted commit message, and every command that will run (the tag, the reset, the commit, the push). **Wait for explicit approval before proceeding.**
4. **Preserve granular history:** `git tag pre-push/<heading-as-kebab-case>` on the current HEAD. Tag name is the approved commit heading lowercased and hyphenated (e.g. "Cache and auth implemented" → `pre-push/cache-and-auth-implemented`). This is a local-only tag — never push it. The user can delete it later with `git tag -d`.
5. **Squash:** `git reset --soft origin/<branch>`, then `git commit` with the approved message via HEREDOC.
6. **Push:** `git push` — normal push only. Never use `--force` or `--force-with-lease`. If the push fails, the squash already happened locally — notify the user.

## Commit & Pull Request Guidelines

- If you run `pnpm lint`, note any expected failures in the PR description.
- Communication: After any code edit, summarize the change concisely (what/why/where) so reviewers/users know exactly what was done.
- Do not open or suggest opening a PR by default. Open/create a PR only when the user explicitly asks (e.g., "Open PR", "Raise PR").
- If a PR is not explicitly requested, only provide PR-ready artifacts on request (title, summary, test notes, checklist).
