# Linear Roadmap Sync (Project Sniper)

## Source of Truth

Linear is the **primary source of truth**.
Do **not** call Linear MCP at the beginning just to check current status or list tasks. Only query Linear for the specific task you are working on (or when explicitly told to "Sync Linear"). Update Linear at the end of significant work (right before commit/push when requested).
When you need to fetch a specific task, use `list_issues` with `query` (task text) and narrow with `team`/`project`/`parentId`/`state`, then call `get_issue` with the returned ID for full details.

## Project + Team

- Project: `Investing`
- Project ID: `e76941ca-f38e-49d2-b363-6f2e40fc8e4f`
- Team: `Founding Team`
- Team ID: `fd2fcb14-53a4-4416-9cfd-3070da6c7f88`

## Milestones (UUIDs)

Create Milestones only when explicitely asked to.

## Agent Updates Issue

- Agent updates issue: `PRO-329`

## Hierarchy (Required)

- Section issues are the **parent** of their task issues.
- Tasks should not be attached directly to milestone issues.
- Keep the hierarchy consistent when creating/moving issues in Linear.

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

- Tasks are typically `Todo`.
- Sections and milestone issues are typically `Backlog` unless fully complete.
- Use `In Review` when work is paused for later revisit or advanced review.
- Use `Needs Revamp` when the feature works but does not meet the quality bar.

## Priority + Estimate Rules

- Priorities are set relative to milestone urgency and task complexity.
- Estimates use Linear’s 1–5 scale (1 = trivial, 5 = complex / multi-step).
- Do **not** default everything to the same value.
- Use `Feature` vs `Improvement` labels based on scope (new capability vs refinements).

## Sync Workflow (Required)

## Default Agent Workflow (Preferred)

1. Start when user asks to create/select an issue/task.
2. If more detail is needed, retrieve only the specific Linear issue for that task.
3. When starting work, move the task to **Planning** (scoping/clarify only). Move to **In Progress** the moment actual implementation starts (just before the first code change, migration, or real execution).
4. At the end (before commit/push), set status to **Done** if complete, **In Review** if partially complete but quality is lacking, or **In Progress** if no acceptable version was achieved.
5. Then ask the user to **confirm/override the final status** (e.g., move to **Needs Revamp**).
6. If the user overrides, immediately update the issue status in Linear to the requested state.

## Agent Comment Prefix (Required)

- Any agent-authored content in Linear must start with `Agent- ` (comments, updates, notes).
- Do **not** prefix issue titles with `Agent- `.
- Significant progress should be captured as a comment on `PRO-329` (Agent Updates).
- Issue comments should be reserved for **issue-specific** updates only.

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

1. **Add a completion comment** to the specific issue (not just PRO-329) explaining:
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
