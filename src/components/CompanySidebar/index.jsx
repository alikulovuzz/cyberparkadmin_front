import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom"

export default function CompanySidebar() {
    console.log("Company sidebar componenet is rendered")
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <>
            <nav className="sidebar sidebar-offcanvas">
                <div className="nav">
                    <NavLink
                        to="company"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <span className="nav-link">
                            <i className="ti-shield menu-icon"></i>
                            <span className="menu-title">Mening kompaniyam</span>
                        </span>
                    </NavLink>
                    <NavLink
                        to="application"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <span className="nav-link">
                            <i className="ti-file menu-icon"></i>
                            <span className="menu-title">Arizalar</span>
                        </span>
                    </NavLink>
                    <NavLink
                        to="reports"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                        onClick={toggleClass}
                    >
                        <span className="nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="auth">
                            <i className="ti-clip menu-icon"></i>
                            <span className="menu-title">Hisobot</span>
                            <i className="menu-arrow"></i>
                        </span>

                    </NavLink>
                    <div className={`collapse ${!isActive ? "display_sidebar" : ""}`} id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <NavLink
                                    to="reports/quarterly"
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"}
                                >
                                    Choraklik hisobot
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="reports/auditing"
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"}
                                >
                                    Auditorlik xulosasi
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="reports/monthly"
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"}
                                >
                                    Oylik daromad
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
