// Action Types
import { GET_POST } from './types'

const INITIAL_STATE = {
  post: [],
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_POST: {
      return { ...state, post: payload }
    }

    default:
      return state
  }
}
