import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { deleteReports, getReports, getRequest } from "../../utils/resquests";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/UserContext";
import { Toaster, toast } from "sonner";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useReducer } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportsTable(auditType) {
  const [reports, setReports] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(40);
  const [a, forceUpdate] = useReducer(x => x + 1, 0);
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
    deleteReports(`audit/delete?id=${id}`)
        .then((response) => {
          toast.success("Muvaffaqiyatli o'chrildi!");
          forceUpdate()
        })
        .catch((error) => {
          console.log(error)
          toast.error("Server xatolik");
          forceUpdate()
        });
    handleClose()
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (user) {
      getRequest(
        `audit/getByCompany?id=${user._id}&type=${auditType.auditType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
        .then((response) => {
          setReports(response.data.reports);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user,a]);
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
                  {/* <td>
                    <p className="custom-btn-delete"
                      onClick={() => {
                        // handelDelete(data._id);
                        setID(data._id)
                        handleOpen();
                      }}
                    >
                      <i className="ti-trash"></i>
                    </p>
                  </td> */}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Hisobotni o'chirishni tasdiqlaysizmi?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Yo'q</Button>
          <Button onClick={handelDelete}>Ha</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
