# KISS Redux Pattern

## Useful abstractions have strong limitations

A Map is a useful abstraction because it is significantly more limiting than a
For loop. Strong limitations lead to code that is easier to digest and debug and
code that is more unified and consistent accross different teams.

## Take only what you need to survive...

### `Action.of :: Key -> T -> T`
Takes key and new state replaces existing state with a new state

### `Action.map :: Key -> (T -> T) -> T`
Takes a key and function and applies it to the current state

### src/redux/redux.utils.ts

```tsx
// one reducer to rule them all and in the darkness bind them
export const createReducer =
  <T>(key: string, initial: T) =>
  (currentState: T, action: any) => {
    const state = currentState ?? initial
    return cond([
      [shouldUpdate(key), updateState(state)],
      [shouldMap(key), mapState(state)],
      [otherwise, () => state],
    ])(action)
  }

// action creator
export const Action = {
  of: curry((key: string, payload: any) => ({
    type: updateAction(key),
    payload,
  })),
  map: curry((key: string, payload: Function) => ({
    type: mapAction(key),
    payload,
  })),
}
```
