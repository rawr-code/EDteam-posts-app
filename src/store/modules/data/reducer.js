// Action Types
import {
  LOADING,
  SET_ERROR,
  GET_POST,
  NEW_POST,
  UPDATE_POST,
  DELETE_POST,
  EDIT_POST_DATA,
} from './types'

const INITIAL_STATE = {
  loading: false,
  error: {},
  posts: [],
  editPostData: {},
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOADING: {
      return { ...state, loading: payload }
    }

    case SET_ERROR: {
      return { ...state, error: payload }
    }

    case GET_POST: {
      return { ...state, posts: payload }
    }

    case NEW_POST: {
      return { ...state, posts: [...state.posts, payload] }
    }

    case UPDATE_POST: {
      const posts = state.posts.map((post) => {
        if (post.id !== payload.id) {
          return post
        }
        return payload
      })
      return { ...state, posts }
    }

    case DELETE_POST: {
      const posts = state.posts.filter(post => post.id !== payload)
      return { ...state, posts }
    }

    case EDIT_POST_DATA: {
      return { ...state, editPostData: { ...state.editPostData, ...payload } }
    }

    default:
      return state
  }
}
