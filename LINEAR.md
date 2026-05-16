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
- Project ID: `e76941ca-f38e-49d2-b363-6f2e40fc8e4f`
- Team: `Founding Team`
- Team ID: `fd2fcb14-53a4-4416-9cfd-3070da6c7f88`

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
