module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(pink|rose|amber|slate)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /text-(pink|rose|amber|slate|gray)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /border-(pink|rose|amber|slate|gray)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /hover:bg-(pink|rose|amber|slate)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /hover:text-(pink|rose|amber|slate)-(50|100|200|300|400|500|600|700|800|900|950)/,
    }
  ]
}
