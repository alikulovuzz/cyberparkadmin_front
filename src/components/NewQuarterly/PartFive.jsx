import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import { postRequest } from "../../utils/resquests";
import { import_funds } from "../../utils/API_urls";

const oneRowDefaultValue = {
  g1: null,
  g2: null,
  g3: null,
  g4: null,
  g5: null,
  g6: null,
  f_id: uuidv4(),
};

export default function PartFive({ setImportFunds }) {
  const [listLength, setListLength] = useState([...[], oneRowDefaultValue]);
  const [saveButton, setSaveButton] = useState(true);
  const [disabled, setDisabled] = useState(false);

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
        const saved_one = await postRequest(import_funds, {
          name: one_row.g1,
          cost: one_row.g2,
          unit: one_row.g3,
          qty: one_row.g4,
          acc_description: one_row.g5,
          residual_value: one_row.g6,
        });
        console.log(one_row);
        if (saved_one?.data?.code == 200)
          savedId.push(saved_one.data.report._id);
      }
      setDisabled(true);
      setImportFunds(savedId);
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
          V. Информация по ввезенным для собственных нужд оборудованию,
          комплектующим частяь, деталям, узлам, технологической документации,
          программного обеспечения, не производимых в Республике Узбекистан, а
          также иных товаров, утверждённым по перечням в соответствии с УП-5099
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
            {listLength.map((elem, index) => {
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
            })}
          </tbody>
        </table>
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

export const PartFiveRow = ({
  row,
  ind,
  removeRowHandler,
  updateRowElem,
  disabled,
}) => {
  return (
    <tr>
      <td class="custom-td">{ind + 1}</td>
      <td>
        <input
          type="text"
          name="column1"
          id="column1"
          disabled={disabled}
          onChange={(event) => {
            updateRowElem(row.f_id, "g1", event.target.value);
          }}
        />
      </td>
      <td>
        <div className="select-position">
          <input
            type="text"
            name="column1"
            id="column1"
            disabled={disabled}
            onChange={(event) => {
              updateRowElem(row.f_id, "g2", event.target.value);
            }}
          />
        </div>
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
