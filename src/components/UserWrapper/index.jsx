import React from 'react'
import './styles.css'
import './themify-icons.css'
import CompanySidebar from '../CompanySidebar'
import CompanyHeader from '../CompanyHeader'
// import MyCompany from '../MyCompany'
import { Outlet } from 'react-router-dom'

export default function UserWrapper() {
    return (
        <>
            <div className="container-scroller">
                <CompanyHeader/>
                <div className="container-fluid page-body-wrapper">
                    <CompanySidebar/>
                    {/* <MyCompany/> */}
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
