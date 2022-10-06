import { useEffect, useState } from "react";
import Link from "./Link";
import linksService from "../../services/links";
import "./index.scss";

import AddIcon from '@mui/icons-material/Add';
import NewLink from "./NewLink";
import Search from "./Search";
import { Tooltip } from "@mui/material";

export default function Links() {
    const [links, setLinks] = useState([]);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchLinks = async () => {
        const fetchedLinks = await linksService.getAll();
        setLinks(fetchedLinks);
        setFilteredLinks(fetchedLinks);
        }
        fetchLinks();
    }, [])

    return (
        <div className="links">
            <Tooltip title="Añadir" placement="top">
                <button onClick={ () => setActive(true) }><AddIcon /></button>
            </Tooltip>
            <Search links={ links } setFilteredLinks={ setFilteredLinks } />
            {
                filteredLinks.map(link => {
                    return <Link link={ link } links={ filteredLinks } setLinks={ setLinks } setFilteredLinks={ setFilteredLinks } />
                })
            }

            <NewLink active={ active } setActive={ setActive } links={ filteredLinks } setLinks={ setLinks } setFilteredLinks={ setFilteredLinks } />
        </div>
    )
}