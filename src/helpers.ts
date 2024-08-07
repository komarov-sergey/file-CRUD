// @ts-nocheck
import R from 'ramda'

export async function handleResponsePromise(promise, res) {
  return promise
    .then(data => res.json(data))
    .catch(err => {
      res.status = 422
      res.json({ errors: { body: [err.toString()] } })
    })
}

export const getExtension = R.pipe(
  R.split('.'),
  R.reverse(),
  R.slice(0, -1),
  R.join('.')
)
