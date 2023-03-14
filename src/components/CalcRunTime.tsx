import { memo, useState } from 'react'
import type { IPart } from '../types'

function CalcRunTime({ parts }: ICalcRunTime) {
  const [n1, setN1] = useState<string>('')
  const [n2, setN2] = useState<string>('')
  const [operand, setOperand] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const handleBtns = (num: string) => {
    if (num === ',') num = '.'
    if (operand !== '') {
      setN2((prev) => (prev += num))
    } else if (!result) {
      setN1((prev) => (prev += num))
    }
  }
  const handleOperands = (operand: string) => {
    if (result === 'Не определено') {
      return
    }
    if (!n1) return
    setOperand(operand)
  }
  const handleEquals = () => {
    switch (operand) {
      case 'x':
        setResult((Number(n1) * Number(n2)).toString())
        setN1((Number(n1) * Number(n2)).toString())
        setN2('')
        setOperand('')
        break
      case '/':
        if (Number(n1) / Number(n2) === Infinity) {
          setResult('Не определено')
        } else {
          setResult((Number(n1) / Number(n2)).toString())
        }
        setN1((Number(n1) / Number(n2)).toString())
        setN2('')
        setOperand('')
        break
      case '-':
        setResult((Number(n1) - Number(n2)).toString())
        setN1((Number(n1) - Number(n2)).toString())
        setN2('')
        setOperand('')
        break
      case '+':
        setResult((Number(n1) + Number(n2)).toString())
        setN1((Number(n1) + Number(n2)).toString())
        setN2('')
        setOperand('')
        break
    }
  }

  return (
    <div className='calculator'>
      {parts.map((item) => (
        <div key={item.id} className={item?.name}>
          {item?.name === 'display' && (
            <h2>{result ? result + operand + n2 : n1 + operand + n2}</h2>
          )}
          {item.operands?.map((i, index) => (
            <button
              className={item.name + '__btn'}
              key={index}
              onClick={() => handleOperands(i)}
            >
              {i}
            </button>
          ))}
          {item.buttons?.map((btn, index) => (
            <button
              className={item.name + '__btn' + ` ${item.name + '__btn' + btn}`}
              key={index}
              onClick={() => handleBtns(btn)}
            >
              {btn}
            </button>
          ))}
          {item.name === 'equals' && (
            <button className={item.name + '__btn'} onClick={handleEquals}>
              {' '}
              ={' '}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default memo(CalcRunTime)

interface ICalcRunTime {
  parts: IPart[]
}
