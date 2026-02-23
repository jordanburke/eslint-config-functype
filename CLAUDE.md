# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

eslint-config-functype is a curated ESLint configuration bundle for functional TypeScript programming. This config combines and configures rules from established ESLint plugins rather than creating custom rules.

**Development Requirements:** Node.js 22.0.0 or higher (for building/testing only - end users can run the plugin on any Node version supported by ESLint).

## Commands

### Build and Development

```bash
# Full validation pipeline (format, lint, typecheck, build)
pnpm validate

# Individual steps
pnpm build          # Build with tsdown
pnpm lint           # Lint the codebase
pnpm format         # Format code with prettier
pnpm format:check   # Check formatting without modifying
pnpm typecheck      # Type check with tsc

# Watch mode for development
pnpm dev
```

### CLI Tools

```bash
# List all configured rules
pnpm run list-rules

# Show rule options/configuration
pnpm run list-rules:verbose

# Show usage examples
pnpm run list-rules:usage

# Show help
pnpm run cli:help
```

### Package Management

```bash
# Install dependencies
pnpm install

# Prepare package for publishing (runs validate)
pnpm run prepare
```

## Architecture

### Core Philosophy

This plugin follows **composition over recreation** - it curates and combines existing ESLint rules rather than creating new ones. This approach provides:

- Less maintenance burden
- Better rule quality and edge case handling
- Community-driven improvements

### Package Structure

- **`src/index.ts`**: Main plugin entry point, exports configurations
- **`src/configs/`**: ESLint configuration presets (recommended, strict)
- **`src/cli/`**: Command-line tools for rule inspection
- **`dist/`**: Compiled JavaScript output (ESM)

### Plugin Design

- **ESLint 9+ Flat Config**: Uses modern flat config format
- **ESM Only**: Pure ESM package (`"type": "module"`)
- **Zero Custom Rules**: Only configures existing community rules
- **Peer Dependencies**: Requires `@typescript-eslint/eslint-plugin`, `eslint-plugin-functional`, etc.
- **Binary**: Provides `functype-list-rules` CLI command

### Rule Sources

The plugin curates rules from:

- **eslint-plugin-functional**: Core functional programming rules
- **@typescript-eslint/eslint-plugin**: TypeScript-specific patterns
- **ESLint core**: JavaScript immutability basics
- **eslint-plugin-prettier**: Code formatting
- **eslint-plugin-simple-import-sort**: Import organization

### Configuration Tiers

- **`recommended`**: Balanced functional programming (warnings for mutations)
- **`strict`**: Maximum enforcement (errors for all functional violations)

## Key Implementation Details

### Build System

- **ts-builds + tsdown**: Standardized build tooling via ts-builds
- **ESM Output**: Pure ESM (`"type": "module"`)
- **Two Build Targets**: Library entries (with dts) and CLI entry (with shebang banner)
- **Source Maps**: Generated for better debugging experience
- **Declaration Files**: Automatic TypeScript `.d.ts` generation
- **Watch Mode**: Available for development (`pnpm dev`)

### Flat Config Format

The plugin exports ESLint 9.x flat config objects with rule definitions only - no plugins or parser configuration (users must provide these).

### CLI Architecture

The `list-rules.ts` CLI tool dynamically loads built configurations and provides formatted rule inspection with:

- Color-coded output by severity
- Grouping by rule source
- Summary statistics
- Usage examples
- Dependency validation

### TypeScript Configuration

- Extends `ts-builds/tsconfig` base
- Target: ESNext with ESM modules via tsdown
- Declaration files generated automatically
- `emitDeclarationOnly: true` (tsdown handles JS compilation)

### ESLint Configuration

Uses `ts-builds/eslint` base config (NOT the project's own functype config) to avoid circular dependency since ts-builds depends on eslint-config-functype.
