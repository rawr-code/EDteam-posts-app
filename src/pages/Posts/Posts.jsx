import React from 'react'
import styled from 'styled-components'

// Organisms
import { PostForm, PostList } from '../../components/Organisms'

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Posts = () => (
  <PostsWrapper>
    <PostForm />
    <PostList />
  </PostsWrapper>
)

export default Posts
