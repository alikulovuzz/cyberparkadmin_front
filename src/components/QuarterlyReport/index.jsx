import React, { useContext, useState } from "react";
import "./custom.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getReports, getRequest } from "../../utils/resquests";
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

  useEffect(() => {
    if (user) {
      getRequest(
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
