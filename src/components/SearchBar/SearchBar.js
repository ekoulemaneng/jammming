import styles from './SearchBar.module.css';

export const SearchBar = () => {

    return (
        <div>
            <input name="song_title" type="text" placeholder="Search for a song by title" />
            <input name="artist_name" type="text" placeholder="Search for a song by artist" />
            <input name="album_name" type="text" placeholder="Search for a song by album" />
            <input name="genre" type="text" placeholder="Search for a song by genre" />
            <select name="genre">
                <option value="all">All Genres</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="country">Country</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
            </select>
            <button>Search</button>
        </div>
    );
}; 