declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.md?raw' {
  const raw: string
  export default raw
}
