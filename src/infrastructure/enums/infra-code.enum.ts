export enum INFRA_CODE {
  INTERNAL_SYSTEM_ERROR = 1000,
  DATABASE_CONNECTION_ERROR = 1001,
  DATABASE_CONNECTION_FAILURE = 1002,
  DATABASE_READ_ERROR = 1003,
  DATABASE_WRITE_ERROR = 1004,
  DATABASE_UPDATE_ERROR = 1005,
  DATABASE_DELETE_ERROR = 1006,
  DATABASE_TRANSACTION_ERROR = 1007,
  DATABASE_SYNTAX_ERROR = 1008,
  DATABASE_CONNECTION_LIMIT_ERROR = 1009,
  DATABASE_TIMEOUT_ERROR = 1010,
  DATABASE_DATA_CONFLICT_ERROR = 1011,
  FILE_READ_ERROR = 1012,
  FILE_WRITE_ERROR = 1013,
  INSUFFICIENT_MEMORY_ERROR = 1014,
  NETWORK_ERROR = 1015,
  PERMISSION_ERROR = 1016,
  CONFIGURATION_ERROR = 1017,
  RESOURCE_NOT_FOUND_ERROR = 1018,
  SERVICE_UNAVAILABLE_ERROR = 1019,
  AUTHENTICATION_ERROR = 1020,
  AUTHORIZATION_ERROR = 1021,
  DATA_VALIDATION_ERROR = 1022,
  PROCESSING_ERROR = 1023,
  EMAIL_SENDING_ERROR = 1024,
  DATA_DECODE_ERROR = 1025,
  DATA_ENCODE_ERROR = 1026,
  INVALID_PARAMETER_ERROR = 1027,
  MISSING_DEPENDENCY_ERROR = 1028,
  TIMEOUT_ERROR = 1029,

  NETWORK_BLOCK_TEMPORARILY = 9001,
  FORBIDDEN_RESOURCE = 9003,
}
