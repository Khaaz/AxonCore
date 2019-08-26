/**
 * All CONSTANTS used in AxonCore or related to AxonCore behavior / functioning
 * Type andEnums definition
 */

export const HTTP_CODE = {
    CONTINUE: 100,

    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    LOCKED: 423,
    TOO_MANY_REQUESTS: 429,
    
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

export const HTTP_MESSAGES = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Unordered Collection',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    509: 'Bandwidth Limit Exceeded',
    510: 'Not Extended',
    511: 'Network Authentication Required',
};

export const LIBRARY_TYPES = {
    ERIS: 0,
    DISCORDJS: 1,
};

export const LOGGER_TYPES = {
    DEFAULT: 0,
    CHALK: 1,
    SIGNALE: 2,
    WINSTON: 3,
};

export const DB_TYPES = {
    JSON: 0,
    MONGO: 1,
};

export const AXON_PERMISSIONS_LEVELS = {
    OWNER: 0,
    ADMINISTRATOR: 1, // administrator
    MANAGER: 2, // manageGuild
    MODERATOR: 3,
};
export const PERMISSION_ADMIN = 'ADMINISTRATOR';
export const PERMISSION_MANAGER = 'MANAGE_GUILD';

export const COMMAND_EXECUTION_TYPES = {
    REGULAR: 0,
    ADMIN: 1,
    OWNER: 2,
};

export const COMMAND_EXECUTION_STATE = {
    NO_ERROR: 0,
    COOLDOWN: 1,
    INVALID_USAGE: 2,
    INVALID_PERMISSIONS_BOT: 3,
    INVALID_PERMISSIONS_USER: 4,
};

export const WEBHOOK_TYPES = {
    STATUS: 'Status',
    LOADER: 'Loader',
    ERROR: 'Error',
    MISC: 'Misc',
};

export const TYPE_ERRORS = {
    api: 'DAPI error - failed to retrieve from Discord',
    db: 'DB error - failed to retrieve from the DB',
    internal: 'Internal error - AxonClient/internal methods',
    unexpected: 'Unexpected error',
};

export default {
    HTTP_CODE,
    HTTP_MESSAGES,
    LIBRARY_TYPES,
    LOGGER_TYPES,
    DB_TYPES,
    AXON_PERMISSIONS_LEVELS,
    PERMISSION_ADMIN,
    PERMISSION_MANAGER,
    COMMAND_EXECUTION_TYPES,
    COMMAND_EXECUTION_STATE,
    WEBHOOK_TYPES,
    TYPE_ERRORS,
};
