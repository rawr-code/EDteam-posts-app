import styled from 'styled-components'

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1192ee;
  border: 1px solid #1192ee;
  border-radius: 0.25rem;
  text-align: center;
  color: #fff;
  width: 100%;

  :disabled {
    background-color: gray;
    border: 1px solid gray;
  }
`

export default Button
