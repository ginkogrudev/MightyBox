// tailwind-config.js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: '#0B2219', 
        action: '#2DCC70',
        sand: '#F4F1EA',
        gold: '#C5A059'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    }
  }
}
tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: '#0B2219', 
        action: '#2DCC70',
        sand: '#F4F1EA',
        gold: '#C5A059'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    }
  },
  // Увери се, че новият файл е описан тук:
  content: [
    "./index.html",
    "./about_us.html",
    "./src/**/*.{html,js}"
  ]
}