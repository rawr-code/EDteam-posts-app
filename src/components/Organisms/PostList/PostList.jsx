import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Redux
import { connect } from 'react-redux'

// Actions
import { getPosts, deletePost, editPostData } from '../../../store/modules/data/actions'

// Atoms
import { Button } from '../../Atoms'

// Molecules
import { Modal } from '../../Molecules'

const Card = styled.div`
  background-color: #fff;
  margin: 40px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 0.25rem;
`
const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ActionWrapper = styled.div`
  margin: 8px 16px;
  width: 100%;
`

const ActionTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
`

const Posts = (props) => {
  const {
    data: { loading, posts },
    actions,
  } = props
  const [message, setMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => setOpenModal(false)

  const handleUpdate = data => () => {
    actions.editPostData(data)
  }

  const handleRemove = id => () => {
    actions.deletePost(id).then((res) => {
      setMessage(res.msg)
      setOpenModal(true)
    })
  }

  useEffect(() => {
    actions.getPosts()
  }, [])
  return (
    <div>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Card>
              <div>
                <ActionTitle>{post.title}</ActionTitle>
                <p>{post.body}</p>
              </div>
              <ActionsWrapper>
                <ActionWrapper>
                  <Button type="button" onClick={handleUpdate(post)}>
                    Editar
                  </Button>
                </ActionWrapper>
                <ActionWrapper>
                  <Button type="button" onClick={handleRemove(post.id)}>
                    Eliminar
                  </Button>
                </ActionWrapper>
              </ActionsWrapper>
            </Card>
          </li>
        ))}
      </ul>
      <Modal open={openModal} onClose={handleCloseModal} title={message}>
        <div>text example</div>
      </Modal>
    </div>
  )
}

Posts.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    posts: PropTypes.array,
    editPostData: PropTypes.object,
  }),
  actions: PropTypes.shape({
    getPosts: PropTypes.func,
    editPostData: PropTypes.func,
    deletePost: PropTypes.func,
  }),
}

Posts.defaultProps = {
  data: {},
  actions: {},
}

const mapStateToProps = ({ data }) => ({
  data,
})

const mapDispatchToProps = dispatch => ({
  actions: {
    getPosts: () => dispatch(getPosts()),
    editPostData: payload => dispatch(editPostData(payload)),
    deletePost: payload => dispatch(deletePost(payload)),
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts)
