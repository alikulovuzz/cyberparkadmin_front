import React from 'react'

export default function PartThree() {
  return (
    <div class="card-style mb-30">
      <h4 class="mb-25">III. Информация об инвестиционной деятельности резидента</h4>
      <table border="1">
        <thead>
          <tr class="custom-td">
            <td rowspan="2" width="2%">П/н</td>
            <td rowspan="2" width="20%">Наименнование показателей</td>
            <td rowspan="2" width="20%">За отчетыний период</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="custom-td">1</td>
            <td class="custom-tr custom-td">Обьем инвестиций, всего</td>
            <td></td>
          </tr>
          <tr>
            <td>1.1</td>
            <td class="custom-tr">В том числе основные средства</td>
            <td><input class="custom-input" type="text" name="column1" id="column1" value="" /></td>
          </tr>
          <tr>
            <td class="custom-td">2</td>
            <td class="custom-tr custom-td">Источники инвестиций</td>
            <td></td>
          </tr>
          <tr>
            <td>2.1</td>
            <td class="custom-tr">Собставенные средства организации(включая учредителей)</td>
            <td><input class="custom-input" type="text" name="column1" id="column1" value="" /></td>
          </tr>
          <tr>
            <td>2.2</td>
            <td class="custom-tr">Заемные средства</td>
            <td><input class="custom-input" type="text" name="column1" id="column1" value="" /></td>
          </tr>
          <tr>
            <td>2.3</td>
            <td class="custom-tr">Гранты и другие безвозмездно представленные средства</td>
            <td><input class="custom-input" type="text" name="column1" id="column1" value="" /></td>
          </tr>
          <tr>
            <td>2.4</td>
            <td class="custom-tr">Прочие (указать какие)</td>
            <td><input class="custom-input" type="text" name="column1" id="column1" value="" /></td>
          </tr>

        </tbody>
      </table>
      <div class="button-save">
        <button class="save-btn"><i class="lni lni-save"></i>Saqlash</button>
      </div>
    </div>
  )
}
