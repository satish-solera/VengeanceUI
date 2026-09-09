# Turborepo Setup Guide for VengeanceUI

This guide explains the Turborepo configuration and how to use it effectively.

## Overview

VengeanceUI is now configured as a Turborepo monorepo with the following workspace structure:

```
root/
├── packages/
│   ├── cli/          # VengeanceUI CLI tool
│   └── mcp/          # MCP server for component registry
└── apps/
    └── web/          # Main Next.js application (root level for now)
```

## Key Files

### `turbo.json`
Defines Turborepo tasks and caching strategy:
- **build**: Builds all packages in correct dependency order with caching
- **dev**: Starts development servers across all packages
- **lint**: Runs linters in parallel
- **test**: Runs tests in parallel

### `package.json` (Root)
Updated with Turbo scripts:
```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test"
  }
}
```

### `.turboignore`
Specifies files/directories to ignore during Turbo operations

## Usage

### Development
```bash
# Start dev servers for all packages
npm run dev
```

### Building
```bash
# Build all packages with caching
npm run build

# Build specific package
cd packages/cli && npm run build

# Build with no cache (clean build)
npm run build -- --no-cache
```

### Linting
```bash
# Lint all packages
npm run lint
```

### Testing
```bash
# Test all packages
npm run test
```

## Dependency Management

Turborepo automatically handles dependencies between packages:

- `^build` in turbo.json means "wait for dependencies to build first"
- Package interdependencies are detected from workspace configuration
- CLI and MCP packages have their own build scripts that run before the main app

## Caching

Turborepo caches:
- Build outputs in `dist/`, `.next/`, `build/**`
- Lint outputs
- Test results

Cache is invalidated when:
- Source files change
- `package.json` or `package-lock.json` changes
- Environment variables listed in `globalEnv` change

## Next Steps

1. **Configure package build scripts**:
   - Ensure each package's `build` script is properly configured
   - CLI: `tsc` (TypeScript compilation)
   - MCP: `npm run generate-index && tsc`

2. **Add lint tasks** to package.json files if needed:
   ```json
   "lint": "eslint src --fix"
   ```

3. **Add test tasks** (optional):
   ```json
   "test": "jest"
   ```

4. **Remote Caching** (optional, for CI/CD):
   - Sign up at https://vercel.com/docs/monorepos/turborepo
   - Set `TURBO_TOKEN` and `TURBO_TEAM` environment variables in CI/CD

5. **Monitor performance**:
   ```bash
   npm run build -- --profile
   ```

## Troubleshooting

### Build fails for specific package
```bash
# Debug single package
cd packages/cli && npm run build
```

### Clear Turbo cache
```bash
rm -rf .turbo
npm run build -- --no-cache
```

### Dependencies not found
```bash
# Reinstall all packages
rm -rf node_modules package-lock.json
npm install
```

## Performance Metrics

Turborepo provides insights via:
```bash
# Build with performance profile
npm run build -- --profile

# Analyze the output in `.turbo/runs/<run-id>`
```

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Monorepo Best Practices](https://turbo.build/repo/docs/core-concepts/monorepos)
- [Caching Strategy](https://turbo.build/repo/docs/core-concepts/caching)
