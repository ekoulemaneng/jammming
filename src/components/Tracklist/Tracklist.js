import { Track } from '../Track/Track';
import styles from './Tracklist.module.css';

export const Tracklist = ({ tracks, addToPlaylist, removeFromPlaylist, tracklistType }) => {
    return (
        <ul className={styles.List}>
            {tracks.map(track => (
                <li key={track.id}>
                    <Track 
                        id={track.id}
                        title={track.title} 
                        artist={track.artist} 
                        album={track.album} 
                        uri={track.uri}
                        addToPlaylist={addToPlaylist}
                        removeFromPlaylist={removeFromPlaylist}
                        tracklistType={tracklistType} 
                    />
                </li>
            ))}
        </ul>
    );
}