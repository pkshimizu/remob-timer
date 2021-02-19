import { InputAdornment, TextField } from '@material-ui/core'
import { useState } from 'react'

export interface NumberFieldProps {
  num: number
  min: number
  max: number
  suffix?: string
  onChange: (value: number) => void
}

function NumberField({ num, min, max, suffix, onChange }: NumberFieldProps) {
  const [value, setValue] = useState(String(num))
  return (
    <TextField
      value={value}
      onChange={(event) => {
        let inputValue = event.target.value || '0'
        const value = Math.min(Math.max(parseInt(inputValue), min), max)
        onChange(value)
        setValue(String(value))
      }}
      type={'number'}
      InputProps={{
        endAdornment: suffix ? (
          <InputAdornment position={'end'}>{suffix}</InputAdornment>
        ) : undefined,
      }}
    />
  )
}

export default NumberField
