import React, { FC, useState, useCallback } from 'react'
import { NumberInput } from './NumberInput'

export const Demo: FC = () => {
  const [num, setNum] = useState<number>()
  const [childRenderCount, setChildRenderCount] = useState(0)

  const handleRender = useCallback(() => setChildRenderCount(n => n + 1), [])
  const handleChange = useCallback((n: number | undefined) => setNum(n), [])
  const forceSetNum = useCallback(() => {
    setNum(Number((Math.random() * 100).toFixed(2)))
  }, [])

  return (
    <div>
      <div>Number from inner: {num}</div>
      <div>Child component render times: {childRenderCount}</div>
      <div>
        <button onClick={forceSetNum}>Force set a random number</button>
      </div>
      <hr />
      <NumberInput value={num} onChange={handleChange} onRender={handleRender} />
    </div>
  )
}
