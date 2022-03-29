# KISS Redux Pattern

## Useful abstractions have strong limitations
A Map is a useful abstraction because it is significantly more limiting than a
For loop. Strong limitations lead to code that is easier to digest and debug and
code that is more unified and consistent accross different teams.

## Take only what you need to survive...
`src/redux/utils.ts`
```tsx
const buildAction = (key: string) => `${key} 🚀 UPDATE`
const shouldUpdate = (key: string) => flow(read('type'), eq(buildAction(key)))

export const createReducer =
  <T>(key: string, initial: T) => (currentState: T, action: any) => {
    const state = currentState ?? initial
    return cond([
      [shouldUpdate(key), flow(read('payload'), merge(state))],
      [otherwise, () => state],
    ])(action)
  }

export const update = curry((key: string, payload: any) => ({
  type: buildAction(key),
  payload,
}))
```
