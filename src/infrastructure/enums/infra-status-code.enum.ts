export enum INFRA_STATUS_CODE {
  INTERNAL_SYSTEM_ERROR = 500,
  DATABASE_CONNECTION_ERROR = 500,
  DATABASE_CONNECTION_FAILURE = 500,
  DATABASE_READ_ERROR = 500,
  DATABASE_WRITE_ERROR = 500,
  DATABASE_UPDATE_ERROR = 500,
  DATABASE_DELETE_ERROR = 500,
  DATABASE_TRANSACTION_ERROR = 500,
  DATABASE_SYNTAX_ERROR = 500,
  DATABASE_CONNECTION_LIMIT_ERROR = 500,
  DATABASE_TIMEOUT_ERROR = 500,
  DATABASE_DATA_CONFLICT_ERROR = 409,
  FILE_READ_ERROR = 500,
  FILE_WRITE_ERROR = 500,
  INSUFFICIENT_MEMORY_ERROR = 500,
  NETWORK_ERROR = 500,
  PERMISSION_ERROR = 403,
  CONFIGURATION_ERROR = 500,
  RESOURCE_NOT_FOUND_ERROR = 404,
  SERVICE_UNAVAILABLE_ERROR = 503,
  AUTHENTICATION_ERROR = 401,
  AUTHORIZATION_ERROR = 403,
  DATA_VALIDATION_ERROR = 400,
  PROCESSING_ERROR = 500,
  EMAIL_SENDING_ERROR = 500,
  DATA_DECODE_ERROR = 500,
  DATA_ENCODE_ERROR = 500,
  INVALID_PARAMETER_ERROR = 400,
  MISSING_DEPENDENCY_ERROR = 500,
  TIMEOUT_ERROR = 408,
  NETWORK_BLOCK_TEMPORARILY = 403,
  FORBIDDEN_RESOURCE = 403,
}
