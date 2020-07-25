import styled from 'styled-components'

export const StyledResultItem = styled.div`
  cursor: pointer;
  margin: 0.5rem 0;
  padding-top: 8px;
  padding-bottom: 8px;

  align-items: center;
  justify-content: center;
  display: flex;
`
export const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

export const StyledDetailsRow = styled(StyledRow)`
  margin: 0.5rem 1.5rem;
  font-size: 14px;
  max-width: 970px;
  flex-direction: column;

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
