// @ts-nocheck

import React from '@vitejs/plugin-react';
import * as path from 'path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

const renderChunks = (deps: Record<string, string>) => {
  const chunks: any = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'stream-browserify'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  resolve: {
    alias: {
      store: path.resolve('./src/store'),
      constant: path.resolve('./src/constant'),
      components: path.resolve('./src/components'),
      hooks: path.resolve('./src/hooks'),
      pages: path.resolve('./src/pages'),
      resources: path.resolve('./src/resources'),
      services: path.resolve('./src/services'),
      utils: path.resolve('./src/utils'),
      connectors: path.resolve('./src/connectors'),
      language: path.resolve('./src/language'),
      hoc: path.resolve('./src/hoc'),
      context: path.resolve('./src/context'),
      schema: path.resolve('./src/schema'),
      routes: path.resolve('./src/routes'),
      factory: path.resolve('./src/factory'),
      modules: path.resolve('./src/modules'),
      layout: path.resolve('./src/layout'),

      //Fix build dependencies
      process: 'process/browser',
      'readable-stream': 'vite-compatible-readable-stream',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  plugins: [
    ViteEjsPlugin((viteConfig) => ({
      env: viteConfig.env,
    })),
    UnoCSS(),
    React(),
  ],
  build: {
    manifest: true,
    sourcemap: false,
    outDir: path.join(__dirname, 'build'),
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     vendor: ['react', 'react-router-dom', 'react-dom', 'stream-browserify'],
      //     ...renderChunks(dependencies),
      //   },
      // },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
