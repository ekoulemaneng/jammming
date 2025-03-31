import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { TitleContextMenu } from '../TitleContextMenu/TitleContextMenu';
import styles from './Track.module.css';

export const Track = ({ id, title, artist, album, uri, addToPlaylist, removeFromPlaylist, tracklistType }) => {

    const [displayContextMenu, setDisplayContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    const handleIconOnClick = ({ target }) => {
        const id = target.dataset.id || target.parentElement.dataset.id;
        if (tracklistType === 'results') addToPlaylist(id);
        else removeFromPlaylist(id);
    }

    const handleRightClickOnTitle = e => {
        e.preventDefault();
        setDisplayContextMenu(true);
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
    }

    const handleClickOnTitle = () => {
        setDisplayContextMenu(false);
    }

    return (
        <div key={id} className={styles.Track}>
            <div>
                <p className={styles.Title} onContextMenu={handleRightClickOnTitle} onClick={handleClickOnTitle}>
                    {title}{displayContextMenu && <TitleContextMenu uri={uri} top={contextMenuPosition.y} left={contextMenuPosition.x} />}
                </p>
                <p>{artist} | {album}</p>
            </div>
            <FontAwesomeIcon 
                className={styles.Icon} 
                icon={ tracklistType === 'results' ? faPlus : faMinus }
                data-id={id} 
                onClick={handleIconOnClick}
            />
        </div>
    );
}