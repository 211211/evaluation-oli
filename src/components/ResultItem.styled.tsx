import styled from 'styled-components'

export const StyledResultItem = styled.div`
  cursor: pointer;
  margin: 0.5rem 0;
`
export const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledDetailsRow = styled(StyledRow)`
  margin: 0.5rem 1.5rem;
  font-size: 14px;

  & > div {
    margin: 0.25rem 0;
  }
`

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
`

export const StyledIcon = styled.div`
  display: inline-block;
  margin-right: 10px;
`
