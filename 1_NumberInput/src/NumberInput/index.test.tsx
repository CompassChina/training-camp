import React from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NumberInput } from './index'

let component: RenderResult
let input: HTMLElement
const user = userEvent.setup()
const handleChange = jest.fn()

// Clear all mocks before running test case
beforeEach(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
  jest.restoreAllMocks()
})

// Render component before running test case
beforeEach(async () => {
  component = render(<NumberInput value={undefined} onChange={handleChange} />)
  input = component.getByRole('textbox')
  await user.click(input)
  expect(input).not.toHaveValue()
})

test('Check component performance', () => {
  const handleRender = jest.fn()
  component.rerender(
    <NumberInput value={undefined} onChange={handleChange} onRender={handleRender} />
  )
  component.rerender(
    <NumberInput value={undefined} onChange={handleChange} onRender={handleRender} />
  )
  component.rerender(
    <NumberInput value={undefined} onChange={handleChange} onRender={handleRender} />
  )
  expect(handleRender).toBeCalledTimes(1)
})

describe('For caller', () => {
  it('does return number if user input success parsed to number', async () => {
    await user.keyboard('-1.23')
    expect(handleChange).lastCalledWith(-1.23)
  })

  it('does return undefined if user input failed parsed to number', async () => {
    await user.keyboard('abc')
    expect(handleChange).lastCalledWith(undefined)
  })

  it(`doesn't override number same from props but different from value`, async () => {
    await user.keyboard('-1.010')
    component.rerender(<NumberInput value={-1.01} onChange={handleChange} />)
    expect(input).toHaveValue('-1.010')
  })

  it('does override number different from props', async () => {
    await user.keyboard('-1.010')
    component.rerender(<NumberInput value={-1.23} onChange={handleChange} />)
    expect(input).toHaveValue('-1.23')
  })
})

describe('For user', () => {
  ;['1', '-1', '1.1', '-1.1', '-1.10'].forEach(value => {
    it(`can input ${value}`, async () => {
      await user.keyboard(value)
      expect(input).toHaveValue(value)
    })
  })
  ;['abc', '*#$', '😀'].forEach(value => {
    it(`can paste ${value}`, async () => {
      await user.paste(value)
      expect(input).toHaveValue(value)
    })
  })
  it(`can't input space`, async () => {
    await user.keyboard(' ')
    expect(input).not.toHaveValue()
  })

  describe(`current input can't resolve to number, but continue may be normal number`, () => {
    beforeEach(async () => await user.keyboard('-'))

    it(`doesn't throw error if has focus`, () => {
      expect(input).not.toHaveStyle('color: red')
    })

    it('throw error if blurs', () => {
      input.blur()
      expect(input).toHaveStyle('color: red')
    })
  })

  it(`does throw error if current input can't resolve to number, but don't corrected automatically`, async () => {
    await user.keyboard('-1.a')
    expect(input).toHaveValue('-1.a')
    expect(input).toHaveStyle('color: red')
  })

  it(`doesn't change suddenly during input process`, async () => {
    let str = ''
    for (let i = 0; i < '-1.01020'.length; i++) {
      await user.keyboard('-1.01020'[i])
      expect(input).toHaveValue((str += '-1.01020'[i]))
    }
  })

  it(`doesn't change suddenly during delete process`, async () => {
    let str = '-1.01020'
    await user.keyboard(str)
    for (let i = 0; i < '-1.01020'.length; i++) {
      await user.keyboard('{Backspace}')
      str = str.slice(0, str.length - 1)
      expect(input).toHaveValue(str)
    }
  })
})
