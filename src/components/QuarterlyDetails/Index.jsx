import React, { useContext, useEffect, useMemo, useState } from "react";
import { deleteReports, getReports, getRequest } from "../../utils/resquests";
import { MuiFileInput } from "mui-file-input";
import { UserContext } from "../../context/UserContext";
import { useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import year from "./../../dictionary/year";
import './style.css'

export default function DetailidReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState(searchParams.get("id"));
  const [quarterly, setQuarterly] = React.useState("first");
  const [yearsd, setYears] = React.useState(2020);
  const { user } = useContext(UserContext);
  const handleChangeYear = (event) => {
    setYears(event.target.value);
  };
  const handleChange = (event) => {
    setQuarterly(event.target.value);
  };
  const formatQuarter = (event) => {
    if (event == "first") {
      return "1";
    } else if (event == "second") {
      return "2";
    } else if (event == "third") {
      return "3";
    } else {
      return "4";
    }
  };
  const formatQQS = (event) => {
    if (event == "yes") {
      return "Да";
    } else {
      return "Нет";
    }
  };
  const formatQQSLinks = (event) => {
    if (event == "aylanmaSoliq") {
      return "НДС";
    } else if (event == "jisDaromadSoliq"){
      return "Налог на доходы физических лиц";
    }else if (event == "kksSoliq"){
      return "НДС";
    }else{
      return "Налог на прибыль юридических лиц";
    }
  };
  const yearList = useMemo(() => {
    return year.map((year) => {
      return { value: year.value, year_name: year["uz"] };
    });
  });
  useEffect(() => {
    if (user) {
      getRequest(`audit/getById?id=${id}`)
        .then((response) => {
          setReports(response.data.reports[0]);
          // toast.error("Serverda xatolik");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Serverda xatolik");
        });
    }
  }, [searchParams]);
  return (
    <>
      <div className="main-panel report">
        <div className="content-wrapper">
          <div class="container-fluid">
            <div class="title-wrapper">
              <div class="row align-items-center">
                <div class="col-md-6">
                 
                </div>
              </div>
            </div>
            <div class="form-elements-wrapper">
              <div class="row">
                <div class="col-lg-12 custom-title">
                  <div class="card-style mb-30">
                    <h4 class="mb-25">Отчетный период</h4>
                    <div class="select-style-1">
                      <div class="select-div">
                        <label>Год</label>
                        <div class="select-position">
                          <select>
                            <option value={reports["year"]}>
                              {reports["year"]}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="select-div">
                        <label>Квартал</label>
                        <div class="select-position">
                          <select>
                            <option value="first">
                              {formatQuarter(reports["quarterly"])}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="select-div">
                        <label>Плательщик НДФЛ</label>
                        <div class="select-position">
                          <select>
                            <option value={reports["kks_payer"]}>
                              {formatQQS(reports["kks_payer"])}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-style mb-30">
                    <h4 className="mb-25">
                      I. Оборот от реализации продукции (товаров, работ и услуг)
                    </h4>
                    <table border="1">
                      <thead>
                        <tr className="custom-td">
                          <td rowSpan="2" width="5%">
                            П/н
                          </td>
                          <td rowSpan="2" width="20%">
                            Вид деятельности
                          </td>
                          <td rowSpan="2" width="15%">
                            Код ОКЭД
                          </td>
                          <td colSpan="3">
                            Оборот от реализации работ и услуг
                          </td>
                          <td></td>
                        </tr>
                        <tr className="custom-td">
                          <td>С начала года</td>
                          <td>За квартал</td>
                          <td rowspan="3">
                            <table>
                              <thead>
                                <tr>
                                  <td colSpan="3">За квартал</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1 мес.</td>
                                  <td>2 мес.</td>
                                  <td>3 мес.</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {listLength.map((elem, index) => {
      return (
        <PartOneRow
          key={index}
          row={elem}
          ind={index}
          removeRowHandler={removeRowHandler}
          updateRowElem={updateRowElem}
          disabled={disabled}
        />
      );
    })} */}
                        {reports["release_product"]?.map((elem, index) => {
                          return (
                            <>
                              {/* <p>{JSON.stringify(elem)}</p> */}
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <div class="select-position">
                                    <input
                                      type="string"
                                      name="column1"
                                      id="column1"
                                      disabled={disabled}
                                      value={elem.kind_of_activity}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.OKED}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.year}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.quarter}
                                  />
                                </td>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr className="custom-td">
                                        <td>
                                          <input
                                            type="text"
                                            name="column1"
                                            id="column1"
                                            disabled={disabled}
                                            value={elem.month_1}
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            name="column1"
                                            id="column1"
                                            disabled={disabled}
                                            value={elem.month_2}
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            name="column1"
                                            id="column1"
                                            disabled={disabled}
                                            value={elem.month_3}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <button
                                    className="custom-button"
                                    onClick={(_) => {
                                      if (disabled == false) {
                                        console.log("cannot delete");
                                      }
                                    }}
                                  >
                                    <i className="lni lni-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* <PartTwo
      setReleaseRepublic={(val) => {
        // console.log(val);
        setReleaseRepublic(val);
      }}
    /> */}
                  <div className="card-style mb-30">
                    <h4 className="mb-25">
                      II. Информация о выполненных работах и оказанных услугах
                      за пределами Республики Узбекистан резидентов
                    </h4>
                    <table border="1">
                      <thead>
                        <tr className="custom-td">
                          <td rowSpan="2" width="5%">
                            П/н
                          </td>
                          <td rowSpan="2" width="20%">
                            Вид деятельности
                          </td>
                          <td rowSpan="2" width="10%">
                            Код ОКЭД
                          </td>
                          <td rowSpan="2" width="10%">
                            Наименнование страны
                          </td>
                          <td rowSpan="2" width="10%">
                            Днежная единица
                          </td>
                          <td colSpan="3">
                            Чистая выручка от реализации работ и услуг
                          </td>
                          <td></td>
                        </tr>
                        <tr className="custom-td">
                          <td>С начала года</td>
                          <td>За квартал</td>
                          <td rowSpan="3">
                            <table>
                              <thead>
                                <tr>
                                  <td colSpan="3">За квартал</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1 мес.</td>
                                  <td>2 мес.</td>
                                  <td>3 мес.</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {listLength.map((elem, index) => {
      return (
        <TwoOneRow
          key={index}
          row={elem}
          ind={index}
          removeRowHandler={removeRowHandler}
          updateRowElem={updateRowElem}
          disabled={disabled}
        />
      );
    })} */}
                        {reports["release_republic"]?.map((elem, index) => {
                          return (
                            <>
                              {/* <p>{JSON.stringify(elem)}</p> */}
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <div class="select-position">
                                    <input
                                      type="string"
                                      name="column1"
                                      id="column1"
                                      disabled={disabled}
                                      value={elem.kind_of_activity}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="column1"
                                    id="column1"
                                    value={elem.OKED}
                                    disabled={disabled}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    value={elem.country}
                                    disabled={disabled}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    value={elem.currency}
                                    disabled={disabled}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    value={elem.year}
                                    disabled={disabled}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    value={elem.quarter}
                                    disabled={disabled}
                                  />
                                </td>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr className="custom-td">
                                        <td>
                                          <input
                                            type="text"
                                            name="column1"
                                            id="column1"
                                            value={elem.month_1}
                                            disabled={disabled}
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            name="column1"
                                            id="column1"
                                            value={elem.month_2}
                                            disabled={disabled}
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            name="column1"
                                            id="column1"
                                            value={elem.month_3}
                                            disabled={disabled}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <button
                                    className="custom-button"
                                    onClick={(_) => {
                                      if (disabled == false) {
                                        console.log("cannot delete");
                                      }
                                    }}
                                  >
                                    <i className="lni lni-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* <PartThree
      setInvesment={(val) => {
        // console.log(val);
        setInvesment(val);
      }}
    /> */}
                  <div className="card-style mb-30">
                    <h4 className="mb-25">
                      III. Информация об инвестиционной деятельности резидента
                    </h4>
                    <table border="1">
                      <thead>
                        <tr className="custom-td">
                          <td rowSpan="2" width="2%">
                            П/н
                          </td>
                          <td rowSpan="2" width="20%">
                            Наименнование показателей
                          </td>
                          <td rowSpan="2" width="20%">
                            За отчетыний период
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="custom-td">1</td>
                          <td className="custom-tr custom-td">
                            Обьем инвестиций, всего
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>1.1</td>
                          <td className="custom-tr">
                            В том числе основные средства
                          </td>
                          <td>
                            <input
                              className="custom-input"
                              type="text"
                              name="column1"
                              id="column1"
                              value={reports["invesment"]?.volume_of_invest}
                              disabled={disabled}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="custom-td">2</td>
                          <td className="custom-tr custom-td">
                            Источники инвестиций
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2.1</td>
                          <td className="custom-tr">
                            Собставенные средства организации(включая
                            учредителей)
                          </td>
                          <td>
                            <input
                              className="custom-input"
                              type="text"
                              name="column1"
                              id="column1"
                              disabled={disabled}
                              value={reports["invesment"]?.org_funds}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>2.2</td>
                          <td className="custom-tr">Заемные средства</td>
                          <td>
                            <input
                              className="custom-input"
                              type="text"
                              name="column1"
                              id="column1"
                              disabled={disabled}
                              value={reports["invesment"]?.borrowed_funds}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>2.3</td>
                          <td className="custom-tr">
                            Гранты и другие безвозмездно представленные средства
                          </td>
                          <td>
                            <input
                              className="custom-input"
                              type="text"
                              name="column1"
                              id="column1"
                              disabled={disabled}
                              value={reports["invesment"]?.grants}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>2.4</td>
                          <td className="custom-tr">Прочие (указать какие)</td>
                          <td>
                            <input
                              className="custom-input"
                              type="text"
                              name="column1"
                              id="column1"
                              disabled={disabled}
                              value={reports["invesment"]?.other}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <PartFour
      setResidentalPayroll={(val) => {
        // console.log(val);
        setResidentalPayroll(val);
      }}
    /> */}
                  {reports["residental_payroll"] ? (
                    <div className="card-style mb-30">
                      <h4 className="mb-25">
                        IV. Информация о численности работников, а также ФОТ
                        резидента
                      </h4>
                      <table border="1">
                        <thead>
                          <tr className="custom-td">
                            <td rowSpan="2" width="2%">
                              П/н
                            </td>
                            <td rowSpan="2" width="20%">
                              Наименнование показателей
                            </td>
                            <td rowSpan="2" width="10%">
                              Единица измерения
                            </td>
                            <td rowSpan="2" width="10%">
                              За отчетыний период
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="custom-td">1</td>
                            <td className="custom-tr">
                              Количество работников на конец отчетногопериода
                            </td>
                            <td>
                              <input
                                type="text"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["employees"]
                                    ?.Unit
                                }
                                disabled={disabled}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["employees"]
                                    ?.period
                                }
                                disabled={disabled}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="custom-td">2</td>
                            <td className="custom-tr">
                              Количество внешних совместителей на конец
                              отчетного периода
                            </td>
                            <td>
                              <input
                                type="text"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["part_time"]
                                    ?.Unit
                                }
                                disabled={disabled}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["part_time"]
                                    ?.period
                                }
                                disabled={disabled}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="custom-td">3</td>
                            <td className="custom-tr">
                              Количество работающих иностранных граждан на конец
                              отчетного периода
                            </td>
                            <td>
                              <input
                                type="text"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["countforeign"]
                                    ?.Unit
                                }
                                disabled={disabled}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["countforeign"]
                                    ?.period
                                }
                                disabled={disabled}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="custom-td">4</td>
                            <td className="custom-tr">
                              Количество работников, выполнявших работы по
                              договорам гражданско-правового характера, на конец
                              отчетного периода
                            </td>
                            <td>
                              <input
                                type="text"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["performing"]
                                    ?.Unit
                                }
                                disabled={disabled}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["performing"]
                                    ?.period
                                }
                                disabled={disabled}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="custom-td">5</td>
                            <td className="custom-tr">
                              Фонд оплаты труда за отчетыний период
                            </td>
                            <td>
                              <input
                                type="text"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["fund"]?.Unit
                                }
                                disabled={disabled}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="column1"
                                id="column1"
                                value={
                                  reports["residental_payroll"]["fund"]?.period
                                }
                                disabled={disabled}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <>Loading</>
                  )}
                  {/* <PartFive
      setImportFunds={(val) => {
        // console.log(val);
        setImportFunds(val);
      }}
    /> */}
                  <div className="card-style mb-30">
                    <h4 className="mb-25">
                      V. Информация по ввезенным для собственных нужд
                      оборудованию, комплектующим частяь, деталям, узлам,
                      технологической документации, программного обеспечения, не
                      производимых в Республике Узбекистан, а также иных
                      товаров, утверждённым по перечням в соответствии с УП-5099
                      и ПП-4751
                    </h4>
                    <table border="1">
                      <thead>
                        <tr className="custom-td">
                          <td rowSpan="2" width="4%">
                            П/н
                          </td>
                          <td rowSpan="2" width="15%">
                            Наименнование
                          </td>
                          <td rowSpan="2" width="10%">
                            Единица измерения
                          </td>
                          <td rowSpan="2" width="15%">
                            Кол-во
                          </td>
                          <td rowSpan="2" width="15%">
                            Первоначальная стоимость
                          </td>
                          <td rowSpan="2" width="15%">
                            Накопленная амортизация
                          </td>
                          <td rowSpan="2" width="15%">
                            Остаточная стоимость
                          </td>
                          <td width="2%"></td>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
<td className="custom-td">1</td>
<td><input type="text" name="column1" id="column1" value="" /></td>
<td>
<div className="select-position">
<select>
<option value="">Шт</option>
<option value="">Комплект</option>
</select>
</div>
</td>
<td><input type="text" name="column1" id="column1" value="" /></td>
<td><input type="text" name="column1" id="column1" value="" /></td>
<td><input type="text" name="column1" id="column1" value="" /></td>
<td><input type="text" name="column1" id="column1" value="" /></td>
<td><button className="custom-button"><i className="lni lni-trash-can"></i></button></td>
</tr> */}
                        {/* {listLength.map((elem, index) => {
      return (
        <PartFiveRow
          key={index}
          row={elem}
          ind={index}
          removeRowHandler={removeRowHandler}
          updateRowElem={updateRowElem}
          disabled={disabled}
        />
      );
    })} */}
                        {reports["import_funds"]?.map((elem, index) => {
                          return (
                            <>
                              {/* <p>{JSON.stringify(elem)}</p> */}
                              <tr>
                                <td class="custom-td">{index + 1}</td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.name}
                                  />
                                </td>
                                <td>
                                  <div className="select-position">
                                    <input
                                      type="text"
                                      name="column1"
                                      id="column1"
                                      disabled={disabled}
                                      value={elem.cost}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.unit}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.qty}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.acc_description}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="column1"
                                    id="column1"
                                    disabled={disabled}
                                    value={elem.residual_value}
                                  />
                                </td>
                                <td>
                                  <button
                                    className="custom-button"
                                    onClick={(_) => {
                                      if (disabled == false) {
                                        console.log("delete false");
                                      }
                                    }}
                                  >
                                    <i className="lni lni-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div class="card-style mb-30">
                    <h4 class="mb-25">Сохранить отчет: </h4>
                    {reports["additional_refs"]?.map((elem, index) => {
                      return (
                        <div className="download-block" key={index}>
                          <p>{formatQQSLinks(elem['name'])}: </p>
                          <a href={elem['link']} key={index} onClick={()=>{}} download>Скачать</a>
                        </div>
                      );
                    })}
                  </div>
                  <Toaster richColors position="bottom-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
