import React from 'react'

export default function PartTwo() {
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

                  </tbody>
                </table>
                <div class="button-add">
                  <button class="add-btn"><i class="lni lni-plus"></i>Qo'shish</button>
                  <button class="save-btn"><i class="lni lni-save"></i>Saqlash</button>
                </div>
              </div>
  )
}
