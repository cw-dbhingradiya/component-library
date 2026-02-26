# Component Library

React component library (Sidebar, etc.) built with TypeScript and Vite.

## Using this library in another repo

1. **Install**

   ```bash
   npm install @cw-dbhingradiya/component-library
   ```

2. **Import components and types**

   ```tsx
   import {
     Sidebar,
     type SidebarTab,
     type TabId,
   } from "@cw-dbhingradiya/component-library";
   ```

3. **Import styles (required for Tailwind styles)**

   ```tsx
   import "@cw-dbhingradiya/component-library/style.css";
   // or
   import "@cw-dbhingradiya/component-library/dist/style.css";
   ```

4. **Example usage**
   ```tsx
   const tabs: SidebarTab[] = [
     { id: "home", label: "Home" },
     { id: "settings", label: "Settings" },
   ];
   <Sidebar
     tabs={tabs}
     activeTabId="home"
     onTabClick={(id) => setActiveTabId(id)}
   />;
   ```

The consuming app must have `react` and `react-dom` installed (peer dependencies).

---

## Publishing to npm

1. **Build**: Run `npm run build:lib` (also runs automatically on `npm publish` via `prepublishOnly`).
2. **Login**: `npm login` (one-time).
3. **Publish**: `npm publish`

After publishing, consumers can install with:
`npm install @cw-dbhingradiya/component-library`

---

## Development (this repo)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

Hello
