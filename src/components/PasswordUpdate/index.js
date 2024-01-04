import React, { useContext, useState } from "react";
import "./style.css";
export default function PasswordUpdate() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                                    <div
                                        className={`form-group first mb-10 ${username ? "field--not-empty" : ""
                                            }`}
                                    >
                                        <label htmlFor="username">Eski parol</label>
                                        <input
                                            type="password"
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
                                        <label htmlFor="password">Yangi parol</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`form-group last mb-3 ${password ? "field--not-empty" : ""
                                            }`}
                                    >
                                        <label htmlFor="password">Yangi parol tasdiqlash</label>
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
                                        value="Saqlash"
                                        className="btn btn-block btn-primary btn-pasUp"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}