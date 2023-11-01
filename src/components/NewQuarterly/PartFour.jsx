import React from "react";
import { postRequest } from "../../utils/resquests";
import { residental_payroll } from "../../utils/API_urls";
import { Toaster, toast } from "sonner";
import { useState } from "react";

export default function PartFour({ setResidentalPayroll }) {
  const [employees, setEmployees] = useState({ Unit: "", period: "" });
  const [part_time, setPartTime] = useState({ Unit: "", period: "" });
  const [countforeign, setCountforeign] = useState({ Unit: "", period: "" });
  const [performing, setPerforming] = useState({ Unit: "", period: "" });
  const [fund, setFund] = useState({ Unit: "", period: "" });
  const [saveButton, setSaveButton] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // Unit period

  const savePartTree = () => {
    postRequest(residental_payroll, {
      employees,
      part_time,
      countforeign,
      performing,
      fund,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setResidentalPayroll(response.data.report._id);
          setDisabled(true);
          setSaveButton(false);
          toast.success("Muvaffaqiyatli saqlandi!");
        }
      })
      .catch((error) => {
        toast.error("Serverda xatolik!");
      });
  };

  return (
    <>
      <div className="card-style mb-30">
        <h4 className="mb-25">
          IV. Информация о численности работников, а также ФОТ резидента
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
                  disabled={disabled}
                  onChange={(event) => {
                    setEmployees((prev) => {
                      prev.Unit = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setEmployees((prev) => {
                      prev.period = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="custom-td">2</td>
              <td className="custom-tr">
                Количество внешних совместителей на конец отчетного периода
              </td>
              <td>
                <input
                  type="text"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setPartTime((prev) => {
                      prev.Unit = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setPartTime((prev) => {
                      prev.period = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="custom-td">3</td>
              <td className="custom-tr">
                Количество работающих иностранных граждан на конец отчетного
                периода
              </td>
              <td>
                <input
                  type="text"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setCountforeign((prev) => {
                      prev.Unit = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setCountforeign((prev) => {
                      prev.period = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="custom-td">4</td>
              <td className="custom-tr">
                Количество работников, выполнявших работы по договорам
                гражданско-правового характера, на конец отчетного периода
              </td>
              <td>
                <input
                  type="text"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setPerforming((prev) => {
                      prev.Unit = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setPerforming((prev) => {
                      prev.period = event.target.value;
                      return prev;
                    });
                  }}
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
                  disabled={disabled}
                  onChange={(event) => {
                    setFund((prev) => {
                      prev.Unit = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    setFund((prev) => {
                      prev.period = event.target.value;
                      return prev;
                    });
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {saveButton ? (
          <div className="button-save">
            <button className="save-btn" onClick={savePartTree}>
              <i className="lni lni-save"></i> Сохранять
            </button>
          </div>
        ) : (
          <div className="button-add">
            <button className="add-btn">Сохранено</button>
          </div>
        )}
      </div>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
