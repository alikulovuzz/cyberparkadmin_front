import React from 'react'

export default function PartFive() {
  return (
    <div class="card-style mb-30">
                <h4 class="mb-25">V. Информация по ввезенным для собственных нужд оборудованию, комплектующим частяь,
                  деталям, узлам, технологической документации, программного обеспечения, не производимых в Республике
                  Узбекистан, а также иных товаров, утверждённым по перечням в соответствии с УП-5099 и ПП-4751</h4>
                <table border="1">
                  <thead>
                    <tr class="custom-td">
                      <td rowspan="2" width="4%">П/н</td>
                      <td rowspan="2" width="15%">Наименнование</td>
                      <td rowspan="2" width="10%">Единица измерения</td>
                      <td rowspan="2" width="15%">Кол-во</td>
                      <td rowspan="2" width="15%">Первоначальная стоимость</td>
                      <td rowspan="2" width="15%">Накопленная амортизация</td>
                      <td rowspan="2" width="15%">Остаточная стоимость</td>
                      <td width="2%"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="custom-td">1</td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td>
                        <div class="select-position">
                          <select>
                            <option value="">Шт</option>
                            <option value="">Комплект</option>
                          </select>
                        </div>
                      </td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><input type="text" name="column1" id="column1" value=""/></td>
                      <td><button class="custom-button"><i class="lni lni-trash-can"></i></button></td>
                    </tr>
                  </tbody>
                </table>
                <div class="button-add">
                  <button class="add-btn"><i class="lni lni-plus"></i>Qo'shish</button>
                </div>
              </div>
  )
}
