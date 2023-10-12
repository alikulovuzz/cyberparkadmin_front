import React from 'react'

export default function PartFour() {
  return (
    <div class="card-style mb-30">
                <h4 class="mb-25">IV. Информация о численности работников, а также ФОТ резидента</h4>
                <table border="1">
                  <thead>
                    <tr class="custom-td">
                      <td rowspan="2" width="2%">П/н</td>
                      <td rowspan="2" width="20%">Наименнование показателей</td>
                      <td rowspan="2" width="10%">Единица измерения</td>
                      <td rowspan="2" width="10%">За отчетыний период</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="custom-td">1</td>
                      <td class="custom-tr">Количество работников на конец отчетногопериода</td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                    </tr>
                    <tr>
                      <td class="custom-td">2</td>
                      <td class="custom-tr">Количество внешних совместителей на конец отчетного периода</td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                    </tr>
                    <tr>
                      <td class="custom-td">3</td>
                      <td class="custom-tr">Количество работающих иностранных граждан на конец отчетного периода</td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                    </tr>
                    <tr>
                      <td class="custom-td">4</td>
                      <td class="custom-tr">Количество работников, выполнявших работы по договорам гражданско-правового
                        характера, на конец отчетного периода</td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                    </tr>
                    <tr>
                      <td class="custom-td">5</td>
                      <td class="custom-tr">Фонд оплаты труда за отчетыний период</td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="number" name="column1" id="column1" value=""/></td>
                    </tr>
                  </tbody>
                </table>
                <div class="button-save">
                <button class="save-btn"><i class="lni lni-save"></i>Saqlash</button>
              </div>
              </div>
  )
}
