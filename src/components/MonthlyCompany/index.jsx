import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Toaster, toast } from "sonner";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Box, Pagination } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import './style.css'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PageSize from "../PageSize";
import { postRequest, deleteReports } from "../../utils/resquests";
import { getlist_v2 } from "../../utils/API_urls";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApplicationsCompany() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [compantList, setCompoundList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = React.useState("progress");
  const [a, forceUpdate] = useReducer((x) => x + 1, 0);
  const [open, setOpen] = React.useState(false);
  const [openstatus, setOpenstatus] = React.useState(false);
  const [id, setID] = React.useState();

  const [audit, setAudit] = useState("Oylik");
  const navigate = useNavigate();
  const [progress, setProgress] = useState("");

  const handelDelete = (data) => {
    deleteReports(`application_form/delete?id=${id}`)
      .then((response) => {
        toast.success("Muvaffaqiyatli o'chrildi!");
        forceUpdate();
      })
      .catch((error) => {
        toast.error("Server xatolik");
        forceUpdate();
      });
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
    setOpenstatus(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    postRequest("/application_form/list", {
      pageNumber: page,
      pageSize: pageSize,
    })
      .then((response) => {
        console.log(response.data.list_of_companies);
        setPageCount(response.data.page);
        setCompoundList(response.data.list_of_companies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, pageSize, a]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tashkilot nomi</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">Yaratilgan kun</TableCell>
              <TableCell align="right">Yaratilgan vaqt</TableCell>
              <TableCell align="right" className="">Ko'rish</TableCell>
              <TableCell align="right">O'chirish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compantList.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleTimeString("en-GB")}
                </TableCell>
                <TableCell align="right">
                  <p
                    onClick={() => {
                      // handelDelete(data._id);
                      navigate({
                        pathname: "/admin/ariza_detail",
                        search: `?id=${row._id}`,
                      });
                    }}
                    className="apply-delBtn"
                  >
                    Ko'rish
                  </p>
                </TableCell>
                <TableCell align="right">
                  <p
                    className="custom-btn-delete"
                    onClick={() => {
                      // handelDelete(data._id);

                      setID(row._id);
                      handleOpen();
                    }}
                  >
                    <i className="ti-trash"></i>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Hisobotni o'chirishni tasdiqlaysizmi?"}</DialogTitle>
        <DialogActions>
          <Button>Yo'q</Button>
          <Button onClick={handelDelete}>Ha</Button>
        </DialogActions>
      </Dialog>
      <Toaster key={123} richColors position="bottom-right" />
    </>
  );
}
