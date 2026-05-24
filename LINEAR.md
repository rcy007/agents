# Linear Roadmap Sync (Project Sniper)

## Source of Truth

Linear is the **primary source of truth**.
Do **not** call Linear MCP at the beginning just to check current status or list tasks. Only query Linear for the specific task you are working on.
When you need to fetch a specific task:

- If you already know the identifier (e.g. `PRO-123`), call `get_issue` directly with that identifier — no search step needed.
- If you only have a description, use `list_issues` with `query` (task text) and narrow with `team`/`project`/`parentId`/`state`, then `get_issue` on the match.
- For the comment thread, call `list_comments` separately — `get_issue` returns metadata only.

## Project + Team

- Project: `Investing`
- Team: `Founding Team`

## Milestones

Create Milestones only when explicitely asked to.

## Hierarchy

- Pick the shallowest grouping that still makes the project navigable.
- Be consistent within a project — don't mix depths.
- Ask before introducing a new layer (milestone, section/parent issue).

## Status Mapping

### Current Linear Statuses

- Backlog
- Todo
- Planning
- In Progress
- In Review
- Complete - Needs Polish
- Needs Revamp
- Done
- Canceled
- Duplicate

Notes:

- Use `In Review` when work is paused for later revisit or advanced review.
- Use `Needs Revamp` when the feature works but does not meet the quality bar.

## Priority, Estimates, Labels

- Don't default everything to the same priority/estimate — differentiate.
- Use `Feature` vs `Improvement` labels based on scope (only if the project uses them).

## Status Transitions

- On pickup: move to **Planning** (scoping). Move to **In Progress** the moment real implementation begins.
- On finish: see *Issue Completion Requirements* below for the close-out flow.

## GitHub Workflow

Use Linear's GitHub integration to keep issues and PRs linked:

- Prefer branches copied from the Linear issue (`Cmd/Ctrl` + `Shift` + `.`) so the branch name includes the issue ID.
- If the branch was not copied from Linear, include the issue ID in the PR title, e.g. `PRO-123`.
- For status-closing work, include a closing magic word plus the issue ID in the PR title or description, e.g. `Fixes PRO-123`.
- If the bare issue ID does not link cleanly, use the full Linear issue URL as the fallback, e.g. `Fixes https://linear.app/lich/issue/PRO-123/title`.
- For related-but-not-closing work, use a non-closing magic word, e.g. `Refs PRO-123` or `Related to PRO-123`.
- Magic words in PR comments do not link issues; put them in the PR title or description.
- Multiple Linear issues can be linked from one PR description, e.g. `Fixes PRO-123, PRO-124`.
- Multiple PRs can link to one Linear issue; Linear waits for the final linked PR to reach the configured workflow state before applying the resulting issue status transition.

Closing magic words:

`close`, `closes`, `closed`, `closing`, `fix`, `fixes`, `fixed`, `fixing`, `resolve`, `resolves`, `resolved`, `resolving`, `complete`, `completes`, `completed`, `completing`, `implements`, `implemented`, `implementing`.

Non-closing magic words:

`ref`, `refs`, `references`, `part of`, `related to`, `contributes to`, `toward`, `towards`.

Automation notes:

- Closing magic words move linked issues through the configured PR/commit workflow, including completion when merged to the default branch.
- Non-closing magic words still link the PR and can move issues through earlier workflow states, but do not auto-complete the issue on merge.
- Team-level PR automation is configured in Linear under issue statuses and automations; defaults usually move linked issues to **In Progress** when PRs open and **Done** when PRs merge.

## Chat Reporting Requirements (Required)

- After any Linear update, report back in chat with:
  - Clickable issue links (format: `https://linear.app/lich/issue/PRO-123/`)
  - Issue IDs
  - Very short summary of what was posted/updated
  - Status changes (if any)

### After work is completed

Update the relevant Linear issue(s): status, notes, estimate/priority if needed.

## Issue Completion Requirements (MANDATORY)

**Never just flip an issue to Done.** Every status change must include context.

### When marking an issue as Done

1. **Add a completion comment** to the specific issue explaining:
   - What was done to complete it
   - How it was accomplished (approach, tools, techniques)
   - Key files changed or created
   - Relevant commit hash(es)
   - Any caveats or follow-up considerations

2. **Check the issue description** - if empty, update it with a succinct explanation of what the task actually entailed.

3. **Then** update the status to Done.

### Example of a proper completion comment

```markdown
Agent- Completed by implementing X using Y approach.

**What was done:**
- Created foo.ts with bar functionality
- Updated baz.tsx to integrate with foo
- Added 15 unit tests covering edge cases

**Key files:** `lib/foo.ts`, `components/baz.tsx`, `__tests__/foo.test.ts`

**Commit:** `abc1234`

**Notes:** Consider adding integration tests in a follow-up task.
```

### Why this matters

- Future agents/developers need context to understand what was done
- The user should be able to review Linear and see exactly how work was completed
- Empty Done issues are useless for project history and auditing

## Adding New Milestones

- Create milestone when the new issue/task assigned feels pretty unrelated to previous task/issues in the current chat session.
- Explicitely ask for permission; if you deem the new issue to be assigned a new milestone, and before creating the milestone itself.
