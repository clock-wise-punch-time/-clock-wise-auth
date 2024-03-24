export enum APP_MESSAGE {
  // MongoDB Database Errors
  MONGODB_CONNECTION_ERROR = "Failed to connect to MongoDB database",
  MONGODB_QUERY_ERROR = "Error occurred while executing a query in MongoDB database",

  // User Errors
  USERNAME_ALREADY_EXISTS = "Username already exists",
  REGISTRATION_ALREADY_EXISTS = "Registration number already exists",
  CPF_ALREADY_EXISTS = "CPF already exists",
  EMAIL_ALREADY_EXISTS = "Email already exists",
  INVALID_BIRTHDATE_FORMAT = "Invalid format for birthdate",
  INVALID_ROLE = "Invalid user role",
  INVALID_CPF = "Invalid CPF",
  INVALID_PHONE = "Invalid Phone",
  USER_NOT_FOUND = "User not found",
  USER_INCORRECT = "Incorrect username or password",
  USER_STATUS_UPDATE_FAILED = "Failed to update user status",
  USER_DELETE_FAILED = "Failed to delete user",

  // Guideline Errors
  REFUSED_GUIDELINE = "You can only register if you agree to the guidelines",
  GUIDELINE_NOT_FOUND = "Guideline not found",
  INVALID_GUIDELINE_TYPE = "Invalid guideline type",
  GUIDELINE_STATUS_UPDATE_FAILED = "Failed to update guideline status",
  GUIDELINE_DELETE_FAILED = "Failed to delete guideline",

  // Guideline Accepted Errors
  GUIDELINE_ACCEPTANCE_FAILED = "Failed to accept guideline",
  GUIDELINE_ACCEPTANCE_REJECTION_FAILED = "Failed to reject guideline acceptance",
  GUIDELINE_ACCEPTANCE_UPDATE_FAILED = "Failed to update guideline acceptance status",
  GUIDELINE_ACCEPTANCE_DELETE_FAILED = "Failed to delete guideline acceptance",

  // Device Errors
  DEVICE_NOT_FOUND = "Device not found",
  DEVICE_CREATION_FAILED = "Failed to create device",
  DEVICE_UPDATE_FAILED = "Failed to update device",
  DEVICE_DELETE_FAILED = "Failed to delete device",

  // Code Errors
  CODE_NOT_FOUND = "Verification code not found",
  INVALID_CODE_TYPE = "Invalid verification code type",
  CODE_GENERATION_FAILED = "Failed to generate verification code",
  CODE_VALIDATION_FAILED = "Failed to validate verification code",
  CODE_STATUS_UPDATE_FAILED = "Failed to update verification code status",
  CODE_DELETE_FAILED = "Failed to delete verification code",

  // Fingerprint Verification Errors
  FINGERPRINT_VERIFICATION_FAILED = "Failed to verify device fingerprint",

  // Google reCAPTCHA Errors
  RECAPTCHA_FAILED = "reCAPTCHA verification failed",

  // RSA Encryption Errors
  RSA_ENCRYPTION_ERROR = "Failed to encrypt payload",

  // Bcrypt Hashing Errors
  BCRYPT_HASHING_ERROR = "Failed to hash password",

  // SMTP Email Sending Errors
  EMAIL_SENDING_FAILED = "Failed to send email",

  // Prisma Client Errors
  PRISMA_CLIENT_ERROR = "Error encountered while using client for database operations",
}
