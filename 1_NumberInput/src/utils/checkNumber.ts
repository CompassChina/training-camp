export type NumberState =
  | {
      type: 'valid'
      num: number
    }
  | {
      type: 'empty'
    }
  | {
      type: 'invalid'
    }
  | {
      type: 'typing'
      num: number | undefined
    }

export function checkNumber(text: string | undefined): NumberState {
  if (text === undefined || text === '') return { type: 'empty' }
  if (text === '-' || text === '.' || text === '-.') return { type: 'typing', num: undefined }

  const num = Number(text)
  if (Number.isNaN(num)) return { type: 'invalid' }
  if (num.toString() === text) return { type: 'valid', num }
  return { type: 'typing', num }
}
