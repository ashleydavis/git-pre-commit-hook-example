# git-pre-commit-hook-example

An example of using a Git pre-commit hook to prevent broken changes being committed.

**This repository ships with a failing test on purpose.** That is the demo: try to commit, get refused, fix one word, commit again.

Nothing to install. The tests run on Node's own test runner.

## What's in it

| File | What it is |
| --- | --- |
| [`src/greet.js`](src/greet.js) | The application: one function, currently wrong |
| [`test/greet.test.js`](test/greet.test.js) | One test, run by Node's built-in test runner |
| [`scripts/test-everything.sh`](scripts/test-everything.sh) | Runs the tests |
| [`.githooks/pre-commit`](.githooks/pre-commit) | Runs the above before every commit and refuses the commit if it fails |
| [`scripts/install-hooks.sh`](scripts/install-hooks.sh) | Points git at that hook, once per clone |
| [`CLAUDE.md`](CLAUDE.md) | Tells a coding agent it may not bypass the hook |

## Try it

Install the hook. Nothing does this for you, and it is once per clone:

```bash
./scripts/install-hooks.sh
git config --get core.hooksPath   # prints .githooks
```

Change something and try to commit. The commit is refused, because `greet` says "Hi" and the test expects "Hello":

```bash
echo "// A change." >> src/greet.js
git add -A
git commit -m "Change the greeting"
```

Nothing was lost: `git log` and `git status` are exactly as they were. Fix the code, one word, then commit again and it goes through:

```bash
sed -i 's/Hi, /Hello, /' src/greet.js
git add -A
git commit -m "Fix the greeting"
```

## Notes

The hook reports and refuses. It never edits or stages anything, so a refused commit leaves your working copy exactly as it was.

`git commit --no-verify` skips the hook. That is git's own flag and there is no way to turn it off, so treat the hook as a wall for the mistakes nobody meant to make, not as a lock against someone determined to get past it. [`CLAUDE.md`](CLAUDE.md) is how you tell a coding agent to leave that flag alone.

Undo the install with `git config --unset core.hooksPath`.

## Where this goes next

Running the whole suite on every commit is fine for a project this size and stops being fine as it grows. The companion project, `what-changed-example`, is the same idea with only the affected work run on each commit, using [what-changed](https://github.com/ashleydavis/what-changed).
