import React from 'react'

export default function MyCompany() {
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <h4>Ishlab chiqish jarayyonida</h4>
                    {/* <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <section className="content-header">
                                <h3>
                                    "KIBERNITIKADA INNOVATSIYALART IT-PARKI" MA'SULIYATI CHEKLANGAN JAMIYAT
                                </h3>
                                <ol className="breadcrumb">
                                    <button className="btn btn-block"><i className="ti-pencil-alt"></i> Tahrirlash</button>
                                </ol>
                            </section>
                            <div className="col-lg-12 grid-margin">
                                <section className="content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box box-info">
                                                <div className="box-body">
                                                    <form action="#">
                                                        <div className="form-group">
                                                            <div className="info-company">
                                                                <p>Rezidentlik maqomi:</p>
                                                                <label>Rezident emas</label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>Rezidentlik maqomi olgan sana:</p>
                                                                <label></label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>STIR:</p>
                                                                <label>308121587</label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>Ro'yxatdan o'tgan sana / Ro'yhatdan o'tgan raqami:</p>
                                                                <label>26.01.2021 / 946686</label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>IFUT:</p>
                                                                <label>62090</label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>Direktorning F.I.SH</p>
                                                                <label>XAMZIN ALBERT ALMAZOVICH</label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>Ta'sischilarning F.I.SH</p>
                                                                <label></label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>Ustav fondi:</p>
                                                                <label>2 428 113 163</label>
                                                            </div>
                                                            <div className="info-company">
                                                                <p>Faoliyat holati</p>
                                                                <label>Faoliyat ko'rsatayotgan hamda soliq majburiyatlariga ega</label>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label>Bank rekvizitlari</label>
                                                                <div className="row">
                                                                    <div className="col-xs-12 table-responsive">
                                                                        <table className="table table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>№</th>
                                                                                    <th>Bank nomi / filial</th>
                                                                                    <th>Bank kodi</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>1</td>
                                                                                    <td>Aloqa bank bosh ofis</td>
                                                                                    <td>4557</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>2</td>
                                                                                    <td>Aloqa bank bosh ofis</td>
                                                                                    <td>4557</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label>Kompaniyaning ta'sischisi kim (davlatni ko'rsating)?</label>
                                                                <p>Chet el ta'sischisi yo'q</p>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label>Bog'lanish uchun telefon raqam</label>
                                                                <p>Murojaat uchun telefon raqam: </p>
                                                                <p>Buxgalter telefon raqam: </p>
                                                                <p>Xabar yuborish uchun elektron imzo: </p>
                                                                <p>Veb-sayt: </p>
                                                                <p>Tashkilotning yuridik manzili: </p>
                                                                <label>Do'rmon yo'li ko'chasi, 31-uy</label>
                                                                <p>Tashkilotning haqiqiy joylashgan manzili: </p>
                                                                <label></label>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label>Korxonangiz brendi bormi:</label>
                                                                <div className="custom-button-div">
                                                                    <button className="custom-button" id="yesButton">Ha</button>
                                                                    <button className="custom-button" id="noButton">Yo'q</button>
                                                                </div>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label>Xalqaro bozorga chiqishni rejalashtiryapsizmi?</label>
                                                                <div className="custom-button-div">
                                                                    <button className="custom-button" id="yesButton">Ha</button>
                                                                    <button className="custom-button" id="noButton">Yo'q</button>
                                                                </div>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label>IT sohasida xalqaro ko'rgazma va forumlarda ishtirok etish
                                                                    niyatingiz
                                                                    bormi? </label>
                                                                <div className="custom-button-div">
                                                                    <button className="custom-button" id="yesButton">Ha</button>
                                                                    <button className="custom-button" id="noButton">Yo'q</button>
                                                                </div>
                                                            </div>
                                                            <div className="line-div"></div>
                                                            <div className="info-company">
                                                                <label> Korxona turi </label>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>Minimal skin checkbox</span>
                                                                </div>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>O'z mahsulotlariga ega korxona</span>
                                                                </div>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>BPO(Business Process Outsourcing)</span>
                                                                </div>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>Ta'lim muassasi</span>
                                                                </div>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>Konsalting xizmatlari</span>
                                                                </div>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>Xosting va domen registartorlari</span>
                                                                </div>
                                                                <div className="info-checkbox">
                                                                    <input type="checkbox" className="minimal" />
                                                                    <span>Kiberxavfsizlik xizmatlari</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="box custom-box">
                                                <div className="box-body">
                                                    <form action="#">
                                                        <div className="info-company">
                                                            <h3>Taqdim etilgan so'ngi hisobotlarga ko'ra kompaniya ko'rsatkichlari</h3>
                                                            <h3>Xodimlar</h3>
                                                            <div className="row">
                                                                <div className="col-xs-12 table-responsive">
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>№</th>
                                                                                <th>Ko'rsatkich nomi</th>
                                                                                <th>Hisobot yil bo'yicha o'rtacha (kishi)</th>
                                                                                <th>Soliq kodeksining 371-moddasi bo'yicha mehnatga haq
                                                                                    to'lash daromadi, jami (ming so'm)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Aloqa bank bosh ofis</td>
                                                                                <td>0</td>
                                                                                <td>0</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Aloqa bank bosh ofis</td>
                                                                                <td>0</td>
                                                                                <td>0</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><label className="custom-label">Xodimlarning umumiy soni, jami</label></td>
                                                                                <td>0</td>
                                                                                <td>0</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
