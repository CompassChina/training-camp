import { checkNumber } from './checkNumber'

;['', undefined].forEach(value => {
  test(`${value} is empty`, () => expect(checkNumber(value)).toEqual({ type: 'empty' }))
})
;['1', '-1', '0.1', '-0.1'].forEach(value => {
  test(`${value} can parse to number in standard form`, () =>
    expect(checkNumber(value)).toEqual({ type: 'valid', num: Number(value) }))
})
;['1.0', '-1.0', '.1', '1.', '-1.', '-.1'].forEach(value => {
  test(`${value} can parse to number isn't in standard form`, () =>
    expect(checkNumber(value)).toEqual({ type: 'typing', num: Number(value) }))
})
;['a', '*', 'a1*', '1*1'].forEach(value => {
  test(`${value} can't parse to number`, () =>
    expect(checkNumber(value)).toEqual({ type: 'invalid' }))
})
;['-', '.', '-.'].forEach(value => {
  test(`${value} can't parse to number but continue typing can make valid number`, () =>
    expect(checkNumber(value)).toEqual({ type: 'typing', num: undefined }))
})
