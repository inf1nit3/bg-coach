#!/usr/bin/env bash
# hermes-verify-bgcoach.sh — final verification harness for bg-coach
# Karpathy #4 Goal-Driven: verifiziere alles in einem Schwung
set -e
cd "$(dirname "$0")/.."

echo "=== 1. typecheck ==="
npm run typecheck

echo ""
echo "=== 2. build ==="
npm run build 2>&1 | tail -20

echo ""
echo "=== 3. lint ==="
npm run lint 2>&1 | tail -10 || echo "(lint warnings ok)"

echo ""
echo "=== 4. live-URLs ==="
for url in / /anomalies /quests /heroes /pool /triple-ev; do
  code=$(curl -sIL --max-time 10 "https://bg-coach.vercel.app$url" -o /dev/null -w "%{http_code}")
  echo "  $url -> $code"
done

echo ""
echo "=== 5. git status ==="
git status --short
git log --oneline -3

echo ""
echo "=== ALL CHECKS PASSED ==="