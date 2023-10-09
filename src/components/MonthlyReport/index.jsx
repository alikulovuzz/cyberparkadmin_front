import React from 'react'

export default function MonthlyReport() {
  return (
    <>
        <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <section className="content-header custom-header">
                                <h3>
                                    Oylik daromad
                                </h3>
                                <ol className="breadcrumb">
                                    <button className="btn btn-block btn-success"><i className="ti-plus"></i>
                                        Qo'shish</button>
                                </ol>
                            </section>
                            <form action="#" className="mt-30">
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover custom-table-report">
                                        <tr>
                                            <th>№</th>
                                            <th>Hisobot davri</th>
                                            <th>Daromad miqdori</th>
                                            <th>Berilgan sana</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe</td>
                                            <td>1000000</td>
                                            <td><button className="custom-btn-error">Approved</button></td>
                                            <td><a href="test_file.zip" download>Yuklab olish</a></td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe</td>
                                            <td>1000000</td>
                                            <td><button className="custom-btn-accept">Approved</button></td>
                                            <td><a href="test_file.zip" download>Yuklab olish</a></td>
                                        </tr>
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
