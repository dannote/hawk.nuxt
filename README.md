# @hawk.so/nuxt

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Hawk](https://hawk.so) error tracker integration to Nuxt app

## Features

- ⛰ Easy installation
- 🚠 Tracking errors across your Nuxt App
- 🌲 Composable for manual sending erros and logs

## Quick Setup

Install the module with one command:

```bash
npx nuxi module add @hawk.so/nuxt
```

Then connect and configure to your `nuxt.config.ts`. Pass there an Integration Token you got from Hawk project. 
You can pass it directly or use .env file wich is supported by Nuxt out of the box.

```ts
export default defineNuxtConfig({
  modules: [
    '@hawk.so/nuxt'
  ],
  hawk: {
    tokenClient: process.env.HAWK_TOKEN_CLIENT,
  },
})
```


## Contribution

<details>
  <summary>Local development</summary>

  Copy .env.example to the .env file in /playground. Put Hawk Integration Token in there.
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@hawk.so/nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@hawk.so/nuxt

[license-src]: https://img.shields.io/npm/l/@hawk.so/nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@hawk.so/nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
