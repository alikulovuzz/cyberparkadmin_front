import { Hidden } from '@mui/material'
import React from 'react'

export default function CompanyHeader() {
    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center" style={{overflow: "hidden"}}>
                    <a className="navbar-brand brand-logo me-5" href="/"><img src={require("../../media/Light_H-removebg.png")}
                        className="me-2" alt="logo" /></a>
                    <a className="navbar-brand brand-logo-mini" href="/"><img src={require("../../media/Light_H-removebg.png")} alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
                                data-bs-toggle="dropdown">
                                <i className="ti-bell mx-0"></i>
                                <span className="count"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                <a className="dropdown-item">
                                    <div className="item-thumbnail">
                                        <div className="item-icon bg-success">
                                            <i className="ti-info-alt mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <h6 className="font-weight-normal">Application Error</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item">
                                    <div className="item-thumbnail">
                                        <div className="item-icon bg-warning">
                                            <i className="ti-settings mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <h6 className="font-weight-normal">Settings</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Private message
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item">
                                    <div className="item-thumbnail">
                                        <div className="item-icon bg-info">
                                            <i className="ti-user mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <h6 className="font-weight-normal">New user registration</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            2 days ago
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item nav-profile dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                                <span>Kibernetikada Innovatsiyalar IT parki</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <a className="dropdown-item">
                                    <i className="ti-settings text-primary"></i>
                                    Settings
                                </a>
                                <a className="dropdown-item">
                                    <i className="ti-power-off text-primary"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                        data-toggle="offcanvas">
                        <span className="ti-view-list"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}
