#!/usr/bin/env bash
#
# Runs the tests. Exits non-zero if they fail.
#
# This is a script rather than a line in the hook, so the same checks can be run by hand, by the
# hook and by CI, and all three run the same thing.
#
# No `cd` here: npm walks up to the nearest package.json and runs from there, so this works from any
# directory. A command that cares about the working directory would need one.
#
set -euo pipefail

npm test
