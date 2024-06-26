import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { Box, Pagination, colors } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AccessDeny from "../AccessDeny";
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
import { UserContext } from "../../context/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuarterlyCompany() {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [compantList, setCompoundList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = React.useState("progress");
  const [statusSearch, setStatusSearch] = React.useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [a, forceUpdate] = useReducer((x) => x + 1, 0);
  const [open, setOpen] = React.useState(false);
  const [openstatus, setOpenstatus] = React.useState(false);
  const [id, setID] = React.useState();
  const navigate = useNavigate();

  const [note, setNotes] = useState();

  const [audit, setAudit] = useState("Choraklik");
  const [progress, setProgress] = useState("");

  const [pinflSearch, setPinflSearch] = useState("");


  const handelDelete = (data) => {
    deleteReports(`audit/delete?id=${id}`)
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
  const formatStatus = (data) => {
    switch (data) {
      case "not_in_progress":
        return (
          <button className="custom-btn-wait">Imzolanish jarayonida</button>
        );
      case "disabled":
        return <button className="custom-btn-error">Rad etildi</button>;
      case "progress":
        return (
          <button className="custom-btn-accept">Ko'rib chiqilmoqda</button>
        );
      case "finished":
        return <button className="custom-btn-success">Tasdiqlandi</button>;
    }
  };
  const handleChangeStatus = (data) => {
    postRequest(`audit/status_change`, {
      report_id: id,
      status: status,
      notes: note,
    })
      .then((response) => {
        toast.success("Muvaffaqiyatli o'chrildi!");
        setNotes("");
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server xatolik");
        setNotes("");
        forceUpdate();
      });
    handleClose();
  };
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeStatusSearch = (event) => {
    setStatusSearch(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenstatus(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenStatus = () => {
    setOpenstatus(!open);
  };

  useEffect(() => {
    if (user?.role.filter((e) => e === "admin").length > 0) {
      postRequest(getlist_v2, {
        type_of_report: audit,
        status: statusSearch == "all" ? null : statusSearch,
        pinfl: pinflSearch == "" ? null : pinflSearch,
        pageNumber: page,
        pageSize: pageSize,
      })
        .then((response) => {
          // console.log(response.data.reports);
          setPageCount(response.data.page);
          setCompoundList(response.data.reports);
        })
        .catch((error) => {
          console.log(error);
          // setNotes()
          setCompoundList([]);
        });
    }
    
  }, [page, pageSize, a, statusSearch, pinflSearch]);
  if (!(user?.role.filter((e) => e === "admin").length > 0)) {
    return <AccessDeny/>;
  }
  return (
    <>
      <FormControl>
        <div className="custom-search">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statusSearch}
            label="Chorak"
            onChange={handleChangeStatusSearch}
            style={{ marginRight: "10px" }}
          >
            <MenuItem value={"all"}>Hammasi</MenuItem>
            <MenuItem value={"not_in_progress"}>Imzolanish jarayonida</MenuItem>
            <MenuItem value={"progress"}>Ko'rib chiqilmoqda</MenuItem>
            <MenuItem value={"finished"}>Tasdiqlandi</MenuItem>
            <MenuItem value={"disabled"}>Rad etildi</MenuItem>
          </Select>
          <TextField
            className="search-text"
            id="outlined-basic"
            label="INN"
            variant="outlined"
            value={note}
            onChange={(event) => {
              setPinflSearch(event.target.value);
            }}
            InputLabelProps={{
              style: { color: 'black' } // Change 'red' to the color you want
            }}
          />
        </div>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tashkilot nomi</TableCell>
              <TableCell align="right">Davr</TableCell>
              <TableCell align="right">INN</TableCell>
              <TableCell align="right">Yil</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Izoh</TableCell>
              <TableCell align="right">Yaratilgan kun</TableCell>
              <TableCell align="right">Yaratilgan vaqt</TableCell>
              <TableCell align="right">Ko'rish</TableCell>
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
                  {row.company_id.organization_name
                    ? row.company_id.organization_name
                    : row.company_id}
                </TableCell>
                <TableCell align="right">{row.quarterly}</TableCell>
                <TableCell align="right">{row.company_id.pinfl}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell
                  align="right"
                  onClick={() => {
                    // handelDelete(data._id);
                    setID(row._id);
                    handleOpenStatus();
                  }}
                >
                  {formatStatus(row.status)}
                </TableCell>
                <TableCell
                  align="right"
                  title={row.notes_from_company}
                  className="text"
                >
                  {row?.notes_from_company?.substring(0, 20) + "..."}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleTimeString("en-GB")}
                </TableCell>
                <TableCell align="right">
                  <a
                    href="#"
                    onClick={() => {
                      // handelDelete(data._id);
                      navigate({
                        pathname: "/admin/detail_report",
                        search: `?id=${row._id}`,
                      });
                    }}
                  >
                    KO'RISH
                  </a>
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
          <Button onClick={handleClose}>Yo'q</Button>
          <Button onClick={handelDelete}>Ha</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openstatus}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Hisbotni holatini uzagrtirish"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ p: 1 }}>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Chorak</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Chorak"
                // size='small'
                onChange={handleChange}
              >
                <MenuItem value={"not_in_progress"}>
                  Imzolanish jarayonida
                </MenuItem>
                <MenuItem value={"progress"}>Ko'rib chiqilmoqda</MenuItem>
                <MenuItem value={"finished"}>Tasdiqlandi</MenuItem>
                <MenuItem value={"disabled"}>Rad etildi</MenuItem>
              </Select>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Hisobot uchun izoh!"
                variant="outlined"
                sx={{ my: 1 }}
                value={note}
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
              />
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yo'q</Button>
          <Button onClick={handleChangeStatus}>Ha</Button>
        </DialogActions>
      </Dialog>
      <Toaster key={123} richColors position="bottom-right" />
    </>
  );
}
