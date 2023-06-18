export default async function (req, res, next) {
  try {
    await next()
  } catch (err) {
    res.status = err.status || 500
    const code = err.code || 'INTERNAL_SERVER_ERROR'
    const description = err.message || ''
    const stack = res.status === 500 ? err.stack : ''
    res.body = {code, description, stack}
  }
}
