import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Input = styled.input`
  width: 582px;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  height: 44px;
  font-size: 16px;
  background-color: transparent;
  border-color: error ? red : #dfe1e5;
  padding: 0 16px;

  &:hover {
    box-shadow: 0 1px 6px 0 rgba(33,36,0.28);
    border-color: rgba(223,225,229,0);
  }
`

export const Button = styled.button`
  height: 44px;
  border-Radius: 24px;
  border: 1px solid #dfe1e5;
  font-size: 16px;
  padding: 0 16px;
`
