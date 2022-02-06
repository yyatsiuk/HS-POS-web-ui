/* eslint-disable no-bitwise */
import jwt_decode from "jwt-decode";

export const JWT_SECRET = 'devias-top-secret-key';
export const JWT_EXPIRES_IN = 3600 * 24 * 2; // 2 days

// Since we are unable to sign a JWT in a browser
// because "jsonwebtoken" library is available on server side only, NodeJS environment
// we simply simulate a signed token, no complex checks because on server side
// you're using the library
export const sign = (payload, privateKey, header) => {
    const now = new Date();
    const newHeader = {...header};
    newHeader.expiresIn = new Date(now.getTime() + newHeader.expiresIn);
    const encodedHeader = btoa(JSON.stringify(newHeader));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(Array
        .from(encodedPayload)
        .map((item, key) => (String.fromCharCode(item.charCodeAt(0) ^ privateKey[key
        % privateKey.length].charCodeAt(0))))
        .join(''));

    return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Since we create a fake signed token, we have to implement a fake jwt decode
// platform to simulate "jwt-decode" library.
export const decode = (token) => {
    return jwt_decode(token);
};

export const isJWTValid = () => {
    return decode(window.localStorage.getItem('accessToken')).exp * 1000 < Date.now();
}

