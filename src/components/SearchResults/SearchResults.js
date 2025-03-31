import { Tracklist } from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

export const SearchResults = ({ results, addToPlaylist, tracklistType }) => {
    return (
        <div className={styles.Main}>
            <h2 className={styles.Title}>Results</h2>
            <Tracklist 
                tracks={results} 
                addToPlaylist={addToPlaylist}
                tracklistType={tracklistType} 
            />
        </div>
    );
}