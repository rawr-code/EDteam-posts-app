import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// Middlewares
import thunk from 'redux-thunk'

// Root Reducer (All reducers)
import rootReducer from './rootReducer'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
