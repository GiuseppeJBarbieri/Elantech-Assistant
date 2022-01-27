import { DEFAULT_COOKIE_VALUE, SESSION_ID_COOKIE_REGEX } from '../constants/Cookie';

export const isLoggedIn = (): boolean => {
    const sessionIdRegex = new RegExp(SESSION_ID_COOKIE_REGEX);
    return !!document.cookie.match(sessionIdRegex);
};

export const clearCookie = (): void => {
    document.cookie = DEFAULT_COOKIE_VALUE;
}
