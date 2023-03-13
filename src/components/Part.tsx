import { DragEvent, memo } from 'react'
import type { IPart as IItem } from '../types'

function Part({
  item,
  handleDragStart,
  handleOnDrop,
  handeleDoubleClick,
}: IPart) {
  return (
    <div
      key={item.id}
      className={item?.name}
      style={{
        opacity: item.isDisabled ? 0.3 : 1,
        userSelect: item.isDisabled ? 'none' : 'all',
      }}
      onDoubleClick={handeleDoubleClick}
      onDragStart={() => handleDragStart(item.id)}
      onDrop={(e) => handleOnDrop(e, item.id)}
      draggable={true}
    >
      {item?.name === 'display' && <h2>{item.value}</h2>}
      {item.operands?.map((i, index) => (
        <button className={item.name + '__btn'} key={index}>
          {i}
        </button>
      ))}
      {item.buttons?.map((btn, index) => (
        <button className={item.name + '__btn'} key={index}>
          {btn}
        </button>
      ))}
      {item.name === 'equals' && (
        <button className={item.name + '__btn'}> = </button>
      )}
    </div>
  )
}

export default memo(Part)

interface IPart {
  item: IItem
  handleDragStart: (id: number) => void
  handleOnDrop: (e: DragEvent<HTMLDivElement>, id: number) => void
  handeleDoubleClick?: () => void
}
