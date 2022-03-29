import './App.css'
import defaultTo from 'lodash/fp/defaultTo'
import flow from 'lodash/fp/flow'
import read from 'lodash/fp/get'
import { Code } from './Code'
import { OPINION_KEY, COUNTER_KEY } from './redux/_keys'
import { OpinionWarning } from './OpinionWarning'
import { update } from './redux/utils'
import { useDispatch, useSelector } from 'react-redux'

// local utils
const add = (a: number) => (b: number) => a + b
const subtract = (a: number) => (b: number) => a - b
const objectOf = (key: string) => (value: any) => ({ [key]: value })
const readCount = flow(read([COUNTER_KEY, 'counter']), defaultTo(0))

function App() {
  const dispatch = useDispatch()
  const count: number = useSelector(readCount)
  const opinion: boolean = useSelector(read([OPINION_KEY, 'show']))

  // modify :: (number -> number) -> number -> void
  const modify = (transform: Function) =>
    flow(
      transform(count),
      objectOf('counter'),
      update(COUNTER_KEY),
      dispatch
    )

  const increment = modify(add)
  const decreement = modify(subtract)

  // toggleOpinion :: boolean -> void
  const toggleOpinion =
    flow(
      objectOf('show'),
      update(OPINION_KEY),
      dispatch
    )

  return (
    <>
      <div className="App">
        <h1>Redux</h1>
        <p>Obligatory Counter: {count}</p>
        <button onClick={() => decreement(1)}>Decrement</button>
        <button onClick={() => increment(1)}>Increment</button>
        <div style={{ margin: '2rem' }} />
        <button onClick={() => toggleOpinion(!opinion)}>
          Click if you're interested in my opinion
        </button>
        <p>
          This Redux is built with two functions: <Code>createReducer</Code>{' '}
          and <Code>update</Code>.
        </p>
        <p>
          Toggle Redux DevTools with <Code>ctl-h</Code> / Reposition with{' '}
          <Code>ctl-g</Code>
        </p>
        <OpinionWarning />
      </div>
    </>
  )
}

export default App
