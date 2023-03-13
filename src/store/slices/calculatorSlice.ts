import { createSlice } from '@reduxjs/toolkit'
import type { IPart } from '../../types'

export interface CounterState {
  calculatorParts: IPart[]
  calculatorPartsCanvas: IPart[]
  currentPartId: number | null
}

const initialState: CounterState = {
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
  calculatorPartsCanvas: [],
  currentPartId: null,
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addPartCanvas: (state, { payload }) => {
      const hasPart = state.calculatorPartsCanvas.find(
        (part) => part.id === payload.id
      )

      const calcPart = state.calculatorParts.find(
        (part) => part.id === payload.id
      ) as IPart
      calcPart.isDisabled = true

      if (!hasPart) {
        state.calculatorPartsCanvas.push(payload)
      }
    },
    removePartCanvas: (state, { payload }) => {
      const calcPart = state.calculatorParts.find(
        (part) => part.id === payload
      ) as IPart
      calcPart.isDisabled = false

      state.calculatorPartsCanvas = state.calculatorPartsCanvas.filter(
        (part) => part.id !== payload
      )
    },
    setArray: (state, { payload }) => {
      state.calculatorPartsCanvas = payload
    },
    setCurrentPartId: (state, { payload }) => {
      state.currentPartId = payload
    },
  },
})

export const { addPartCanvas, removePartCanvas, setArray, setCurrentPartId } =
  calculatorSlice.actions

export default calculatorSlice.reducer
