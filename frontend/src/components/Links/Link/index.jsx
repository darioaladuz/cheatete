import "./index.scss";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import linksService from "../../../services/links";
import { Tooltip } from "@mui/material";

export default function Link({ link, links, setLinks, setFilteredLinks }) {

    const del = async id => {
        try {
            await linksService.del(id);
            setLinks(links.filter(link => link.id !== id));
            setFilteredLinks(links.filter(link => link.id !== id));
            // alert("item deleted successfully");
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="link">
            <a className="link__anchor" target="_blank" href={ link.url }>
                { link.title }
            </a>
            <div className="buttons">
                {/* <Tooltip title="Actualizar" placement="top">
                    <EditIcon className="edit" />
                </Tooltip> */}
                <Tooltip title="Eliminar" placement="top">
                    <DeleteIcon className="delete" onClick={ () => del(link.id) } />
                </Tooltip>
            </div>
        </div>
    )
}