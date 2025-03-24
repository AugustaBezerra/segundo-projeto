import React, {useState, useEffect} from "react";
import {Sun, Moon} from "lucide-react"

const Settings: React.FC = () => {

    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.classList.remove("light-theme", "dark-theme");
        document.body.classList.add(theme === "light" ? "light-theme" : "dark-theme");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light" ));
    };



    return (
         <>   
            <h1> Configurações</h1>
            <button onClick={toggleTheme} className="theme-toggle">
                {theme === "light" ? <Moon size={20}/> : <Sun size={20}/>}
                <span> Mudar para {theme === "light" ? "Escuro" : "Claro"}</span>
            </button>
        </>
    );
};

export default Settings