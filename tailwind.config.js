//module.exports = {   ///configuracion antiguaaaaa aa
//  content: [
//    './app/**/*.{js,ts,jsx,tsx}',
//    './components/**/*.{js,ts,jsx,tsx}',
//    './pages/**/*.{js,ts,jsx,tsx}',
//  ],
//  theme: {
//    extend: {},
//  },
  //plugins: [],
//};



//** @type {import('tailwindcss').Config} */
//module.exports = {
//  content: [    //configuracion nueva pero cambia para aplicar los estilos de tailwind
//    "./src/**/*.{js,ts,jsx,tsx}",
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
//};



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

