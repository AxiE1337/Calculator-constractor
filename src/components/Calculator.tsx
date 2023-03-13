import '../styles/calculator.scss'
import { DragEvent, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Part from './Part'
import { RootState } from '../store'
import { setCurrentPartId } from '../store/slices/calculatorSlice'

function Calculator() {
  const parts = useSelector(
    (state: RootState) => state.calculator.calculatorParts
  )
  const dispatch = useDispatch()

  const handleDragStart = (id: number) => {
    dispatch(setCurrentPartId(id))
  }
  const handleOnDrop = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault()
  }
  return (
    <main className='main'>
      <div className='calculator'>
        {parts.map((item) => (
          <Part
            item={item}
            key={item.id}
            handleDragStart={handleDragStart}
            handleOnDrop={handleOnDrop}
          />
        ))}
      </div>
    </main>
  )
}

export default memo(Calculator)
