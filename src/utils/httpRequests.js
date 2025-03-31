import { clientId, redirectUri, authUrl, scope } from '../config';
import { retrieveSpotifyUserID } from './localStorageHandlers';
import { generateCodeChallenge } from './pkceCodesGenerators';

export const requestUserAuthorization = async (codeVerifier) => {

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const params = {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        scope
    };

    authUrl.search = new URLSearchParams(params).toString();

    window.location.href = authUrl.toString();

}

export const requestAccessToken = async (code, codeVerifier) => {

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        })  
    });

    if (!response.ok) throw new Error({ status: response.status, message: response.statusText });

    const data = await response.json();

    return { accessToken: data.access_token, expiresIn: data.expires_in, refreshToken: data.refresh_token, scope: data.scope };

}

export const requestRefreshToken = async (refreshToken) => {

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })  
    });

    if (!response.ok) throw new Error({ status: response.status, message: response.statusText });

    const data = await response.json();

    return { accessToken: data.access_token, expiresIn: data.expires_in, refreshToken: data.refresh_token, scope: data.scope };

}

export const getTracks = async (accessToken, { title, artist, album, genre } ) => {

    const queryParts = [];
    if (title) queryParts.push(`track:${encodeURIComponent(title)}`);
    if (artist) queryParts.push(`artist:${encodeURIComponent(artist)}`);
    if (album) queryParts.push(`album:${encodeURIComponent(album)}`);
    if (genre) queryParts.push(`genre:${encodeURIComponent(genre)}`);
    const q = queryParts.length > 0 ? `${queryParts.join(' ')}` : '';

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=15`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) throw new Error({ status: response.status, message: response.statusText });

    const data = await response.json();

    return data.tracks.items.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        uri: track.uri
    }));
}

export const getSpotifyUserID = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if (!response.ok) throw new Error({ status: response.status, message: response.statusText });
    const data = await response.json();
    return data.id;
}

export const createPlaylist = async (accessToken, name) => {
    const spotifyUserID = retrieveSpotifyUserID();
    const response = await fetch(`https://api.spotify.com/v1/users/${spotifyUserID}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error({ status: response.status, message: response.statusText });
    const data = await response.json();
    return data.id;
}

export const addTracksToPlaylist = async (accessToken, playlistID, uris) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris, position: 0 })
    });
    if (!response.ok) throw new Error({ status: response.status, message: response.statusText });
    const data = await response.json();
    return data;
}

