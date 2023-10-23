import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { postRequest } from '../../utils/resquests';
import { release_product } from '../../utils/API_urls';

const oneRowDefaultValue = {
  g1: null,
  g2: null,
  g3: null,
  g4: null,
  g5: null,
  g6: null,
  g7: null,
  g8: null,
  g9: null,
  f_id: uuidv4()
}

export default function PartTwo({setReleaseRepublic}) {
  const [listLength, setListLength] = useState([...[], oneRowDefaultValue])
  const [disabled, setDisabled] = useState(false)

  const addRowHandler = (_) => {
    if(!disabled){
      setListLength(prev => {
        return [...prev, {
          g1: null,
          g2: null,
          g3: null,
          g4: null,
          g5: null,
          g6: null,
          g7: null,
          g8: null,
          g9: null,
          f_id: uuidv4()
        }]
      })
    }
  }

  const removeRowHandler = (f_id) => {
    setListLength(prev => {
      return prev.filter(elem => elem.f_id !== f_id)
    })
  }

  const updateRowElem = (f_id, key, value) => {
    setListLength(prev => {
      let row = prev.find(elem => elem.f_id == f_id)
      row[key] = value;
      return prev
    })
  }

  const saveRowHandler = async () => {
    let savedId = [];
    for (let index = 0; index < listLength.length; index++) {
      const one_row = listLength[index]
      const saved_one = await postRequest(release_product, {
        kind_of_activity: one_row.g1,
        OKED: one_row.g2,
        year: one_row.g3,
        quarter: one_row.g4,
        month_1: one_row.g5,
        month_2: one_row.g6,
        month_3: one_row.g7
      })
      if(saved_one?.data?.code == 200)
        savedId.push(saved_one.data.report._id)
    }
    setDisabled(true)
    setReleaseRepublic(savedId)
  }
  return (
    <div class="card-style mb-30">
                <h4 class="mb-25">II. Информация о выполненных работах и оказанных услугах за пределами Республики
                  Узбекистан резидентов</h4>
                <table border="1">
                  <thead>
                    <tr class="custom-td">
                      <td rowspan="2" width="5%">П/н</td>
                      <td rowspan="2" width="20%">Вид деятельности</td>
                      <td rowspan="2" width="10%">Код ОКЭД</td>
                      <td rowspan="2" width="10%">Наименнование страны</td>
                      <td rowspan="2" width="10%">Днежная единица</td>
                      <td colspan="3">Чистая выручка от реализации работ и услуг</td>
                      <td></td>
                    </tr>
                    <tr class="custom-td">
                      <td>С начала года</td>
                      <td>За квартал</td>
                      <td rowspan="3">
                        <table>
                          <thead>
                            <tr>
                              <td colspan="3">За квартал</td>
                            </tr>
                          </thead>
                          <tbody><tr>
                            <td>1 мес.</td>
                            <td>2 мес.</td>
                            <td>3 мес.</td>
                          </tr>
                        </tbody></table>
                      </td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div class="select-position">
                          <select>
                            <option value="">Select category</option>
                            <option value="">Category one</option>
                            <option value="">Category two</option>
                            <option value="">Category three</option>
                          </select>
                        </div>
                      </td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td>
                        <table>
                          <tbody><tr class="custom-td">
                            <td><input type="text" name="column1" id="column1" value=""/></td>
                            <td><input type="text" name="column1" id="column1" value=""/></td>
                            <td><input type="text" name="column1" id="column1" value=""/></td>
                          </tr>
                        </tbody></table>
                      </td>
                      <td><button class="custom-button"><i class="lni lni-trash-can"></i></button></td>
                    </tr>
                      {
                        listLength.map((elem,index) => {
                          return <TwoOneRow key={index} row={elem} ind={index} removeRowHandler={removeRowHandler} updateRowElem={updateRowElem} disabled={disabled}/>
                        })
                      }
                  </tbody>
                </table>
                <div class="button-add">
                  <button class="add-btn"><i class="lni lni-plus"></i>Qo'shish</button>
                  <button class="save-btn"><i class="lni lni-save"></i>Saqlash</button>
                </div>
              </div>
  )
}


const TwoOneRow = ({row, ind, removeRowHandler, updateRowElem, disabled}) => {
  return (
    <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div class="select-position">
                          <select>
                            <option value="">Select category</option>
                            <option value="">Category one</option>
                            <option value="">Category two</option>
                            <option value="">Category three</option>
                          </select>
                        </div>
                      </td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td>
                        <table>
                          <tbody><tr class="custom-td">
                            <td><input type="text" name="column1" id="column1" value=""/></td>
                            <td><input type="text" name="column1" id="column1" value=""/></td>
                            <td><input type="text" name="column1" id="column1" value=""/></td>
                          </tr>
                        </tbody></table>
                      </td>
                      <td><button class="custom-button"><i class="lni lni-trash-can"></i></button></td>
                    </tr>
                      {/* {
                        listLength.map((elem,index) => {
                          return <TwoOneRow key={index} row={elem} ind={index} removeRowHandler={removeRowHandler} updateRowElem={updateRowElem} disabled={disabled}/>
                        })
                      } */}
                  </tbody>
  )
}