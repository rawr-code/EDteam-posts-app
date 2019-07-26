import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Atoms
import { InputLabel, TextInput, TextArea } from '../../Atoms'

const TextFieldWrapper = styled.div`
  margin-bottom: 19px;
  display: flex;
  flex-direction: column;
`

const TextField = ({ title, inputProps, type }) => {
  if (type !== 'textarea') {
    return (
      <TextFieldWrapper>
        <InputLabel>{title}</InputLabel>
        <TextInput {...inputProps} />
      </TextFieldWrapper>
    )
  }
  return (
    <TextFieldWrapper>
      <InputLabel>{title}</InputLabel>
      <TextArea {...inputProps} />
    </TextFieldWrapper>
  )
}

TextField.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'textarea']),
  inputProps: PropTypes.objectOf(PropTypes.any).isRequired,
}

TextField.defaultProps = {
  type: 'default',
}

export default TextField
