# Working agreement

Work token-efficiently.

- Read only files relevant to the current task.
- Search before reading large files.
- Do not repeatedly reread unchanged files.
- Do not inspect unrelated directories.
- Prefer targeted grep/search over broad repository scans.
- Keep responses concise.
- Do not repeat completed work or previous findings.
- Do not explain routine commands unless necessary.
- Run only tests/checks relevant to the changed area first.
- Avoid spawning subagents unless they provide clear value.
- Prefer existing project knowledge over rediscovering architecture.
- After completing a task, report only:
  1. what changed
  2. verification result
  3. remaining issue, if any
- Ask before performing broad audits or repository-wide exploration.
