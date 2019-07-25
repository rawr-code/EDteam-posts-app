import React from 'react'

// Redux
import { Provider } from 'react-redux'

import store from './store'

const App = () => (
  <Provider store={store}>
    <div>
      <h1>Hello World!</h1>
      with ReactJs
    </div>
  </Provider>
)

export default App
