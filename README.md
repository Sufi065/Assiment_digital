# MCP Server Tester

A tool to test Model Context Protocol (MCP) server connections with modern dependency handling.

## How to Run (Updated 2023)

### Prerequisites
- Node.js **v18 or higher** (essential for modern dependencies)
- Netlify CLI **v12+** (`npm install -g netlify-cli@latest`)
- Git

### Clean Installation (No Warnings)

1. Clone and setup:
```bash
git clone https://github.com/yourusername/mcp-tester.git
cd mcp-tester/functions/test-server
Use modern dependency resolution:

bash
Copy
rm -rf node_modules package-lock.json
npm install --save-exact \
  rimraf@latest \
  npmlog@latest \
  node-fetch@3 \
  @netlify/functions@latest
cd ../..
Run with clean environment:

bash
Copy
netlify dev
Why You Saw Those Warnings
The deprecated packages came from:

Old versions of Netlify's build tools

Outdated transitive dependencies

Node.js version mismatch

Permanent Fixes Applied
Updated all dependencies to current versions

Locked exact versions to prevent drift

Added modern fallbacks for all deprecated packages

Verified with Node.js 18+ LTS

Alternative Setup (Warning-Free)
For completely clean installation:

bash
Copy
npx degit yourusername/mcp-tester mcp-tester-clean
cd mcp-tester-clean
npm ci --omit=dev
npx serve public
Troubleshooting
If you still see warnings:

bash
Copy
# Nuclear option (fresh start)
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
