import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Redux
import { connect } from 'react-redux'

// Actions
import { newPost, editPostData } from '../../../store/modules/data/actions'

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
  const [disabledButton, setDisabledButton] = useState(true)

  const handleChange = (e) => {
    const { value, name } = e.target
    const newData = {
      [name]: value,
    }
    actions.editPostData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    actions.newPost(data.editPostData).then(res => console.log(res))
    actions.editPostData({ title: '', body: '' })
    setDisabledButton(true)
  }

  return (
    <PostsFormWrapper>
      <img src={Logo} alt="logo" width="320" />
      <Title>Nuevo Post</Title>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          title="Titulo"
          inputProps={{
            type: 'text',
            name: 'title',
            value: data.editPostData.title,
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
            value: data.editPostData.body,
            onChange: handleChange,
            required: true,
          }}
        />
        <Button type="submit" disabled={disabledButton}>
          Publicar
        </Button>
      </form>
    </PostsFormWrapper>
  )
}

PostForm.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    posts: PropTypes.array,
    editPostData: PropTypes.shape({
      title: '',
      body: '',
    }),
  }),
  actions: PropTypes.shape({
    newPost: PropTypes.func,
    editPostData: PropTypes.func,
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
    editPostData: payload => dispatch(editPostData(payload)),
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostForm)
