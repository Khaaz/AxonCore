## Typedefs

<dl>
<dt><a href="#HTTP_CODE">HTTP_CODE</a> : <code>Number</code></dt>
<dd><ul>
<li>CONTINUE: 100</li>
<li>OK: 200</li>
<li>CREATED: 201</li>
<li>ACCEPTED: 202</li>
<li>NO_CONTENT: 204</li>
<li>MULTIPLE_CHOICES: 300</li>
<li>MOVED_PERMANENTLY: 301</li>
<li>FOUND: 302</li>
<li>BAD_REQUEST: 400</li>
<li>UNAUTHORIZED: 401</li>
<li>PAYMENT_REQUIRED: 402</li>
<li>FORBIDDEN: 403</li>
<li>NOT_FOUND: 404</li>
<li>METHOD_NOT_ALLOWED: 405</li>
<li>REQUEST_TIMEOUT: 408</li>
<li>CONFLICT: 409</li>
<li>GONE: 410</li>
<li>UNSUPPORTED_MEDIA_TYPE: 415</li>
<li>LOCKED: 423</li>
<li>TOO_MANY_REQUESTS: 429</li>
<li>INTERNAL_SERVER_ERROR: 500</li>
<li>NOT_IMPLEMENTED: 501</li>
<li>BAD_GATEWAY: 502</li>
<li>SERVICE_UNAVAILABLE: 503</li>
<li>GATEWAY_TIMEOUT: 504</li>
</ul>
</dd>
<dt><a href="#HTTP_MESSAGES">HTTP_MESSAGES</a> : <code>String</code></dt>
<dd><ul>
<li>100: &#39;Continue&#39;</li>
<li>101: &#39;Switching Protocols&#39;</li>
<li>102: &#39;Processing&#39;</li>
<li>103: &#39;Early Hints&#39;</li>
<li>200: &#39;OK&#39;</li>
<li>201: &#39;Created&#39;</li>
<li>202: &#39;Accepted&#39;</li>
<li>203: &#39;Non-Authoritative Information&#39;</li>
<li>204: &#39;No Content&#39;</li>
<li>205: &#39;Reset Content&#39;</li>
<li>206: &#39;Partial Content&#39;</li>
<li>207: &#39;Multi-Status&#39;</li>
<li>208: &#39;Already Reported&#39;</li>
<li>226: &#39;IM Used&#39;</li>
<li>300: &#39;Multiple Choices&#39;</li>
<li>301: &#39;Moved Permanently&#39;</li>
<li>302: &#39;Found&#39;</li>
<li>303: &#39;See Other&#39;</li>
<li>304: &#39;Not Modified&#39;</li>
<li>305: &#39;Use Proxy&#39;</li>
<li>307: &#39;Temporary Redirect&#39;</li>
<li>308: &#39;Permanent Redirect&#39;</li>
<li>400: &#39;Bad Request&#39;</li>
<li>401: &#39;Unauthorized&#39;</li>
<li>402: &#39;Payment Required&#39;</li>
<li>403: &#39;Forbidden&#39;</li>
<li>404: &#39;Not Found&#39;</li>
<li>405: &#39;Method Not Allowed&#39;</li>
<li>406: &#39;Not Acceptable&#39;</li>
<li>407: &#39;Proxy Authentication Required&#39;</li>
<li>408: &#39;Request Timeout&#39;</li>
<li>409: &#39;Conflict&#39;</li>
<li>410: &#39;Gone&#39;,</li>
<li>411: &#39;Length Required&#39;</li>
<li>412: &#39;Precondition Failed&#39;</li>
<li>413: &#39;Payload Too Large&#39;</li>
<li>414: &#39;URI Too Long&#39;</li>
<li>415: &#39;Unsupported Media Type&#39;</li>
<li>416: &#39;Range Not Satisfiable&#39;</li>
<li>417: &#39;Expectation Failed&#39;</li>
<li>418: &#39;I&#39;m a teapot&#39;</li>
<li>421: &#39;Misdirected Request&#39;</li>
<li>422: &#39;Unprocessable Entity&#39;</li>
<li>423: &#39;Locked&#39;</li>
<li>424: &#39;Failed Dependency&#39;</li>
<li>425: &#39;Unordered Collection&#39;</li>
<li>426: &#39;Upgrade Required&#39;</li>
<li>428: &#39;Precondition Required&#39;</li>
<li>429: &#39;Too Many Requests&#39;</li>
<li>431: &#39;Request Header Fields Too Large&#39;</li>
<li>451: &#39;Unavailable For Legal Reasons&#39;</li>
<li>500: &#39;Internal Server Error&#39;</li>
<li>501: &#39;Not Implemented&#39;</li>
<li>502: &#39;Bad Gateway&#39;</li>
<li>503: &#39;Service Unavailable&#39;</li>
<li>504: &#39;Gateway Timeout&#39;</li>
<li>505: &#39;HTTP Version Not Supported&#39;</li>
<li>506: &#39;Variant Also Negotiates&#39;</li>
<li>507: &#39;Insufficient Storage&#39;</li>
<li>508: &#39;Loop Detected&#39;</li>
<li>509: &#39;Bandwidth Limit Exceeded&#39;</li>
<li>510: &#39;Not Extended&#39;</li>
<li>511: &#39;Network Authentication Required&#39;</li>
</ul>
</dd>
<dt><a href="#LIBRARY_TYPES">LIBRARY_TYPES</a> : <code>Number</code></dt>
<dd><ul>
<li>ERIS: 0</li>
<li>DISCORDJS: 1</li>
</ul>
</dd>
<dt><a href="#LOGGER_TYPES">LOGGER_TYPES</a> : <code>Number</code></dt>
<dd><ul>
<li>DEFAULT: 0</li>
<li>CHALK: 1</li>
<li>SIGNALE: 2</li>
<li>WINSTON: 3</li>
</ul>
</dd>
<dt><a href="#DB_TYPES">DB_TYPES</a> : <code>Number</code></dt>
<dd><ul>
<li>DBLESS: 0</li>
<li>JSON: 1</li>
<li>MONGO: 2</li>
</ul>
</dd>
<dt><a href="#COMMAND_EXECUTION_TYPES">COMMAND_EXECUTION_TYPES</a> : <code>Number</code></dt>
<dd><ul>
<li>REGULAR: 0</li>
<li>ADMIN: 1</li>
<li>OWNER: 2</li>
</ul>
</dd>
<dt><a href="#COMMAND_EXECUTION_STATE">COMMAND_EXECUTION_STATE</a> : <code>Number</code></dt>
<dd><ul>
<li>NO_ERROR: 0</li>
<li>COOLDOWN: 1</li>
<li>INVALID_USAGE: 2</li>
<li>INVALID_PERMISSIONS_BOT: 3</li>
<li>INVALID_PERMISSIONS_USER: 4</li>
</ul>
</dd>
<dt><a href="#AXON_PERMISSIONS_LEVELS">AXON_PERMISSIONS_LEVELS</a> : <code>Number</code></dt>
<dd><ul>
<li>OWNER: 0,</li>
<li>ADMINISTRATOR: 1</li>
<li>MANAGER: 2</li>
<li>MODERATOR: 3</li>
</ul>
</dd>
<dt><a href="#PERMISSION_ADMIN">PERMISSION_ADMIN</a> : <code>String</code></dt>
<dd><p>&#39;Administrator&#39;</p>
</dd>
<dt><a href="#PERMISSION_MANAGER">PERMISSION_MANAGER</a> : <code>String</code></dt>
<dd><p>&#39;MANAGE_GUILD&#39;</p>
</dd>
<dt><a href="#WEBHOOK_TYPES">WEBHOOK_TYPES</a> : <code>String</code></dt>
<dd><ul>
<li>FATAL: &#39;FATAL&#39;</li>
<li>ERROR: &#39;ERROR&#39;</li>
<li>WARN: &#39;WARN&#39;</li>
<li>DEBUG: &#39;DEBUG&#39;</li>
<li>NOTICE: &#39;NOTICE&#39;</li>
<li>INFO: &#39;INFO&#39;</li>
<li>VERBOSE: &#39;VERBOSE&#39;</li>
</ul>
</dd>
<dt><a href="#LOG_LEVELS">LOG_LEVELS</a> : <code>String</code></dt>
<dd><ul>
<li>FATAL: &#39;fatal&#39;</li>
<li>ERROR: &#39;error&#39;</li>
<li>WARN: &#39;warn&#39;</li>
<li>DEBUG: &#39;debug&#39;</li>
<li>NOTICE: &#39;notice&#39;</li>
<li>INFO: &#39;info&#39;</li>
<li>VERBOSE: &#39;verbose&#39;</li>
</ul>
</dd>
<dt><a href="#WEBHOOK_TO_COLOR">WEBHOOK_TO_COLOR</a> : <code>String</code></dt>
<dd><ul>
<li>FATAL: &#39;fatal&#39;</li>
<li>ERROR: &#39;error&#39;</li>
<li>WARN: &#39;warn&#39;</li>
<li>DEBUG: &#39;debug&#39;</li>
<li>NOTICE: &#39;notice&#39;</li>
<li>INFO: &#39;info&#39;</li>
<li>VERBOSE: &#39;verbose&#39;</li>
</ul>
</dd>
<dt><a href="#TYPE_ERRORS">TYPE_ERRORS</a> : <code>String</code></dt>
<dd><ul>
<li>DAPI: &#39;DAPI error - failed to retrieve from Discord&#39;</li>
<li>DB: &#39;DB error - failed to retrieve from the DB&#39;</li>
<li>INTERNAL: &#39;Internal error - AxonClient/internal methods&#39;</li>
<li>UNKNOWN: &#39;Unexpected error&#39;</li>
</ul>
</dd>
</dl>

<a name="HTTP_CODE"></a>

## HTTP\_CODE : <code>Number</code>
* CONTINUE: 100
* OK: 200
* CREATED: 201
* ACCEPTED: 202
* NO_CONTENT: 204
* MULTIPLE_CHOICES: 300
* MOVED_PERMANENTLY: 301
* FOUND: 302
* BAD_REQUEST: 400
* UNAUTHORIZED: 401
* PAYMENT_REQUIRED: 402
* FORBIDDEN: 403
* NOT_FOUND: 404
* METHOD_NOT_ALLOWED: 405
* REQUEST_TIMEOUT: 408
* CONFLICT: 409
* GONE: 410
* UNSUPPORTED_MEDIA_TYPE: 415
* LOCKED: 423
* TOO_MANY_REQUESTS: 429
* INTERNAL_SERVER_ERROR: 500
* NOT_IMPLEMENTED: 501
* BAD_GATEWAY: 502
* SERVICE_UNAVAILABLE: 503
* GATEWAY_TIMEOUT: 504

**Kind**: global typedef  
<a name="HTTP_MESSAGES"></a>

## HTTP\_MESSAGES : <code>String</code>
* 100: 'Continue'
* 101: 'Switching Protocols'
* 102: 'Processing'
* 103: 'Early Hints'
* 200: 'OK'
* 201: 'Created'
* 202: 'Accepted'
* 203: 'Non-Authoritative Information'
* 204: 'No Content'
* 205: 'Reset Content'
* 206: 'Partial Content'
* 207: 'Multi-Status'
* 208: 'Already Reported'
* 226: 'IM Used'
* 300: 'Multiple Choices'
* 301: 'Moved Permanently'
* 302: 'Found'
* 303: 'See Other'
* 304: 'Not Modified'
* 305: 'Use Proxy'
* 307: 'Temporary Redirect'
* 308: 'Permanent Redirect'
* 400: 'Bad Request'
* 401: 'Unauthorized'
* 402: 'Payment Required'
* 403: 'Forbidden'
* 404: 'Not Found'
* 405: 'Method Not Allowed'
* 406: 'Not Acceptable'
* 407: 'Proxy Authentication Required'
* 408: 'Request Timeout'
* 409: 'Conflict'
* 410: 'Gone',
* 411: 'Length Required'
* 412: 'Precondition Failed'
* 413: 'Payload Too Large'
* 414: 'URI Too Long'
* 415: 'Unsupported Media Type'
* 416: 'Range Not Satisfiable'
* 417: 'Expectation Failed'
* 418: 'I\'m a teapot'
* 421: 'Misdirected Request'
* 422: 'Unprocessable Entity'
* 423: 'Locked'
* 424: 'Failed Dependency'
* 425: 'Unordered Collection'
* 426: 'Upgrade Required'
* 428: 'Precondition Required'
* 429: 'Too Many Requests'
* 431: 'Request Header Fields Too Large'
* 451: 'Unavailable For Legal Reasons'
* 500: 'Internal Server Error'
* 501: 'Not Implemented'
* 502: 'Bad Gateway'
* 503: 'Service Unavailable'
* 504: 'Gateway Timeout'
* 505: 'HTTP Version Not Supported'
* 506: 'Variant Also Negotiates'
* 507: 'Insufficient Storage'
* 508: 'Loop Detected'
* 509: 'Bandwidth Limit Exceeded'
* 510: 'Not Extended'
* 511: 'Network Authentication Required'

**Kind**: global typedef  
<a name="LIBRARY_TYPES"></a>

## LIBRARY\_TYPES : <code>Number</code>
* ERIS: 0
* DISCORDJS: 1

**Kind**: global typedef  
<a name="LOGGER_TYPES"></a>

## LOGGER\_TYPES : <code>Number</code>
* DEFAULT: 0
* CHALK: 1
* SIGNALE: 2
* WINSTON: 3

**Kind**: global typedef  
<a name="DB_TYPES"></a>

## DB\_TYPES : <code>Number</code>
* DBLESS: 0
* JSON: 1
* MONGO: 2

**Kind**: global typedef  
<a name="COMMAND_EXECUTION_TYPES"></a>

## COMMAND\_EXECUTION\_TYPES : <code>Number</code>
* REGULAR: 0
* ADMIN: 1
* OWNER: 2

**Kind**: global typedef  
<a name="COMMAND_EXECUTION_STATE"></a>

## COMMAND\_EXECUTION\_STATE : <code>Number</code>
* NO_ERROR: 0
* COOLDOWN: 1
* INVALID_USAGE: 2
* INVALID_PERMISSIONS_BOT: 3
* INVALID_PERMISSIONS_USER: 4

**Kind**: global typedef  
<a name="AXON_PERMISSIONS_LEVELS"></a>

## AXON\_PERMISSIONS\_LEVELS : <code>Number</code>
* OWNER: 0,
* ADMINISTRATOR: 1
* MANAGER: 2
* MODERATOR: 3

**Kind**: global typedef  
<a name="PERMISSION_ADMIN"></a>

## PERMISSION\_ADMIN : <code>String</code>
'Administrator'

**Kind**: global typedef  
<a name="PERMISSION_MANAGER"></a>

## PERMISSION\_MANAGER : <code>String</code>
'MANAGE_GUILD'

**Kind**: global typedef  
<a name="WEBHOOK_TYPES"></a>

## WEBHOOK\_TYPES : <code>String</code>
* FATAL: 'FATAL'
* ERROR: 'ERROR'
* WARN: 'WARN'
* DEBUG: 'DEBUG'
* NOTICE: 'NOTICE'
* INFO: 'INFO'
* VERBOSE: 'VERBOSE'

**Kind**: global typedef  
<a name="LOG_LEVELS"></a>

## LOG\_LEVELS : <code>String</code>
* FATAL: 'fatal'
* ERROR: 'error'
* WARN: 'warn'
* DEBUG: 'debug'
* NOTICE: 'notice'
* INFO: 'info'
* VERBOSE: 'verbose'

**Kind**: global typedef  
<a name="WEBHOOK_TO_COLOR"></a>

## WEBHOOK\_TO\_COLOR : <code>String</code>
* FATAL: 'fatal'
* ERROR: 'error'
* WARN: 'warn'
* DEBUG: 'debug'
* NOTICE: 'notice'
* INFO: 'info'
* VERBOSE: 'verbose'

**Kind**: global typedef  
<a name="TYPE_ERRORS"></a>

## TYPE\_ERRORS : <code>String</code>
* DAPI: 'DAPI error - failed to retrieve from Discord'
* DB: 'DB error - failed to retrieve from the DB'
* INTERNAL: 'Internal error - AxonClient/internal methods'
* UNKNOWN: 'Unexpected error'

**Kind**: global typedef  
