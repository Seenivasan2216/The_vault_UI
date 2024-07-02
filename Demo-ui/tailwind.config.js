const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content:[
      './index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

// export default {
//   content: [
//     './index.html', './src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



