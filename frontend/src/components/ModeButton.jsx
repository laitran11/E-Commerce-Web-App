import React, { useContext } from 'react'
import '../styles/ModeButton.css'
import { ThemeContext } from '../ThemeContext';
export default function ModeButton() {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div className="btn-group">
            <button
                type="button"
                className="dropdown-toggle btn-theme"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className={`bi ${theme === "light" ? "bi-brightness-high-fill sun-theme" : "bi-moon-stars-fill moon-theme"}`}></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => setTheme("light")}
                    >
                        <i className="bi bi-brightness-high-fill sun-theme"></i> Light mode
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => setTheme("dark")}
                    >
                        <i className="bi bi-moon-stars-fill moon-theme"></i> Dark mode
                    </button>
                </li>
            </ul>
        </div>
    )
}
