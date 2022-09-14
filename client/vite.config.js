// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
      plugins: [sveltekit()],
      server: {
            port:3000
      },
      // build:{
      //       // outDir:'./build',
      // }
};

export default config;