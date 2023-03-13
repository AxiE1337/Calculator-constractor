export interface IPart {
  id: number
  name: string
  index: number
  isDisabled: boolean
  value?: number
  operands?: string[]
  buttons?: string[]
}
