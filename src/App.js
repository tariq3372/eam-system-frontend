import React from 'react'
import Router from './routes'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
const App = () => {
  return (
    <ThemeConfig>
      <GlobalStyles/>
      <Router/>
    </ThemeConfig>
  )
}

export default App