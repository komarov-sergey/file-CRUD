export class AuthError extends Error {
  public code
  public status
  public description

  constructor(data) {
    super(data)
    this.code = 'UNAUTHORIZED_ERROR'
    this.status = 401
    this.description = data
  }
}
export class UnexpectedError extends Error {
  public code
  public status

  constructor(data) {
    super(data)
    this.code = data.code || 'UNEXPECTED_ERROR'
    this.status = 422
  }
}
export class DatabaseError extends Error {
  public code
  public status

  constructor(data) {
    super(data)
    this.code = data.code || 'DATABASE_ERROR'
    this.status = 500
  }
}
