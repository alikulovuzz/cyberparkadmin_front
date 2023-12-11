import React, { useContext, useState } from "react";
import "./styles.css";
// import './custom.css'
import { company_signin, user_signin } from "../../utils/API_urls";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { postRequest } from "../../utils/resquests";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Axios } from "axios";

export default function SignInSideAdmin() {
  const [openLanguages, setOpenLanguages] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleOpenDropDown = (_) => {
    setOpenLanguages((prev) => !prev);
  };

  const closeOpenDropDown = (event) => {
    if (event.target.className != "dropbtn") {
      setOpenLanguages(false);
    }
  };

  const handleCloseBackdrop = () => {
    setLoading(false);
  };

  const handleOpenBackdrop = () => {
    setLoading(true);
  };

  const handleSubmit = () => {
    handleOpenBackdrop();
    const req_url =user_signin
    const req_body = {
      email: username,
      password: password,
    }
    postRequest(req_url, req_body)
      .then((response) => {
        // console.log(response)
        // console.log(response.data.token)
        if (response.data.token) {
          sessionStorage.setItem("x-access-token", response.data.token);
          // console.log(response.data.token)
          setUser(response.data.data);
          navigate("/user");
        }

        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log(error instanceof Axios)
        console.log(error.response.status)
        if (error.code == "ERR_NETWORK") {
          handleCloseBackdrop();
          toast.error("Serverda xatolik");
        }
        if (
          error.response.data.message == "user does not exist and not verified"
        ) {
          toast.error("Login in yooki parol xato");
          handleCloseBackdrop();
        }
        if (error.response.status == "500" || error.code == "ERR_NETWORK") {
          handleCloseBackdrop();
          toast.error("Serverda xatolik");
        }
        if (error.response.status == "400") {
          handleCloseBackdrop();
          toast.error("Xato so'rov");
        }else{
          handleCloseBackdrop();
          toast.error("Serverda xatolik");
        }
      });
  };

  const gotoAdmin = () => {
    navigate("/admin-login");
  };

  const gotoUser = () => {
    navigate("/login");
  };

  return (
    <div className="d-lg-flex half" onClick={closeOpenDropDown}>
      <div className="right-top col-md-12">
          <div className="dropdown">
            <button onClick={handleOpenDropDown} className="dropbtn">
              Uz
            </button>
            <div
              id="myDropdown"
              className={`dropdown-content ${openLanguages ? "show" : ""}`}
            >
              <a>Uz</a>
              <a>Ru</a>
              <a>En</a>
            </div>
          </div>
        </div>
      <div className="contents custom-res">
        
        <div className="container custom-res" style={{width:"600px !important"}}>
          <div className="right-block custom-res">
            <div className="align-items-center justify-content-center col-md-12 right-form">
              <div className="col-md-12">
                <div>
                  <h3>Kabinetga kirish</h3>
                </div>
                <div>
                  <div
                    className={`form-group first mb-10 ${
                      username ? "field--not-empty" : ""
                    }`}
                  >
                    <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`form-group last mb-3 ${
                      password ? "field--not-empty" : ""
                    }`}
                  >
                    <label htmlFor="password">Parol</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Kirish"
                    className="btn btn-block btn-primary"
                    onClick={handleSubmit}
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
