import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getReports } from "../../utils/resquests";
import { UserContext } from "../../context/UserContext";
import { Suspense } from "react";

export default function MonthlyReport() {
    const [reports, setReports] = useState([]);
    const [auditType, setAuditType] = useState("Audit");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const { user } = useContext(UserContext);
  
    const formatReports = (data) => {
      switch (data) {
        case "first":
          return "Birinchi chorak";
        case "second":
          return "Ikkinchi chorak";
        case "third":
          return "Uchinchi chorak";
        case "fourth":
          return "To'rtinchi chorak";
      }
    };
    const formatStatus = (data) => {
      switch (data) {
        case "not_in_progress":
          return <button className="custom-btn-wait">Yuborilgan</button>;
        case "disabled":
          return <button className="custom-btn-error">Bekor qilindi</button>;
        case "progress":
          return <button className="custom-btn-accept">Jarayonda</button>;
        case "finished":
          return <button className="custom-btn-success">Tasdiqlandi</button>;
      }
    };
  
    useEffect(() => {
      if(user){
        getReports(
          `audit/getByCompany?id=${user._id}&type=${auditType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        )
          .then((response) => {
            setReports((current) => [...response.data.reports]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, [user]);
    return (
      <>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-lg-12 grid-margin">
                <section className="content-header custom-header">
                  <h3>Oylik hisobot</h3>
                  <ol className="breadcrumb">
                    <Link to="new-quarterly">
                      <button className="btn btn-block">
                        <i className="ti-plus"></i>
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
                          <th>Yil</th>
                          <th>Berilgan sana</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>John Doe1</td>
                          <td>Bacon ipsum doner.</td>
                          <td>11-7-2014</td>
                          <td>
                            <button className="custom-btn-success">
                              Approved
                            </button>
                          </td>
                          <td>
                            <a href="test_file.zip" download>
                              Yuklab olish
                            </a>
                          </td>
                        </tr>
                        {reports.map((data, index) => {
                          return (
                            <Suspense fallback={<p>Loading...</p>}>
                              <>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{formatReports(data.quarterly)}</td>
                                  <td>{data.year}</td>
                                  <td>
                                    {new Date(data.createdAt).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </td>
                                  <td>{formatStatus(data.status)}</td>
                                  <td>
                                    <a href={data.file_link} download>
                                      Yuklab olish
                                    </a>
                                  </td>
                                </tr>
                              </>
                            </Suspense>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
