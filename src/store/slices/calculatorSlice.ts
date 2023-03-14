import { createSlice } from '@reduxjs/toolkit'
import type { IPart } from '../../types'

export interface InitialState {
  calculatorParts: IPart[]
  calculatorPartsConstractor: IPart[]
  currentPartId: number | null
}

const initialState: InitialState = {
  calculatorParts: [
    { id: 1, index: 1, isDisabled: false, name: 'display', value: 0 },
    {
      id: 2,
      index: 2,
      isDisabled: false,
      name: 'operands',
      operands: ['/', 'x', '-', '+'],
    },
    {
      id: 3,
      index: 3,
      isDisabled: false,
      name: 'buttons',
      buttons: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', ','],
    },
    { id: 4, index: 4, isDisabled: false, name: 'equals' },
  ],
  calculatorPartsConstractor: [],
  currentPartId: null,
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addPartConstractor: (state, { payload }: { payload: IPart }) => {
      const hasPart = state.calculatorPartsConstractor.find(
        (part) => part.id === payload.id
      )

      const calcPart = state.calculatorParts.find(
        (part) => part.id === payload.id
      ) as IPart
      calcPart.isDisabled = true

      if (!hasPart) {
        state.calculatorPartsConstractor.push(payload)
      }
    },
    removePartConstractor: (state, { payload }: { payload: number }) => {
      const calcPart = state.calculatorParts.find(
        (part) => part.id === payload
      ) as IPart
      calcPart.isDisabled = false

      state.calculatorPartsConstractor =
        state.calculatorPartsConstractor.filter((part) => part.id !== payload)
    },
    setArray: (state, { payload }: { payload: IPart[] }) => {
      state.calculatorPartsConstractor = payload
    },
    setCurrentPartId: (state, { payload }: { payload: number }) => {
      state.currentPartId = payload
    },
  },
})

export const {
  addPartConstractor,
  removePartConstractor,
  setArray,
  setCurrentPartId,
} = calculatorSlice.actions

export default calculatorSlice.reducer
