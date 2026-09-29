#!/usr/bin/env bash
# Claude Code cloud session setup (run by the SessionStart hook in .claude/settings.json).
# No npm dependencies: build.js and the node:test suites use only Node built-ins.
set -euo pipefail

command -v node >/dev/null || { echo "cloud-setup: node is required" >&2; exit 1; }
command -v python3 >/dev/null || { echo "cloud-setup: python3 is required" >&2; exit 1; }
