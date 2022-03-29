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
