import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const oneRowDefaultValue = {
  g1: null,
  g2: null,
  g3: null,
  g4: null,
  g5: null,
  g6: null,
  g7: null,
  f_id: uuidv4()
}

export default function PartOne() {

  const [listLength, setListLength] = useState([...[], oneRowDefaultValue])

  const addRowHandler = (_) => {
    setListLength(prev => {
      return [...prev, {
        g1: null,
        g2: null,
        g3: null,
        g4: null,
        g5: null,
        g6: null,
        g7: null,
        f_id: uuidv4()
      }]
    })
  }

  const removeRowHandler = (f_id) => {

  }

  return (
    <div class="card-style mb-30">
      <h4 class="mb-25">I. Оборот от реализации продукции (товаров, работ и услуг)</h4>
      <table border="1">
        <thead>
          <tr class="custom-td">
            <td rowspan="2" width="5%">П/н</td>
            <td rowspan="2" width="20%">Вид деятельности</td>
            <td rowspan="2" width="15%">Код ОКЭД</td>
            <td colspan="3">Оборот от реализации работ и услуг</td>
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
          {
            listLength.map((elem,index) => {
              return <PartOneRow key={index} row={elem} ind={index} removeRowHandler={removeRowHandler}/>
            })
          }
        </tbody>
      </table>
      <div class="button-add">
        <button class="add-btn" onClick={addRowHandler}><i class="lni lni-plus"></i>Qo'shish</button>
      </div>
    </div>
  )
}


const PartOneRow = ({row, ind, removeRowHandler}) => {
  return (
    <tr>
      <td>{ind}</td>
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
      <td><input type="number" name="column1" id="column1" value="" /></td>
      <td><input type="text" name="column1" id="column1" value="" /></td>
      <td><input type="text" name="column1" id="column1" value="" /></td>
      <td>
        <table>
          <tbody><tr class="custom-td">
            <td><input type="text" name="column1" id="column1" value="" /></td>
            <td><input type="text" name="column1" id="column1" value="" /></td>
            <td><input type="text" name="column1" id="column1" value="" /></td>
          </tr>
          </tbody></table>
      </td>
      <td><button class="custom-button" onClick={(_) => {removeRowHandler(row.f_id)}}><i class="lni lni-trash-can"></i></button></td>
    </tr>
  )
}