export const TitleContextMenu = ({ uri, top, left }) => {
    top -= 40;
    return (
        <p style={{ position: 'absolute', top, left, backgroundColor: 'white', color: 'black', padding: 10, borderRadius: 15 }}>{uri}</p>
    );
}