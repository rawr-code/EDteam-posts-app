import { combineReducers } from 'redux'

// Modules (Reducers)
import dataReducer from './modules/data/reducer'

// Root Reducer
export default combineReducers({
  data: dataReducer,
})
