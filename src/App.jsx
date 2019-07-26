import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
// Redux
import { Provider } from 'react-redux'
import store from './store'

// Theme
import theme from './theme'
import GlobalResets from './theme/GlobalResets'

// Organisms
import Posts from './pages/Posts'

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalResets />
        <Posts />
      </Fragment>
    </ThemeProvider>
  </Provider>
)

export default App
