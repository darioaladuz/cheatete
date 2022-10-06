import "./index.scss";

import CloseIcon from '@mui/icons-material/Close';
import linksService from "../../../services/links";

export default function NewLink({ active, setActive, links, setLinks, setFilteredLinks }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const link = {
          title: e.target.title.value,
          url: e.target.url.value
        }
    
        try {
          const newLink = await linksService.add(link);
          setLinks(links.concat(newLink));
          setFilteredLinks(links.concat(newLink));
          console.log(newLink);
        } catch(error) {
          console.log(error);
        }

        setActive(false);
      }

    return (
        <div className={`newlink ${active && 'active'}`}>
            <div className="newlink__header">
                <h2>Nuevo link</h2>
                <button onClick={ () => setActive(false) }><CloseIcon /></button>
            </div>
            <form onSubmit={ handleSubmit } action="" method="POST">
                <label htmlFor="title">Título
                    <input type="text" id="title" name="title" placeholder="10fastfingers" required />
                </label>
                <label htmlFor="url">URL
                    <input type="text" id="url" name="url" placeholder="https://10fastfingers.com/typing-test/english" required />
                </label>
                <button>Añadir</button>
            </form>
        </div>
    )
}