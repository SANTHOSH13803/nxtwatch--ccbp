import React from 'react'

const ThemeContext = React.createContext({
  cartList: [],
  isDarkMode: false,
  toggleTheme: () => {},
  addCartItems: () => {},
})

export default ThemeContext
