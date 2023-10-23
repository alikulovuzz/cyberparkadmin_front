import React, { useContext, useState } from "react";
import "./custom.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getReports } from "../../utils/resquests";
import { UserContext } from "../../context/UserContext";
import { Suspense } from "react";
import ReportsTable from "../ReportsTable";

export default function QuarterlyReport() {
  const [reports, setReports] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [auditType, setAuditType] = useState("Choraklik");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user } = useContext(UserContext);

  // useEffect(()=>{
  //   setCompanyId(user['_id'])
  // },[])

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
    if (user) {
      getReports(
        `audit/getByCompany?id=${user._id}&type=${auditType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
        .then((response) => {
          setReports(response.data.reports);
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
                <h3>Choraklik hisobot</h3>
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
                  <Suspense fallback={<p>Loading...</p>}>
                    <ReportsTable auditType="Choraklik" />
                  </Suspense>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
