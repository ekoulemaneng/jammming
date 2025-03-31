import { useState } from 'react';
import { getTracks } from './../../utils/httpRequests';
import { retrieveAccessToken } from '../../utils/localStorageHandlers';
import styles from './SearchBar.module.css';

export const SearchBar = ({ title, setTitle, artist, setArtist, album, setAlbum, genre, setGenre, setTracks }) => {

    const [focus, setFocus] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleInputFocus = ({ target }) => {       
        setFocus(target.name);
    };

    const handleInputChange = ({ target }) => {
        switch (target.name) {
            case 'title':
                setTitle(target.value);
                break;
            case 'artist':
                setArtist(target.value);
                break;
            case 'album':
                setAlbum(target.value);
                break;
            case 'genre':
                setGenre(target.value);
                break;
            default:
                break;
        }
    }

    const handleMouseOver = () => {
        setIsHovered(true);
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    const handleClickOnSearch = async (e) => {
        e.preventDefault();
        setTracks(await fetchData());
    }

    const fetchData = async () => {
        const accessToken = retrieveAccessToken();
        const tracks = await getTracks(accessToken, { title, artist, album, genre });
        return tracks;
    }

    return (
        <div className={styles.SearchBar}>
            <input onFocus={handleInputFocus} onChange={handleInputChange} value={title} className={focus === 'title' ? styles.InputOnFocus : styles.Input} name="title" type="text" placeholder="Search for a song by name" />
            <input onFocus={handleInputFocus} onChange={handleInputChange} value={artist} className={focus === 'artist' ? styles.InputOnFocus : styles.Input} name="artist" type="text" placeholder="Search for a song by artist" />
            <input onFocus={handleInputFocus} onChange={handleInputChange} value={album} className={focus === 'album' ? styles.InputOnFocus : styles.Input} name="album" type="text" placeholder="Search for a song by album" />
            <input onFocus={handleInputFocus} onChange={handleInputChange} value={genre} className={focus === 'genre' ? styles.InputOnFocus : styles.Input} name="genre" type="text" placeholder="Search for a song by genre" />
            <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClickOnSearch} className={isHovered ? styles.ButtonOnHover : styles.Button} type="submit">Search</button>
        </div>
    );

}; 