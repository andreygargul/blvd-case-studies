---
description: Analyze staged git changes and generate a commit message. Uses present tense, explains why changes were made, and prefixes with an emoji category.
allowed-tools: Bash(git *)
---

Analyze the staged changes and write a commit message.

## Context

Staged diff:
!`git diff --cached`

Staged files:
!`git diff --cached --name-only`

## Instructions

**1. Understand the changes**
Read the diff carefully. Identify not just *what* changed but *why* — what problem it solves, what it enables, or what it fixes.

**2. Choose an emoji prefix**
Pick exactly one based on the primary nature of the change:

| Emoji | Category |
|-------|----------|
| ✨ | New feature |
| 🐛 | Bug fix |
| ♻️ | Refactor |
| 📝 | Documentation |
| 💄 | Styling / formatting |
| ✅ | Tests |
| ⚡️ | Performance |

**3. Write the commit message**

Format:
```
<emoji> <short summary in present tense, max 72 chars>

<body: explain WHY — what problem this solves or what it enables.
Wrap at 72 chars. Plain prose, no bullet points.>
```

Rules:
- Subject line: present tense, imperative mood ("Add", "Fix", "Extract" — not "Added" or "Adds")
- Body: motivation and context, not a restatement of the diff
- Omit the body if the subject line is fully self-explanatory

**4. Output**
Print the commit message, then ask: "Commit with this message? (yes/no)"

If confirmed, run:
```bashP
git commit -m "<message>"
```

If declined, do nothing.
