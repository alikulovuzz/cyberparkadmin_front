import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext'



export default function CompanyHeader() {
  console.log("CompanyHeader is rendered")
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(()=>{
    setCompanyName(user['organization_name'])
  },[])
  
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };


  const handleOpenBackdrop = () => {
    sessionStorage.clear();
    setUser("")
    window.location.reload(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center" style={{ overflow: "hidden" }}>
          <a className="navbar-brand brand-logo me-5" href="/"><img src={require("../../media/Light_H-removebg.png")} className="me-2" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="/"><img src={require("../../media/Light_H-removebg.png")} alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav navbar-nav-right">
            <li className={`nav-item dropdown ${isNotificationDropdownOpen ? 'show' : ''}`}>
              <a className={`nav-link count-indicator dropdown-toggle`} onClick={toggleNotificationDropdown} id="notificationDropdown" href="#">
                <i className="ti-bell mx-0"></i>
                
                <span className="count"></span>
              </a>
              {isNotificationDropdownOpen && (
                <div className={`dropdown-menu dropdown-menu-right navbar-dropdown ${isNotificationDropdownOpen ? 'show' : ''}`} aria-labelledby="notificationDropdown">
                  
                  {/* Add more notification items here */}
                </div>
              )}
            </li>
            <li className={`nav-item nav-profile dropdown ${isProfileDropdownOpen ? 'show' : ''}`}>
              <a className={`nav-link dropdown-toggle`} onClick={toggleProfileDropdown} href="#" id="profileDropdown">
                <span>{companyName}</span>
              </a>
              {isProfileDropdownOpen && (
                <div className={`dropdown-menu dropdown-menu-right navbar-dropdown ${isProfileDropdownOpen ? 'show' : ''}`} onClick={handleOpenBackdrop} aria-labelledby="profileDropdown">
                  <p className="dropdown-item"  >
                    <i className="ti-power-off text-primary"></i>
                    Chiqish
                  </p>
                </div>
              )}
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
            data-toggle="offcanvas">
            <span className="ti-view-list"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
