export async function handleResponsePromise(promise, res) {
  return promise
    .then((data) => res.json(data))
    .catch((err) => {
      res.status = 422
      res.json({errors: {body: [err.toString()]}})
    })
}
