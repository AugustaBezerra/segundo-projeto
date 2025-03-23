import React from "react";
import {Home, MessageSquare, Settings} from "lucide-react"
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return(
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/"> <Home /> </Link></li>
                <li><Link to="/messages"><MessageSquare /> </Link></li>
                <li><Link to ="/settings"> <Settings/> </Link></li>
            </ul>

        </nav>
    );
};

export default Navbar;