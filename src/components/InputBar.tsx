import React, {useState} from 'react'
import {StyledButton, StyledInput, SyledInputBar} from './InputBar.styled'

interface InputBarProps {
  onSubmit: (url: string) => void
  disabled: boolean
  hasError: boolean
}

export const InputBar: React.FC<InputBarProps> = ({onSubmit, disabled, hasError}) => {
  const [url, setUrl] = useState<string>('')

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value.trim())
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit(url)
    }
  }

  const handleSubmit = () => onSubmit && onSubmit(url)

  return (
    <SyledInputBar hasError={hasError}>
      <StyledInput
        placeholder={'Please enter url'}
        name='url'
        type='text'
        value={url}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <StyledButton onClick={handleSubmit} disabled={disabled}>
        Clear cache
      </StyledButton>
    </SyledInputBar>
  )
}
