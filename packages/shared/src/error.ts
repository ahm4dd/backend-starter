/**
 * Base application error. Carries a code and HTTP status for consistent responses.
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly httpStatus: number;

  constructor(code: string, message: string, httpStatus = 500) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

/**
 * Error thrown when input validation fails.
 */
export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
  }
}

/**
 * Error thrown when an entity is not found.
 */
export class NotFoundError extends AppError {
  constructor(message: string) {
    super('NOT_FOUND', message, 404);
  }
}

/**
 * Error thrown when authentication is required.
 */
export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super('UNAUTHORIZED', message, 401);
  }
}

/**
 * Error thrown when access is forbidden.
 */
export class ForbiddenError extends AppError {
  constructor(message: string) {
    super('FORBIDDEN', message, 403);
  }
}
