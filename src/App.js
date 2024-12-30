import { SearchBar } from './components/SearchBar/SearchBar';
import { Songs } from './components/Songs/Songs';
import './App.css';

export const App = () => {

    return (
        <>
            <h1 id="header">Ja<span>mmm</span>ing</h1>
            <SearchBar />
            <Songs />
        </>
    );
}
