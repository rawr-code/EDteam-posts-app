import uuid from 'short-uuid'

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

const URL_BASE = 'https://jsonplaceholder.typicode.com/posts'

// Get posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  fetch(URL_BASE)
    .then(res => res.json())
    .then((posts) => {
      dispatch({ type: GET_POST, payload: posts })
      dispatch({ type: LOADING, payload: false })
    })
    .catch((err) => {
      dispatch({ type: LOADING, payload: false })
      dispatch({ type: SET_ERROR, payload: err })
    })
}

// New post
export const newPost = data => (dispatch) => {
  const { title, body } = data

  return fetch(URL_BASE, {
    method: 'POST',
    headers: new Headers(),
    body: JSON.stringify({ title, body }),
  })
    .then(res => res.json())
    .then((result) => {
      const post = {
        title,
        body,
        original_id: result.id,
        id: uuid().new(),
      }
      dispatch({ type: NEW_POST, payload: post })
      return {
        success: true,
        msg: 'Publicado con exito',
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err })
      return {
        error: true,
        msg: 'Error al publicar',
      }
    })
}

// Update post
export const updatePost = data => (dispatch) => {
  const { id, ...rest } = data

  return fetch(`${URL_BASE}/${id}`, {
    method: 'PATCH',
    headers: new Headers(),
    body: JSON.stringify({ ...rest }),
  })
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: UPDATE_POST, payload: result })
      return {
        success: true,
        msg: 'Actualizado con exito',
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err })
      return {
        error: true,
        msg: 'Error al actualizar',
      }
    })
}

// Delete post
export const deletePost = id => dispatch => fetch(`${URL_BASE}/${id}`, {
  method: 'DELETE',
})
  .then(res => res.json())
  .then(() => {
    dispatch({ type: DELETE_POST, payload: id })
    return {
      success: true,
      msg: 'Eliminado con exito',
    }
  })
  .catch((err) => {
    dispatch({ type: SET_ERROR, payload: err })
    return {
      error: true,
      msg: 'Error al eliminar',
    }
  })

// update editpostdata
export const editPostData = payload => dispatch => dispatch({ type: EDIT_POST_DATA, payload })
