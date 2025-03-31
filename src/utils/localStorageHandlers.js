// Check if code verifier is saved in local storage
export const isCodeVerifierSaved = () => {
    const codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) return false;
    return true;
}

// Save code verifier in local storage
export const saveCodeVerifier = (codeVerifier) => {
    localStorage.setItem('codeVerifier', codeVerifier);
}

// Retrieve code verifier from local storage
export const retrieveCodeVerifier = () => localStorage.getItem('codeVerifier');


// Check if access token is saved in local storage
export const isAccessTokenSaved = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;
    return true;
}

// Save access token in local storage
export const saveAccessToken = ({ accessToken, expiresIn, refreshToken, scope }) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('scope', scope);
}

// Retrieve access token from local storage
export const retrieveAccessToken = () => localStorage.getItem('accessToken');

// Check if access token is expired
export const hasAccessTokenExpired = () => {
    const expiresAt = Number(localStorage.getItem('expiresAt'));
    if (!expiresAt) return true;
    return Date.now() > expiresAt;
}

// Retrieve refresh token from local storage
export const retrieveRefreshToken = () => localStorage.getItem('refreshToken');

// Save Spotify user ID in local storage
export const saveSpotifyUserID = (userID) => {
    localStorage.setItem('userID', userID);
}

// Retrieve Spotify user ID from local storage
export const retrieveSpotifyUserID = () => localStorage.getItem('userID');

// Check if Spotify user ID is saved in local storage
export const isSpotifyUserIDSaved = () => {
    const userID = localStorage.getItem('userID');
    if (!userID) return false;
    return true;
}