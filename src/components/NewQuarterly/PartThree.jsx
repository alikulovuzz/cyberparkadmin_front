import React, { useState } from 'react'
import { postRequest } from '../../utils/resquests'
import { invesment } from '../../utils/API_urls'

export default function PartThree({setInvesment}) {

  const [volume_of_invest, setEmployees] = useState('')
  const [org_funds, setPartTime] = useState('')
  const [borrowed_funds, setCountforeign] = useState('')
  const [grants, setPerforming] = useState('')
  const [other, setFund] = useState('')
  const [disabled, setDisabled] = useState(false)

  const savePartTree = () => {
    postRequest(invesment, {
      volume_of_invest,
      org_funds,
      borrowed_funds,
      grants,
      other
    }).then((response) => {
      if(response.status === 201){
        setDisabled(true)
        setInvesment(response.data.report._id)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="card-style mb-30">
      <h4 className="mb-25">III. Информация об инвестиционной деятельности резидента</h4>
      <table border="1">
        <thead>
          <tr className="custom-td">
            <td rowSpan="2" width="2%">П/н</td>
            <td rowSpan="2" width="20%">Наименнование показателей</td>
            <td rowSpan="2" width="20%">За отчетыний период</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="custom-td">1</td>
            <td className="custom-tr custom-td">Обьем инвестиций, всего</td>
            <td></td>
          </tr>
          <tr>
            <td>1.1</td>
            <td className="custom-tr">В том числе основные средства</td>
            <td><input className="custom-input" type="text" name="column1" id="column1" disabled={disabled} onChange={event => {setEmployees(event.target.value)}} /></td>
          </tr>
          <tr>
            <td className="custom-td">2</td>
            <td className="custom-tr custom-td">Источники инвестиций</td>
            <td></td>
          </tr>
          <tr>
            <td>2.1</td>
            <td className="custom-tr">Собставенные средства организации(включая учредителей)</td>
            <td><input className="custom-input" type="text" name="column1" id="column1" disabled={disabled} onChange={event => {setPartTime(event.target.value)}} /></td>
          </tr>
          <tr>
            <td>2.2</td>
            <td className="custom-tr">Заемные средства</td>
            <td><input className="custom-input" type="text" name="column1" id="column1" disabled={disabled} onChange={event => {setCountforeign(event.target.value)}} /></td>
          </tr>
          <tr>
            <td>2.3</td>
            <td className="custom-tr">Гранты и другие безвозмездно представленные средства</td>
            <td><input className="custom-input" type="text" name="column1" id="column1" disabled={disabled} onChange={event => {setPerforming(event.target.value)}} /></td>
          </tr>
          <tr>
            <td>2.4</td>
            <td className="custom-tr">Прочие (указать какие)</td>
            <td><input className="custom-input" type="text" name="column1" id="column1" disabled={disabled} onChange={event => {setFund(event.target.value)}} /></td>
          </tr>

        </tbody>
      </table>
      <div className="button-save">
        <button 
          className="save-btn"
          onClick={savePartTree}
        >
          <i className="lni lni-save"></i> Сохранять
        </button>
      </div>
    </div>
  )
}
