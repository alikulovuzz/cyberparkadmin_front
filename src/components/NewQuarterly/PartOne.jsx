import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postRequest } from "../../utils/resquests";
import { release_product } from "../../utils/API_urls";
import { Toaster, toast } from "sonner";

const oneRowDefaultValue = {
  g1: null,
  g2: null,
  g3: null,
  g4: null,
  g5: null,
  g6: null,
  g7: null,
  f_id: uuidv4(),
};

export default function PartOne({ setReleaseProduct,validateProduct }) {
  console.log("rendered")
  const [listLength, setListLength] = useState([...[], oneRowDefaultValue]);
  const [disabled, setDisabled] = useState(false);
  const [error, setState] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  
  useEffect(()=>{
    setState(validateProduct)
  },[validateProduct])
  const addRowHandler = (_) => {
    if (!disabled) {
      setListLength((prev) => {
        return [
          ...prev,
          {
            g1: null,
            g2: null,
            g3: null,
            g4: null,
            g5: null,
            g6: null,
            g7: null,
            f_id: uuidv4(),
          },
        ];
      });
    }
  };

  const removeRowHandler = (f_id) => {
    setListLength((prev) => {
      return prev.filter((elem) => elem.f_id !== f_id);
    });
  };

  const updateRowElem = (f_id, key, value) => {
    setListLength((prev) => {
      let row = prev.find((elem) => elem.f_id == f_id);
      row[key] = value;
      return prev;
    });
  };
  const saveRowHandler = async () => {
    let savedId = [];
    
    try {
      for (let index = 0; index < listLength.length; index++) {
        const one_row = listLength[index];
        if(!one_row.g1||!one_row.g2){
          toast.error("Serverda xatolik!");
          setState(true)
          return
        }else{
          setState(false)
        }
        const saved_one = await postRequest(release_product, {
          kind_of_activity: one_row.g1,
          OKED: one_row.g2,
          year: one_row.g3,
          quarter: one_row.g4,
          month_1: one_row.g5,
          month_2: one_row.g6,
          month_3: one_row.g7,
        });
        if (saved_one?.data?.code == 200)
          savedId.push(saved_one.data.report._id);
      }
      setDisabled(true);
      setReleaseProduct(savedId);
      toast.success("Muvaffaqiyatli saqlandi!");
      setSaveButton(false);
    } catch (error) {
      toast.error("Serverda xatolik!");
    }
  };

  return (
    <>
      <div className="card-style mb-30">
        <h4 className="mb-25">
          I. Оборот от реализации продукции (товаров, работ и услуг)*
        </h4>
        <table border="1">
          <thead>
            <tr className="custom-td">
              <td rowSpan="2" width="5%">
                П/н
              </td>
              <td rowSpan="2" width="20%">
                Вид деятельности *
              </td>
              <td rowSpan="2" width="15%">
                Код ОКЭД *
              </td>
              <td colSpan="3">Оборот от реализации работ и услуг</td>
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
            {listLength.map((elem, index) => {
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
            })}
          </tbody>
        </table>
        {!error?(<></>):(<div class="warn-file-second">Пожалуйста, заполните вышеуказанные файлы...</div>)}
        {saveButton ? (
          <div className="button-add">
            <button className="add-btn" onClick={addRowHandler}>
              <i className="lni lni-plus"></i>Добавлять
            </button>
            <button className="save-btn" onClick={saveRowHandler}>
              <i className="lni lni-save"></i>Сохранять
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

const PartOneRow = ({
  row,
  ind,
  removeRowHandler,
  updateRowElem,
  disabled,
}) => {
  return (
    <tr>
      <td>{ind + 1}</td>
      <td>
        <div class="select-position">
          <input
            type="string"
            name="column1"
            id="column1"
            disabled={disabled}
            onChange={(event) => {
              updateRowElem(row.f_id, "g1", event.target.value);
            }}
          />
        </div>
      </td>
      <td>
        <input
          type="number"
          name="column1"
          id="column1"
          disabled={disabled}
          onChange={(event) => {
            updateRowElem(row.f_id, "g2", event.target.value);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          name="column1"
          id="column1"
          disabled={disabled}
          onChange={(event) => {
            updateRowElem(row.f_id, "g3", event.target.value);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          name="column1"
          id="column1"
          disabled={disabled}
          onChange={(event) => {
            updateRowElem(row.f_id, "g4", event.target.value);
          }}
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
                  onChange={(event) => {
                    updateRowElem(row.f_id, "g5", event.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    updateRowElem(row.f_id, "g6", event.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="column1"
                  id="column1"
                  disabled={disabled}
                  onChange={(event) => {
                    updateRowElem(row.f_id, "g7", event.target.value);
                  }}
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
              removeRowHandler(row.f_id);
            }
          }}
        >
          <i className="lni lni-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};
