# KISS Redux Pattern

## Useful abstractions have strong limitations
A Map is a useful abstraction because it is significantly more limiting than a
For loop. Strong limitations lead to code that is easier to digest and debug and
code that is more unified and consistent accross different teams.

## Problems with traditional Redux patterns
- Lack strong limitations
- Difficult to reason about
- Difficult for new members to learn
- Difficult to test
- Leaky
- Produce massive bloat

## Take only what you need to survive...
`src/redux/utils.ts`
```tsx
import cond from 'lodash/fp/cond'
import curry from 'lodash/fp/curry'
import eq from 'lodash/fp/eq'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import merge from 'lodash/fp/merge'
import otherwise from 'lodash/fp/stubTrue'

const buildAction = (key: string) => `${key} 🚀 UPDATE`
const isSetter = (key: string) => flow(get('type'), eq(buildAction(key)))

export const createReducer =
  (key: string, init: any) => (currState: any, action: any) => {
    const state = currState ?? init
    return cond([
      [isSetter(key), flow(get('payload'), merge(state))],
      [otherwise, () => state],
    ])(action)
  }

export const update = curry((key: string, payload: any) => ({
  type: buildAction(key),
  payload,
}))
```
