import { DragEvent, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  addPartConstractor,
  removePartConstractor,
  setArray,
} from '../store/slices/calculatorSlice'
import type { IPart } from '../types'
import CalcRunTime from './CalcRunTime'
import Part from './Part'

function CalcConstractor() {
  const [isConstracting, setIsConstracting] = useState<boolean>(true)
  const partsConstructor = useSelector(
    (state: RootState) => state.calculator.calculatorPartsConstractor
  )
  const parts = useSelector(
    (state: RootState) => state.calculator.calculatorParts
  )
  const currentPartId = useSelector(
    (state: RootState) => state.calculator.currentPartId
  )
  const [draggable, setDraggable] = useState<IPart | null>(null)
  const dispatch = useDispatch()
  const handelSwitch = (state: boolean) => {
    setIsConstracting(state)
  }

  const handleDragStart = (part: IPart) => {
    setDraggable(part)
  }
  const handleOnDrop = (
    e: DragEvent<HTMLDivElement>,
    id: number,
    index: number
  ) => {
    e.preventDefault()
    if (!draggable?.index) return
    const newParts = [...partsConstructor]
      .map((part) => {
        if (part.id === id) {
          return { ...part, index: draggable?.index }
        }
        if (part.id === draggable?.id) {
          return { ...part, index: index }
        }
        return part
      })
      .sort((a, b) => {
        const aIndex = a.index as number
        const bIndex = b.index as number
        return aIndex - bIndex
      })
    dispatch(setArray(newParts))
  }

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.style.backgroundColor = 'lightgreen'
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'white'
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.style.backgroundColor = 'white'
    if (e.currentTarget.className === 'constractor' || 'constractorEmpty') {
      const part = parts.find((part) => part.id === currentPartId)
      if (part) {
        dispatch(addPartConstractor(part))
      }
    }
  }

  const handeleDoubleClick = (id: number) => {
    dispatch(removePartConstractor(id))
  }

  return (
    <main className='main'>
      <div className='main__btns'>
        <button
          className={isConstracting ? 'btns' : 'btns_active'}
          onClick={() => handelSwitch(false)}
        >
          Runtime
        </button>
        <button
          className={isConstracting ? 'btns_active' : 'btns'}
          onClick={() => handelSwitch(true)}
        >
          Constructor
        </button>
      </div>
      {isConstracting ? (
        <div
          className={
            partsConstructor.length > 0 ? 'constractor' : 'constractorEmpty'
          }
          onDragOver={handleOnDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e)}
        >
          {partsConstructor.length < 1 && (
            <div>
              <h1>Перетащите сюда</h1> <br />
              <p>
                любой элемент
                <br />
                из левой панели
              </p>
            </div>
          )}
          {partsConstructor.map((item) => (
            <Part
              item={item}
              key={item.id}
              handleDragStart={(e) => handleDragStart(item)}
              handleOnDrop={(e) => handleOnDrop(e, item.id, item.index)}
              handeleDoubleClick={() => handeleDoubleClick(item.id)}
            />
          ))}
        </div>
      ) : (
        <CalcRunTime parts={partsConstructor} />
      )}
    </main>
  )
}

export default memo(CalcConstractor)
