import React, { useContext, useState } from 'react'
import './styles.css'
import { company_signin, user_signin } from '../../utils/API_urls'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { postRequest } from '../../utils/resquests';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function SignInSide({admin}) {

    const [openLanguages, setOpenLanguages] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleOpenDropDown = (_) => {
        setOpenLanguages(prev => !prev)
    }

    const closeOpenDropDown = (event) => {
        if (event.target.className != "dropbtn") {
            setOpenLanguages(false)
        }
    }

    const handleCloseBackdrop = () => {
        setLoading(false);
    };

    const handleOpenBackdrop = () => {
        setLoading(true);
    };

    const handleSubmit = () => {
        handleOpenBackdrop()
        postRequest(company_signin, {
            pinfl: username,
            password: password,
        }).then(response => {
            if(response.data.message=="user does not exist and not verified"){
                handleCloseBackdrop()
                setError(true)
            }
            if(response.data.token){
                sessionStorage.setItem('x-access-token', response.data.token)
                setUser(response.data.data)
                navigate("/user");
            }
            handleCloseBackdrop()
        }).catch(error => {
            console.log(error)
            handleCloseBackdrop()
            setError(true)
        })
    }

    const gotoAdmin = () => {
        navigate("/admin-login")
    }

    const gotoUser = () => {
        navigate("/login")
    }

    return (
        <div className="d-lg-flex half" onClick={closeOpenDropDown}>
            <div className="bg">
                <div>
                    <div>
                        <div className="image-container">
                            <img src={require("./images/logo2.png")} alt="" />
                        </div>

                    </div>
                </div>
            </div>
            <div className="contents">
                <div className="container">
                    <div className="right-top col-md-12">
                        {
                            (!admin)?
                                <button
                                    onClick={gotoAdmin}
                                >
                                    <i className="fas fa-user-circle"></i>
                                    <span>Adminlar uchun</span>
                                </button>
                            :
                                <button
                                    onClick={gotoUser}
                                >
                                    <i className="fas fa-user-circle"></i>
                                    <span>Userlar uchun</span>
                                </button>
                        }
                        <div className="dropdown">
                            <button onClick={handleOpenDropDown} className="dropbtn">Uz</button>
                            <div id="myDropdown" className={`dropdown-content ${openLanguages ? "show" : ""}`}>
                                <a>Uz</a>
                                <a>Ru</a>
                                <a>En</a>
                            </div>
                        </div>
                    </div>
                    <div className="right-block">
                        <div className="align-items-center justify-content-center col-md-8 right-form">
                            <div className="col-md-12">
                                <div>
                                    <h3>Kabinetga kirish</h3>
                                </div>
                                <div>
                                    <div className={`form-group first mb-10 ${username ? "field--not-empty" : ""}`}>
                                        <label htmlFor="username">PINFL</label>
                                        <input type="text" className="form-control" id="username" onChange={(event) => { setUsername(event.target.value) }} />
                                    </div>
                                    <div className={`form-group last mb-3 ${password ? "field--not-empty" : ""}`}>
                                        <label htmlFor="password">Parol</label>
                                        <input type="password" className="form-control" id="password" onChange={(event) => { setPassword(event.target.value) }} />
                                    </div>
                                    <input type="submit" value="Kirish" className="btn btn-block btn-primary" onClick={handleSubmit} />
                                    <div className="submit-message">
                                        <span>Sizda shaxsiy kabinetingiz yo'qmi? <a href="#">Ro'yhatdan o'tish</a></span>
                                    </div>
                                    <div className="notification-msg">
                                        <span>Eslatma: Ushbu sahifadan Cyber Park joriy rezidentlari foydalanishlari mumkin</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleCloseBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => {setError(false)}}
                message="Login yoki password xato"
                severity="error"
            />
        </div>
    )
}
