import React from 'react'
import './custom.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'


export default function QuarterlyReport() {
const companyId = '652d21468cf46aaaae2a6ee1';
const auditType = 'Choraklik';
const pageNumber = 1;
const pageSize = 1;

// Construct the URL without query parameters
const url = 'http://localhost:8081/api/v1/audit/getByCompany';

// Define the POST request body with the dynamic parameters
const data = new URLSearchParams();
data.append('id', );
data.append('type', auditType);
data.append('pageNumber', pageNumber);
data.append('pageSize', pageSize);



    useEffect(()=>{
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the content type of the request body
            },
            body: data, // Convert the request body to JSON
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              // Handle the response data here
              console.log(data);
            })
            .catch(error => {
              // Handle any errors that occurred during the fetch
              console.error('Fetch error:', error);
            });
    },[])
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <section className="content-header custom-header">
                                <h3>
                                    Choraklik hisobot
                                </h3>
                                <ol className="breadcrumb">
                                    <Link to="new-quarterly">
                                        <button className="btn btn-block"><i className="ti-plus"></i>
                                            Qo'shish
                                        </button>
                                    </Link>
                                    
                                </ol>
                            </section>
                            <form action="#" className="mt-30">
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover custom-table-report">
                                        <tbody>
                                        <tr>
                                            <th>№</th>
                                            <th>Hisobot davri</th>
                                            <th>Chorak</th>
                                            <th>Berilgan sana</th>
                                            <th>Status</th>
                                            <th>Harakat</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe1</td>
                                            <td>Bacon ipsum
                                                doner.</td>
                                            <td>11-7-2014</td>
                                            <td><button className="custom-btn-success">Approved</button></td>
                                            <td>Harakat</td>
                                            <td><a href="test_file.zip" download>Yuklab olish</a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
