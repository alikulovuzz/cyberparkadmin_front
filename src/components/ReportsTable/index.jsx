import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { deleteReports, getReports } from "../../utils/resquests";
import { UserContext } from "../../context/UserContext";
import { Toaster, toast } from "sonner";

export default function ReportsTable(auditType) {
  const [reports, setReports] = useState([]);
  //   const [auditType, setAuditType] = useState("Audit");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(40);

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
  const handelDelete = (data) => {
    console.log(data);
    if (data) {
      deleteReports(`audit/delete?id=${data}`)
        .then((response) => {
          toast.success("Muvaffaqiyatli o'chrildi!");
        })
        .catch((error) => {
          toast.error("Server xatolik");
        });
    }
  };
  useEffect(() => {
    if (user) {
      getReports(
        `audit/getByCompany?id=${user._id}&type=${auditType.auditType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
        .then((response) => {
          setReports(response.data.reports);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  // const handleClick = () => {
  //   setUser(user);
  // };
  return (
    <>
      <Toaster key={123} richColors position="bottom-right" />
      <table className="table table-hover custom-table-report">
        <tbody>
          <tr>
            <th>№</th>
            <th>Izoh</th>
            <th>Hisobot davri</th>
            <th>Yil</th>
            <th>Berilgan sana</th>
            <th>Soat</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>1</td>
            <td>Nimadir</td>
            <td>John Doe1</td>
            <td>Bacon ipsum doner.</td>
            <td>11-7-2014</td>
            <td>16:43</td>
            <td>
              <button className="custom-btn-success">Approved</button>
            </td>
            <td>
              <a href="test_file.zip" download>
                Yuklab olish
              </a>
            </td>
            <td>
              <a href="test_file.zip" download>
                O'chirish
              </a>
            </td>
          </tr>
          {reports?.map((data, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name_of_report}</td>
                  <td>{formatReports(data.quarterly)}</td>
                  <td>{data.year}</td>
                  <td>
                    {new Date(data.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {new Date(data.createdAt).toLocaleTimeString("en-GB")}
                  </td>
                  <td>{formatStatus(data.status)}</td>
                  <td>
                    <a href={data.file_link} download>
                      Yuklab olish
                    </a>
                  </td>
                  <td>
                    <p
                      onClick={() => {
                        handelDelete(data._id);
                      }}
                    >
                      O'chirish
                    </p>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
