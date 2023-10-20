import React, { useMemo } from 'react'
import './css/main.css'
import './css/lineicons.css'
import PartOne from './PartOne'
import PartTwo from './PartTwo'
import PartThree from './PartThree'
import PartFour from './PartFour'
import PartFive from './PartFive'
import year from './../../dictionary/year'
import { useState } from 'react'

export default function NewQuarterly() {

  const [releaseProduct, setReleaseProduct] = useState([])

    const yearList = useMemo(() => {
        return year.map(year => {
            return {value: year.value,
                 year_name: year['uz']}
            }
        )
    })

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
                      <select>
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
                      <select>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <PartOne setReleaseProduct={(val) => {console.log(val); setReleaseProduct(val)}}/>
              <PartTwo/>
              <PartThree/>
              <PartFour/>
              <PartFive/>
            </div>
          </div>
        </div>
    </div>
        </div>
    </div>
  )
}
