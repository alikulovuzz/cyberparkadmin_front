import React, { useContext, useState, useEffect } from "react";
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

export default function SignInSide({ admin }) {
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

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android.*mobile|windows.*phone/.test(userAgent);
    const handleResize = () => {
      if (window.innerWidth < 700) {
        navigate("/error"); // Redirect to index.html if width is less than 700px
      }
    };

    // Check on component mount
    handleResize();

    // Check on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleSubmit = () => {
    handleOpenBackdrop();
    const req_url = admin ? user_signin : company_signin;
    const req_body = admin
      ? {
        email: username,
        password: password,
      }
      : {
        pinfl: username,
        password: password,
      };
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
        console.log(error instanceof Axios);
        console.log(error.response.status);
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
        } else {
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
        <button onClick={gotoAdmin}>
          <i className="fas fa-user-circle"></i>
          <span>Adminlar uchun</span>
        </button>
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
      <div className="bg cl-md-12">
        <div className="left-side">
          <div className="image-container">
            <img src={require("./images/logo2.png")} alt="" />
          </div>
          <div className="left-title">
            <h3>CYBER PARK BILAN BIZNESINGIZNI RIVOJLANTIRING</h3>
          </div>
          <div className="info-left">
            <h5>
              CYBER PARK rezidenti maqomiga ega bo'ling va kompaniya rivojlanish
              uchun imtiyozlar va afzalliklardan foydalaning!
            </h5>
            <br />
            <h5>
              CYBER PARK rezidentligi maqomini olish bo'yicha talab qilinuvchi
              hujjatlar:
            </h5>
            <br />
            <img
              className="send-img"
              src={require("./images/smartparcel-mail.gif")}
              alt=""
            />
            <div className="left-span">
              <img src={require("./images/office-building.png")} alt="" />
              <p>O'zbekistonda kompaniya ochish</p>
            </div>
            <div className="left-span">
              <img src={require("./images/clipboard.png")} alt="" />
              <p>Shaxsiy kabinet orqali biznes-reja bilan ariza yuborish</p>
            </div>
          </div>
          <div
            className="phone-block pointer"
            onClick={() => (window.location.href = "tel:900288902")}
          >
            <img
              className="phone-img"
              src={require("./images/icon-call.png")}
              alt=""
            />
            <span>(90) 028-89-02</span>
          </div>
        </div>
      </div>
      <div className="contents custom-res">
        <div className="container custom-res">
          <div className="right-block custom-res">
            <div className="align-items-center justify-content-center col-md-12 right-form">
              <div className="col-md-12">
                <div>
                  <h3>Kabinetga kirish</h3>
                </div>
                <div>
                  <div
                    className={`form-group first mb-10 ${username ? "field--not-empty" : ""
                      }`}
                  >
                    <label htmlFor="username">INN</label>
                    <input
                      type="text"
                      key="input_singin"
                      className="form-control"
                      id="username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`form-group last mb-3 ${password ? "field--not-empty" : ""
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
                  <div className="submit-message">
                    <span>
                      Sizda shaxsiy kabinetingiz yo'qmi?{" "}
                      <a href="https://my.cyberpark.uz/apply_resident">Ro'yhatdan o'tish</a>
                    </span>
                  </div>
                  <div className="notification-msg">
                    <span>
                      Eslatma: Ushbu sahifadan Cyber Park joriy rezidentlari
                      foydalanishlari mumkin
                    </span>
                  </div>
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
