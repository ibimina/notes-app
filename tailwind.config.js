/** @type {import('tailwindcss').Config} */
export const purge = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const darkMode = false;
export const theme = {
  extend: {
    backgroundImage: {
      'edit-image': "url('/src/assets/icons8-edit-16.png')",
      'delete-image': "url('/src/assets/icons8-delete.svg')"
    }
  }
}
export const variants = {
  extend: {}
};
export const plugins = [];

