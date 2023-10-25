import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { UserContext } from "../../context/UserContext";
import { Toaster, toast } from "sonner";
import { postRequest, uploadFile } from "../../utils/resquests";
import { audit_v2, upload } from "../../utils/API_urls";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddReportDialog(type_of_report) {
  const { user } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [quarterly, setQuarterly] = React.useState("first");
  const [year, setYear] = React.useState(2023);
  const [value, setValue] = React.useState(null);

  const handleChangeFile = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setQuarterly(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    // uploadFile()
    const formData = new FormData();
    formData.append("file", value);
    uploadFile(upload, formData)
      .then((response) => {
        if (response.status) {
          postRequest(audit_v2, {
            quarterly,
            year,
            type_of_report: type_of_report.type_of_report,
            name_of_report: name,
            file_link: response.data.link,
            company_id: user?._id,
          })
            .then((response) => {
              toast.success("Muvaffaqiyatli!");
              handleClose();
              console.log(response);
              type_of_report.setImportFunds()
            })
            .catch((error) => {
              console.error(error);
              handleClose();
              toast.error("Serverda xatolik.");
            });
        }
      })
      .catch((error) => {
        if (error.response.data.message == "Please upload a file") {
          // handleClose()
          toast.error("Please upload a file");
        } else {
          handleClose();
          toast.error("Serverda xatolik.");
        }
      });
  };

  return (
    <div>
      <button className="btn btn-block" onClick={handleClickOpen}>
        <i className="ti-plus"></i>
        Qo'shish
      </button>
      <Toaster richColors position="bottom-right" />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Hisobotni yuklash"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ p: 1 }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Hisobot uchun izoh!"
              variant="outlined"
              sx={{ my: 1 }}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Yil</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Yil"
                // size='small'
                onChange={handleChangeYear}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Chorak</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quarterly}
                label="Chorak"
                // size='small'
                onChange={handleChange}
              >
                <MenuItem value={"first"}>Birinchi chorak</MenuItem>
                <MenuItem value={"second"}>Ikkinchi chorak</MenuItem>
                <MenuItem value={"third"}>Uchinchi chorak</MenuItem>
                <MenuItem value={"fourth"}>To'rtinchi chorak</MenuItem>
              </Select>
            </FormControl>
            <MuiFileInput
              sx={{ my: 1 }}
              fullWidth
              value={value}
              onChange={handleChangeFile}
              placeholder="file"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Qaytish</Button>
          <Button onClick={handleReport}>Saqlash</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
