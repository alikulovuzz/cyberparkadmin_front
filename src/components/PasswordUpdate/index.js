import React, { useContext, useState } from "react";
import "./style.css";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { postRequest } from "../../utils/resquests";
import { Toaster, toast } from "sonner";
import { UserContext } from "../../context/UserContext";


export default function PasswordUpdate() {
    const { user, setUser } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [shownewPasswordConfirm, setShowNewPasswordConfirm] = React.useState(false);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowNewPasswordConfirm = () => setShowNewPasswordConfirm((show) => !show);
    const handleExitButton = () => {
        sessionStorage.clear();
        setUser("")
        window.location.reload(false);
    };
    //error new confirm passowrd
    const [confirmPassword, setConfirmPassword] = useState("");
    const handeNewPassword = () => {
        if (newPassword != newPasswordConfirm) {
            setConfirmPassword(true)
        } else {
            setConfirmPassword(false)
        }
    };
    const handeSubmit = () => {
        if (!confirmPassword) {
            postRequest("/company_form/changepassword", {
                password: password,
                newPassword: newPasswordConfirm
            })
                .then((response) => {
                    toast.success("Muvaffaqiyatli!");
                    //   handleClose();
                    handleExitButton()
                })
                .catch((error) => {
                    // console.log(error);
                    //   handleClose();
                    toast.error("Serverda xatolik yoki keyinorq qaytadan urinib ko'ring");
                });
        }
    };
    return (
        <>
            <div className="custom-pasUp">
                <div className="container custom-pasUp">
                    <div className="right-blockpasUp custom-pasUp">
                        <div className="align-items-center justify-content-center col-md-12 right-pasUp">
                            <div className="col-md-12">
                                <div>
                                    <h3>Parol o'zgartirish</h3>
                                </div>
                                <div>
                                    <FormControl fullWidth sx={{ my: 1 }}>
                                        <br />
                                        <label htmlFor="username">Eski parol</label>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="right-color"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                        />
                                        <br />
                                        <label htmlFor="username">Yangi parol</label>
                                        {/* <InputLabel htmlFor="outlined-adornment-password">Yangi parol</InputLabel> */}
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showNewPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowNewPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            value={newPassword}
                                            onChange={(event) => {
                                                setNewPassword(event.target.value);
                                            }}
                                        />
                                        <br />
                                        <label htmlFor="username">Yangi parol takrorlang</label>
                                        {/* <InputLabel htmlFor="outlined-adornment-password">Yangi parol tasdiqlash</InputLabel> */}
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={shownewPasswordConfirm ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowNewPasswordConfirm}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {shownewPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            value={newPasswordConfirm}
                                            onChange={(event) => {
                                                setNewPasswordConfirm(event.target.value);
                                            }}
                                            onBlur={handeNewPassword}
                                        />
                                        {confirmPassword ? <p>parol xato</p> : <p></p>}
                                    </FormControl>
                                    {/* <div
                                        className={`form-group first mb-10 ${password ? "field--not-empty" : ""
                                            }`}
                                    >

                                        <label htmlFor="username">Eski parol</label>
                                        <input
                                            type="password"
                                            key="input_singin"
                                            className="form-control"
                                            id="username"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`form-group last mb-3 ${newPassword ? "field--not-empty" : ""
                                            }`}
                                    >
                                        <label htmlFor="password">Yangi parol</label>
                                        <input
                                            // type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(event) => {
                                                setNewPassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`form-group last mb-3 ${newPassword ? "field--not-empty" : ""
                                            }`}
                                    >
                                        <label htmlFor="password">Yangi parol tasdiqlash</label>
                                        <input
                                            // type="password"
                                            className="form-control"
                                            id="newPasswordConfirm"
                                            value={newPasswordConfirm}
                                            onChange={(event) => {
                                                setNewPasswordConfirm(event.target.value);
                                            }}
                                            onBlur={handeNewPassword}
                                        />
                                        {confirmPassword ? <p>parol xato</p> : <p></p>}
                                    </div> */}
                                    <input
                                        type="submit"
                                        value="Saqlash"
                                        onClick={handeSubmit}
                                        className="btn btn-block btn-primary btn-pasUp"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster richColors position="bottom-right" />
        </>
    )
}