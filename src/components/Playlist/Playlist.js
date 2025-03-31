import { useState } from 'react';
import { Tracklist } from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';
import { retrieveAccessToken } from '../../utils/localStorageHandlers';
import { addTracksToPlaylist, createPlaylist } from '../../utils/httpRequests';

export const Playlist = ({ playlistName, changePlaylistName, playlist, removeFromPlaylist, tracklistType, resetPlaylist, uris }) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleButtonMouseOver = () => {
        setIsHovered(true);
    }

    const handleButtonMouseOut = () => {
        setIsHovered(false);
    }

    const handleChangePlaylistName = ({ target }) => {
        changePlaylistName(target.value);
    }

    const handleSubmitPlaylist = async () => {
        const accessToken = retrieveAccessToken();
        const playlistID = await createPlaylist(accessToken, playlistName);
        await addTracksToPlaylist(accessToken, playlistID, uris);
        resetPlaylist();

    }

    return (
        <div className={styles.Main}>
            <input className={styles.InputTitle} value={playlistName} onChange={handleChangePlaylistName} type="text" />
            <Tracklist 
                tracks={playlist} 
                removeFromPlaylist={removeFromPlaylist}
                tracklistType={tracklistType} 
            />
            <button 
                onMouseOver={handleButtonMouseOver} 
                onMouseOut={handleButtonMouseOut} 
                onClick={handleSubmitPlaylist}
                className={isHovered ? styles.ButtonHovered : styles.Button} 
                type="submit"
            >
                ADD TO SPOTIFY
            </button>
        </div>
    );
}