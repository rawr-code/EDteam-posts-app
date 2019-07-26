import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Redux
import { connect } from 'react-redux'

// Actions
import { getPosts, deletePost, editPostData } from '../../../store/modules/data/actions'

// Atoms
import { Button } from '../../Atoms'

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

  useEffect(() => {
    actions.getPosts()
  }, [])

  const handleUpdate = data => () => {
    actions.editPostData(data)
  }

  const handleRemove = id => () => {
    actions.deletePost(id).then(res => console.log(res))
  }

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
