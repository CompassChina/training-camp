import React, { FC, useState, useEffect, useMemo, useRef } from 'react'

import { checkNumber, NumberState } from '../utils/checkNumber'

type Props = {
  value: number | undefined
  onChange: (value: number | undefined) => void
  onRender?: () => void
}

export const NumberInput: FC<Props> = React.memo(({ value, onChange, onRender }) => {
  {
    // Notice: don't change this block, which is a performance hint,
    // you should find a way avoid the un-necessary infinite re-rendering
    console.log('### > NumberInput')
    useEffect(() => {
      onRender?.()
    })
  }

  const [focused, setFocused] = useState(false)
  const [typingText, setTypingText] = useState(value?.toString())

  const textState: NumberState = useMemo(() => checkNumber(typingText?.trim()), [typingText])
  const showError: boolean = useMemo(
    () =>
      textState.type === 'invalid' ||
      (!focused && textState.type === 'typing' && textState.num === undefined),
    [textState, focused]
  )

  const typingTextRef = useRef<string>()
  typingTextRef.current = typingText

  useEffect(() => {
    if (value !== Number(typingTextRef.current)) {
      setTypingText(value?.toString())
    }
  }, [value])

  useEffect(() => {
    if (textState.type === 'empty') {
      return onChange(undefined)
    }
    if (textState.type === 'valid' || textState.type === 'typing') {
      if (textState.num !== undefined) {
        onChange(textState.num)
      }
      return
    }
    // won't pass back to outer in other cases
  }, [textState, onChange])

  return (
    <div>
      <input
        type='text'
        value={typingText ?? ''}
        style={showError ? { color: 'red' } : {}}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={event => setTypingText(event.target.value?.trim())}
      />
    </div>
  )

  // return <div>TODO</div>
})
