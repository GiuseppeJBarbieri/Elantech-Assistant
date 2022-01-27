/**
 * Set `document.cookie` to this to effectively clear it.
 */
 export const DEFAULT_COOKIE_VALUE = 'sessionId=';

 /**
  * Regex pattern to match against `document.cookie`
  * for retrieving the current session ID.
  */
 export const SESSION_ID_COOKIE_REGEX = 'sessionId=([^;]+)';
 