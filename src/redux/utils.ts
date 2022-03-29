import cond from 'lodash/fp/cond'
import curry from 'lodash/fp/curry'
import eq from 'lodash/fp/eq'
import flow from 'lodash/fp/flow'
import read from 'lodash/fp/get'
import merge from 'lodash/fp/merge'
import otherwise from 'lodash/fp/stubTrue'

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
