import styled from 'styled-components'

interface StyledInputProps {
  hasError: boolean
}

export const SyledInputBar = styled.div<StyledInputProps>`
  border-radius: 8px;
  border: 1px solid ${({hasError}) => (hasError ? 'red' : '#dfe1e5')};
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 970px;
  margin-bottom: 1.5rem;
`

export const StyledInput = styled.input`
  width: 100%;
  box-shadow: none;
  height: 44px;
  font-size: 16px;
  background-color: transparent;
  padding: 0 16px;
  border: none;
  border-radius: 8px 0 0 8px;
  outline: none;
`

export const StyledButton = styled.button`
  height: 44px;
  width: 150px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 0 16px;
  cursor: pointer;
  border: none;
  border-radius: 0 8px 8px 0;
`
