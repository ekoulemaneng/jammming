import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';
import { getSpotifyUserID, requestAccessToken, requestRefreshToken, requestUserAuthorization } from './utils/httpRequests';
import { isAccessTokenSaved, saveAccessToken, hasAccessTokenExpired, isSpotifyUserIDSaved, saveSpotifyUserID, isCodeVerifierSaved, saveCodeVerifier, retrieveCodeVerifier, retrieveRefreshToken } from './utils/localStorageHandlers';
import './App.css';
import { generateCodeVerifier } from './utils/pkceCodesGenerators';

export const App = () => {

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [tracks, setTracks] = useState([]);
    const [uris, setUris] = useState([]);
    const [playlist, setPlaylist] = useState([])
    const [playlistName, setPlaylistName] = useState('');

    useEffect(() => {

        const authenticate = async () => {

            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            let codeVerifier;
            
            if (!isCodeVerifierSaved()) {
                codeVerifier = generateCodeVerifier()
                saveCodeVerifier(codeVerifier);
            } else codeVerifier = retrieveCodeVerifier();

            if (code) {
                const { accessToken, expiresIn, refreshToken, scope } = await requestAccessToken(code, codeVerifier);
                saveAccessToken({ accessToken, expiresIn, refreshToken, scope });
                const userID = await getSpotifyUserID(accessToken);
                saveSpotifyUserID(userID);
                window.location.href = new URL('http://127.0.0.1:1234/').toString();
            } else await requestUserAuthorization(codeVerifier);

        }

        const refreshingToken = async () => {

            const _refreshToken = retrieveRefreshToken();
            const { accessToken, expiresIn, refreshToken, scope } = await requestRefreshToken(_refreshToken);
            saveAccessToken({ accessToken, expiresIn, refreshToken, scope });

            if (!isSpotifyUserIDSaved()) {
                const userID = await getSpotifyUserID(accessToken);
                saveSpotifyUserID(userID);
            }

        }

        if (!isAccessTokenSaved()) authenticate();
        else if (hasAccessTokenExpired()) refreshingToken();

    }, []);

    const addToPlaylist = (id) => {
        if (playlist.find(track => track.id === id)) return;
        const track = tracks.find(song => song.id === id);
        setPlaylist(playlist => [...playlist, track]);
        setUris(uris => [...uris, track.uri]);
    }

    const removeFromPlaylist = (id) => {
        setPlaylist(playlist => playlist.filter(track => track.id !== id));
        setUris(uris => uris.filter(uri => uri !== playlist.find(track => track.id === id).uri));
    }

    const changePlaylistName = (name) => {
        setPlaylistName(name);
    }

    const resetPlaylist = () => {
        setPlaylistName('');
        setPlaylist([]);
        setUris([]);
    }

    return (
        <>
            <header>Ja<span>mmm</span>ing</header>
            <SearchBar 
                title={title}
                setTitle={setTitle}
                artist={artist}
                setArtist={setArtist}
                album={album}
                setAlbum={setAlbum}
                genre={genre}
                setGenre={setGenre}
                setTracks={setTracks}
            />
            <main>
                <SearchResults 
                    results={tracks} 
                    addToPlaylist={addToPlaylist}
                    tracklistType="results" 
                />
                <Playlist 
                    playlistName={playlistName}
                    changePlaylistName={changePlaylistName}
                    playlist={playlist} 
                    removeFromPlaylist={removeFromPlaylist}
                    tracklistType="playlist" 
                    uris={uris}
                    resetPlaylist={resetPlaylist}
                />
            </main>
        </>
    );
}
