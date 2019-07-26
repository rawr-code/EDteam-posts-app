import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Redux
import { connect } from 'react-redux'

// Actions
import { newPost, updatePost } from '../../../store/modules/data/actions'

// Atoms
import { Button, Title } from '../../Atoms'
import TextField from '../../Molecules/TextField'

// Logo
import Logo from '../../../images/logo.svg'

const PostsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px auto;
  max-width: 420px;
`

const PostForm = (props) => {
  const { data, actions } = props
  const [postId, setPostId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [disabledButton, setDisabledButton] = useState(true)

  useEffect(() => {
    setPostId(data.editPostData.id)
    setTitle(data.editPostData.title)
    setBody(data.editPostData.body)
  }, [data.editPostData])

  useEffect(() => {
    if (title && body) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [title, body])

  // if (Object.keys(data.editPostData).length > 0) {
  //   if (data.editPostData.title) {
  //     setTitle(data.editPostData.title)
  //   }
  //   if (data.editPostData.body) {
  //     setBody(data.editPostData.body)
  //   }
  // }

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name === 'title') {
      setTitle(value)
    } else if (name === 'body') {
      setBody(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = { title, body }

    if (postId) {
      newData.id = postId
      actions.updatePost(newData).then((res) => {
        console.log(res)
        setPostId('')
        setTitle('')
        setBody('')
        setDisabledButton(true)
      })
    } else {
      actions.newPost(newData).then((res) => {
        console.log(res)
        setTitle('')
        setBody('')
        setDisabledButton(true)
      })
    }
  }

  return (
    <PostsFormWrapper>
      <img src={Logo} alt="logo" width="320" />
      <Title>{`${postId ? 'Editar' : 'Nuevo'} Post`}</Title>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          title="Titulo"
          inputProps={{
            type: 'text',
            name: 'title',
            value: title || '',
            onChange: handleChange,
            required: true,
          }}
        />
        <TextField
          type="textarea"
          title="Descripción"
          inputProps={{
            name: 'body',
            cols: '20',
            rows: '5',
            value: body || '',
            onChange: handleChange,
            required: true,
          }}
        />
        <Button type="submit" disabled={disabledButton}>
          {postId ? 'Actualizar' : 'Publicar'}
        </Button>
      </form>
    </PostsFormWrapper>
  )
}

PostForm.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    posts: PropTypes.array,
    editPostData: PropTypes.object,
  }),
  actions: PropTypes.shape({
    newPost: PropTypes.func,
    updatePost: PropTypes.func,
  }),
}

PostForm.defaultProps = {
  data: {},
  actions: {},
}

const mapStateToProps = ({ data }) => ({
  data,
})

const mapDispatchToProps = dispatch => ({
  actions: {
    newPost: payload => dispatch(newPost(payload)),
    updatePost: payload => dispatch(updatePost(payload)),
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostForm)
