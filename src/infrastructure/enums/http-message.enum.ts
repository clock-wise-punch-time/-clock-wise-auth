export enum HTTP_MESSAGE {
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  PAYMENT_REQUIRED = "Payment Required",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not Found",
  METHOD_NOT_ALLOWED = "Method Not Allowed",
  NOT_ACCEPTABLE = "Not Acceptable",
  PROXY_AUTHENTICATION_REQUIRED = "Proxy Authentication Required",
  REQUEST_TIMEOUT = "Request Timeout",
  CONFLICT = "Conflict",
  GONE = "Gone",
  LENGTH_REQUIRED = "Length Required",
  PRECONDITION_FAILED = "Precondition Failed",
  PAYLOAD_TOO_LARGE = "Payload Too Large",
  REQUEST_URI_TOO_LONG = "Request-URI Too Long",
  UNSUPPORTED_MEDIA_TYPE = "Unsupported Media Type",
  REQUESTED_RANGE_NOT_SATISFIABLE = "Requested Range Not Satisfiable",
  EXPECTATION_FAILED = "Expectation Failed",
  IM_A_TEAPOT = "I'm a teapot",
  MISDIRECTED_REQUEST = "Misdirected Request",
  UNPROCESSABLE_ENTITY = "Unprocessable Entity",
  LOCKED = "Locked",
  FAILED_DEPENDENCY = "Failed Dependency",
  UPGRADE_REQUIRED = "Upgrade Required",
  PRECONDITION_REQUIRED = "Precondition Required",
  TOO_MANY_REQUESTS = "Too Many Requests",
  REQUEST_HEADER_FIELDS_TOO_LARGE = "Request Header Fields Too Large",
  CONNECTION_CLOSED_WITHOUT_RESPONSE = "Connection Closed Without Response",
  UNAVAILABLE_FOR_LEGAL_REASONS = "Unavailable For Legal Reasons",
  CLIENT_CLOSED_REQUEST = "Client Closed Request",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  NOT_IMPLEMENTED = "Not Implemented",
  BAD_GATEWAY = "Bad Gateway",
  SERVICE_UNAVAILABLE = "Service Unavailable",
  GATEWAY_TIMEOUT = "Gateway Timeout",
  HTTP_VERSION_NOT_SUPPORTED = "HTTP Version Not Supported",
  VARIANT_ALSO_NEGOTIATES = "Variant Also Negotiates",
  INSUFFICIENT_STORAGE = "Insufficient Storage",
  LOOP_DETECTED = "Loop Detected",
  NOT_EXTENDED = "Not Extended",
  NETWORK_AUTHENTICATION_REQUIRED = "Network Authentication Required",
  NETWORK_CONNECTION_TIMEOUT_ERROR = "Network Connection Timeout Error",
}
