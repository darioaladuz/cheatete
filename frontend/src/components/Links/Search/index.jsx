import './index.scss';

export default function Search({ links, setFilteredLinks }) {

    const filter = (e) => {
        const filteredLinks = links.filter(link => link.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLinks(filteredLinks);
    }

    return (
        <input onInput={ filter } type="text" placeholder="Comienza a filtrar..." />
    )
}