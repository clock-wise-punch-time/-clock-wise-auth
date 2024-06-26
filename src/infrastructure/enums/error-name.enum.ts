export enum ERROR_NAME {
  // Erros do enum APP_CODE
  PRISMA_CLIENT_ERROR = "PRISMA_CLIENT_ERROR",
  MONGODB_CONNECTION_ERROR = "MONGODB_CONNECTION_ERROR",
  MONGODB_QUERY_ERROR = "MONGODB_QUERY_ERROR",
  USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
  REGISTRATION_ALREADY_EXISTS = "REGISTRATION_ALREADY_EXISTS",
  CPF_ALREADY_EXISTS = "CPF_ALREADY_EXISTS",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  INVALID_BIRTHDATE_FORMAT = "INVALID_BIRTHDATE_FORMAT",
  INVALID_ROLE = "INVALID_ROLE",
  INVALID_CPF = "INVALID_CPF",
  INVALID_PHONE = "INVALID_PHONE",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_INCORRECT = "USER_INCORRECT",
  USER_STATUS_UPDATE_FAILED = "USER_STATUS_UPDATE_FAILED",
  USER_DELETE_FAILED = "USER_DELETE_FAILED",

  REFUSED_GUIDELINE = "REFUSED_GUIDELINE",
  GUIDELINE_NOT_FOUND = "GUIDELINE_NOT_FOUND",
  INVALID_GUIDELINE_TYPE = "INVALID_GUIDELINE_TYPE",
  GUIDELINE_STATUS_UPDATE_FAILED = "GUIDELINE_STATUS_UPDATE_FAILED",
  GUIDELINE_DELETE_FAILED = "GUIDELINE_DELETE_FAILED",
  GUIDELINE_ACCEPTANCE_FAILED = "GUIDELINE_ACCEPTANCE_FAILED",
  GUIDELINE_ACCEPTANCE_REJECTION_FAILED = "GUIDELINE_ACCEPTANCE_REJECTION_FAILED",
  GUIDELINE_ACCEPTANCE_UPDATE_FAILED = "GUIDELINE_ACCEPTANCE_UPDATE_FAILED",
  GUIDELINE_ACCEPTANCE_DELETE_FAILED = "GUIDELINE_ACCEPTANCE_DELETE_FAILED",
  DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
  DEVICE_CREATION_FAILED = "DEVICE_CREATION_FAILED",
  DEVICE_UPDATE_FAILED = "DEVICE_UPDATE_FAILED",
  DEVICE_DELETE_FAILED = "DEVICE_DELETE_FAILED",
  CODE_NOT_FOUND = "CODE_NOT_FOUND",
  INVALID_CODE_TYPE = "INVALID_CODE_TYPE",
  CODE_GENERATION_FAILED = "CODE_GENERATION_FAILED",
  CODE_VALIDATION_FAILED = "CODE_VALIDATION_FAILED",
  CODE_STATUS_UPDATE_FAILED = "CODE_STATUS_UPDATE_FAILED",
  CODE_DELETE_FAILED = "CODE_DELETE_FAILED",
  FINGERPRINT_VERIFICATION_FAILED = "FINGERPRINT_VERIFICATION_FAILED",
  RECAPTCHA_FAILED = "RECAPTCHA_FAILED",
  RSA_ENCRYPTION_ERROR = "RSA_ENCRYPTION_ERROR",
  BCRYPT_HASHING_ERROR = "BCRYPT_HASHING_ERROR",
  EMAIL_SENDING_FAILED = "EMAIL_SENDING_FAILED",

  // Erros do enum INFRA_CODE
  INTERNAL_SYSTEM_ERROR = "INTERNAL_SYSTEM_ERROR",
  DATABASE_CONNECTION_ERROR = "DATABASE_CONNECTION_ERROR",
  DATABASE_CONNECTION_FAILURE = "DATABASE_CONNECTION_FAILURE",
  DATABASE_READ_ERROR = "DATABASE_READ_ERROR",
  DATABASE_WRITE_ERROR = "DATABASE_WRITE_ERROR",
  DATABASE_UPDATE_ERROR = "DATABASE_UPDATE_ERROR",
  DATABASE_DELETE_ERROR = "DATABASE_DELETE_ERROR",
  DATABASE_TRANSACTION_ERROR = "DATABASE_TRANSACTION_ERROR",
  DATABASE_SYNTAX_ERROR = "DATABASE_SYNTAX_ERROR",
  DATABASE_CONNECTION_LIMIT_ERROR = "DATABASE_CONNECTION_LIMIT_ERROR",
  DATABASE_TIMEOUT_ERROR = "DATABASE_TIMEOUT_ERROR",
  DATABASE_DATA_CONFLICT_ERROR = "DATABASE_DATA_CONFLICT_ERROR",
  FILE_READ_ERROR = "FILE_READ_ERROR",
  FILE_WRITE_ERROR = "FILE_WRITE_ERROR",
  INSUFFICIENT_MEMORY_ERROR = "INSUFFICIENT_MEMORY_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  PERMISSION_ERROR = "PERMISSION_ERROR",
  CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
  RESOURCE_NOT_FOUND_ERROR = "RESOURCE_NOT_FOUND_ERROR",
  SERVICE_UNAVAILABLE_ERROR = "SERVICE_UNAVAILABLE_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  DATA_VALIDATION_ERROR = "DATA_VALIDATION_ERROR",
  PROCESSING_ERROR = "PROCESSING_ERROR",
  EMAIL_SENDING_ERROR = "EMAIL_SENDING_ERROR",
  DATA_DECODE_ERROR = "DATA_DECODE_ERROR",
  DATA_ENCODE_ERROR = "DATA_ENCODE_ERROR",
  INVALID_PARAMETER_ERROR = "INVALID_PARAMETER_ERROR",
  MISSING_DEPENDENCY_ERROR = "MISSING_DEPENDENCY_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  NETWORK_BLOCK_TEMPORARILY = "NETWORK_BLOCK_TEMPORARILY",
  FORBIDDEN_RESOURCE = "FORBIDDEN_RESOURCE",
}
