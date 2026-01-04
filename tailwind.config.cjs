module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // subtle blue used for CTAs
        blue: {
          600: '#2563EB',
          650: '#1e4ed8'
        }
      }
    }
  },
  plugins: []
}
