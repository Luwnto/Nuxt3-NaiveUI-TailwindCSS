/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './src/app.vue',
  ],
  theme: { extend: {} },
  plugins: [],
}

