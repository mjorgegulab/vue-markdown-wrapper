import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import banner from 'vite-plugin-banner'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true }),
    banner(`/**\n * ${pkg.name} v${pkg.version} - ${pkg.description}\n * Copyright (c) ${new Date().getFullYear()}, ${pkg.author.name}. (MIT Licensed)\n * ${pkg.homepage}\n */`),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueMarkdown",
      fileName: "vue-markdown",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
