import React, { useEffect, useReducer, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Toaster, toast } from "sonner";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Paper from '@mui/material/Paper';
import { Box, Pagination } from '@mui/material';
import PageSize from '../PageSize';
import { postRequest,deleteReports } from '../../utils/resquests';
import { getlist_v2 } from '../../utils/API_urls';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function MonthlyCompany() {

    const [page, setPage] = useState(1)
    const [compantList, setCompoundList] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [audit, setAudit] = useState('Audit')
    const [a, forceUpdate] = useReducer((x) => x + 1, 0);
    const [open, setOpen] = React.useState(false);
    const [id, setID] = React.useState();
    const [progress, setProgress] = useState('')

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
      const handleClose = () => {
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(!open);
      };
    useEffect(() => {
        postRequest(getlist_v2,
            {
                type_of_report: audit,
                status: progress,
                pageNumber: page,
                pageSize: pageSize
            }).then((response) => {
                console.log(response.data.reports)
                setPageCount(response.data.page)
                setCompoundList(response.data.reports)
            }).catch((error) => {
                console.log(error);
            })
    }, [page, pageSize,a])

    return (
        <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tashkilot nomi</TableCell>
              <TableCell align="right">Davr</TableCell>
              <TableCell align="right">PINFL</TableCell>
              <TableCell align="right">Yil</TableCell>
              <TableCell align="right">Status</TableCell>
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
                  {row.company_id.organization_name}
                </TableCell>
                <TableCell align="right">{row.quarterly}</TableCell>
                <TableCell align="right">{row.company_id.pinfl}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">
                  <a href={row.file_link} download>
                    Yuklab olish
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
        <DialogTitle>
          {"Hisobotni o'chirishni tasdiqlaysizmi?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Yo'q</Button>
          <Button onClick={handelDelete}>Ha</Button>
        </DialogActions>
      </Dialog>
      <Toaster key={123} richColors position="bottom-right" />
    </>
    );
}