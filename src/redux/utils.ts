import cond from 'lodash/fp/cond'
import curry from 'lodash/fp/curry'
import eq from 'lodash/fp/eq'
import flow from 'lodash/fp/flow'
import read from 'lodash/fp/get'
import merge from 'lodash/fp/merge'
import otherwise from 'lodash/fp/stubTrue'

// action factory
const buildAction = curry((key: string, type: string) => `${key} 🚀 ${type}`)
const updateAction = (key: string) => buildAction(key, 'UPDATE')
const mapAction = (key: string) => buildAction(key, 'MAP')

// action predicates
const shouldUpdate = (key: string) => flow(read('type'), eq(updateAction(key)))
const shouldMap = (key: string) => flow(read('type'), eq(mapAction(key)))

// one reducer to rule them all and in the darkness bind them
export const createReducer =
  <T>(key: string, initial: T) => (currentState: T, action: any) => {
    const state = currentState ?? initial
    return cond([
      [shouldUpdate(key), flow(read('payload'), merge(state))],
      [shouldMap(key), flow(read('payload'), (fn) => fn(state))],
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
  }))
}

