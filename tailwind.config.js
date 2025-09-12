export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // muy importante
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
