# ~/.codex/AGENTS.md

# Working rules

- Be concise. Do not explain routine actions unless asked.
- Inspect the relevant files before editing.
- Make the smallest complete change that solves the task.
- Reuse existing architecture, components, utilities, and conventions.
- Do not refactor unrelated code.
- Do not add dependencies unless clearly necessary.
- Prefer simple, maintainable solutions over abstractions.
- Preserve backward compatibility unless the task requires otherwise.
- Never expose secrets or commit credentials.

# Workflow

1. Understand the requested outcome and inspect only relevant files.
2. For simple tasks, implement directly.
3. For complex or risky tasks, give a short plan before editing.
4. Implement the complete change.
5. Run the narrowest relevant checks first.
6. Fix failures caused by the change.
7. Finish with:
   - changed files
   - checks run
   - remaining risks

# Communication

- Keep updates and final responses short.
- Do not repeat the task.
- Do not paste complete files unless requested.
- Do not provide tutorials unless requested.
- Ask a question only when a missing decision would materially change the implementation.
- Otherwise make the safest reasonable assumption and state it briefly.
