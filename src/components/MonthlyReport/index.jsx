import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getReports, getRequest } from "../../utils/resquests";
import { UserContext } from "../../context/UserContext";
import { Suspense } from "react";
import AddReportDialog from "../AddReportDialog";
import { formatReports, formatStatus } from "../../utils/helper";
import ReportsTable from "../ReportsTable";

export default function MonthlyReport() {
  const [reports, setReports] = useState([]);
  const [auditType, setAuditType] = useState("Oylik");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(40);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getRequest(
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
                <h3>Soliq hisobotlari</h3>
                <ol className="breadcrumb">
                  <AddReportDialog type_of_report="Oylik" />
                </ol>
              </section>
              <form action="#" className="mt-30">
                <div className="box-body table-responsive no-padding">
                  <Suspense fallback={<p>Loading...</p>}>
                    <ReportsTable auditType="Oylik" />
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
