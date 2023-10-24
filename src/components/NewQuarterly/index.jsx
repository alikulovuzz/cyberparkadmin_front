import React, { useMemo } from "react";
import "./css/main.css";
import "./css/lineicons.css";
import PartOne from "./PartOne";
import PartTwo from "./PartTwo";
import PartThree from "./PartThree";
import PartFour from "./PartFour";
import PartFive from "./PartFive";
import year from "./../../dictionary/year";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { postRequest } from "../../utils/resquests";
import { audit_v2 } from "../../utils/API_urls";

export default function NewQuarterly() {

  const [releaseProduct, setReleaseProduct] = useState([])
  const [releaseRepublic, setReleaseRepublic] = useState([])
  const [residentalPayroll, setResidentalPayroll] = useState('')
  const [invesment, setInvesment] = useState('')
  const [importFunds, setImportFunds] = useState([])
  const [changeYear, setChangeYear] = useState(2020)
  const [quarterly, setQuarterly] = useState('first')

  const {user} = useContext(UserContext)

  console.log(user)
  // { 
  //   "name_of_report":"Auditorlik", 
  //   "file_link":"https://my.cyberpark.uz/api/v1/uploads/2023-10-18T13-51-14.647Z676c9580-6dbd-11ee-b10e-39470aaceaf9Soliq.docx", 
  //   "type_of_report":"Choraklik hisobot",
  //   "company_id":"652d21468cf46aaaae2a6ee1", 
  //   "release_product":["6531160c61767052ed5bfa91","653119b4b826f275a5f391e9","65311a56599929386934c2b6"],
  //   "release_republic":["6530b3168c6a1772e00b5350"],
  //   "residental_payroll":"6530b90ccfd838e37134f0de",
  //   "invesment":"6530b91fcfd838e37134f0e0",
  //   "import_funds":["6530b93bcfd838e37134f0e2"],
  //   "year":"2023", 
  //   "quarterly":"third"
  //   }

  const yearList = useMemo(() => {
    return year.map(year => {
      return {
        value: year.value,
        year_name: year['uz']
      }
    }
    )
  })

  const saveFullRequest = () => {
    const request = {
      quarterly,
      year: changeYear,
      // import_funds: importFunds,
      import_funds: "128oldingi234",
      invesment,
      residental_payroll: residentalPayroll,
      release_republic: releaseRepublic,
      release_product: releaseProduct,
      company_id: user._id,
      name_of_report: "modaldan oldingi nom"
    }
    console.log(request)
    postRequest(audit_v2,request).then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <div className="main-panel report">
      <div className="content-wrapper">
        <div class="container-fluid">
          <div class="title-wrapper">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="title">
                  <h2>Form Cyber Park</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="form-elements-wrapper">
            <div class="row">
              <div class="col-lg-12 custom-title">
                <div class="card-style mb-30">
                  <h4 class="mb-25">Hisobot davri</h4>
                  <div class="select-style-1">
                    <div class="select-div">
                      <label>Yil</label>
                      <div class="select-position">
                        <select onChange={event => {setChangeYear(event.target.value)}}>
                          {
                            yearList.map(elem => {
                              return <option value={elem.value}>{elem.year_name}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div class="select-div">
                      <label>Chorak</label>
                      <div class="select-position">
                        <select onChange={event => {setQuarterly(event.target.value)}}>
                          <option value="first">Первая четверть</option>
                          <option value="second">Вторая четверть</option>
                          <option value="third">Третья четверть</option>
                          <option value="fourth">Четвертая четверть</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <PartOne setReleaseProduct={(val) => {setReleaseProduct(val)}} />
                <PartTwo setReleaseRepublic={(val) => {setReleaseRepublic(val)}} />
                <PartThree setInvesment={val => {setInvesment(val)}} />
                <PartFour setResidentalPayroll={val => {setResidentalPayroll(val)}} />
                <PartFive setImportFunds={val => {setImportFunds(val)}} />
              </div>
            </div>
          </div>
        </div>
        <div class="button-add">
          <button class="save-btn" onClick={saveFullRequest}><i class="lni lni-save"></i>Saqlash</button>
        </div>
      </div>
    </div>
  )
}
