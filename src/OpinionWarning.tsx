import React from 'react'
import read from 'lodash/fp/get'
import { OPINION_KEY } from './redux/_keys'
import { useSelector } from 'react-redux'

// local utils
const readShowOpinion = read([OPINION_KEY, 'show'])

export const OpinionWarning: React.FC = () => {
  const opinion: boolean = useSelector(readShowOpinion)

  return opinion ? (
    <>
      <hr />
      <h2>Opinion Warning</h2>
      <p>
        <b>There is no magical unicorn state abstraction.</b>
      </p>
      <p>
        <b>There are only functions and effects.</b>
      </p>
      <hr />
    </>
  ) : null
}
