import React from 'react'
import './custom.css'
import { Link } from 'react-router-dom'


export default function QuarterlyReport() {
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <section className="content-header custom-header">
                                <h3>
                                    Choraklik hisobot
                                </h3>
                                <ol className="breadcrumb">
                                    <Link to="new-quarterly">
                                        <button className="btn btn-block"><i className="ti-plus"></i>
                                            Qo'shish
                                        </button>
                                    </Link>
                                    
                                </ol>
                            </section>
                            <form action="#" className="mt-30">
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover custom-table-report">
                                        <tbody>
                                        <tr>
                                            <th>№</th>
                                            <th>Hisobot davri</th>
                                            <th>Chorak</th>
                                            <th>Berilgan sana</th>
                                            <th>Status</th>
                                            <th>Harakat</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe1</td>
                                            <td>Bacon ipsum
                                                doner.</td>
                                            <td>11-7-2014</td>
                                            <td><button className="custom-btn-success">Approved</button></td>
                                            <td>Harakat</td>
                                            <td><a href="test_file.zip" download>Yuklab olish</a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
