import React from 'react'

export default function Auditing() {
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <section className="content-header custom-header">
                                <h3>
                                    Auditorlik xulosasi
                                </h3>
                                <ol className="breadcrumb">
                                    <button className="btn btn-block"><i className="ti-plus"></i>
                                        Qo'shish</button>
                                </ol>
                            </section>
                            <form action="#" className="mt-30">
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover custom-table-report">
                                       <tbody>
                                       <tr>
                                            <th>№</th>
                                            <th>Hisobot davri</th>
                                            <th>Berilgan sana</th>
                                            <th>Status</th>
                                            <th>Fayl</th>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe</td>
                                            <td>11-7-2014</td>
                                            <td><button className="custom-btn-error">Approved</button></td>
                                            <td><a href="test_file.zip" download>Yuklab olish</a></td>
                                        </tr>
                                       </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-12 grid-margin">
                            <div className="example-modal">
                                <div className="msodal">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">

                                                <h4 className="modal-title">Iltimos, kompaniyangiz haqida qisqacha
                                                    ma'lumotni to'ldiring <br />Quyidagi bo'limlarni tekshirib chiqing!
                                                </h4>
                                            </div>
                                            <div className="modal-body">
                                                <div className="custom-modal">
                                                    <p>Bog'lanish uchun ma'lumot</p>
                                                </div>
                                                <div className="custom-modal">
                                                    <p>Kompaniyaning ta'sischisi kim?</p>
                                                </div>
                                                <div className="custom-modal">
                                                    <p>IT sohasida xalqaro ko'rgazma va forumlarda ishtirok etish
                                                        niyatingiz bormi?</p>
                                                </div>
                                                <div className="custom-modal">
                                                    <p>Korxona turi</p>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary">O'tish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
