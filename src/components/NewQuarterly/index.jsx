import React, { useMemo } from "react";
import "./css/main.css";
import "./css/lineicons.css";
import PartOne from "./PartOne";
import PartTwo from "./PartTwo";
import Button from "@mui/material/Button";
import PartThree from "./PartThree";
import PartFour from "./PartFour";
import PartFive from "./PartFive";
import year from "./../../dictionary/year";
import { Toaster, toast } from "sonner";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { postRequest} from '../../utils/resquests';
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { UserContext } from '../../context/UserContext';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewQuarterly() {
  const [releaseProduct, setReleaseProduct] = useState([]);
  const [releaseRepublic, setReleaseRepublic] = useState([]);
  const [residentalPpayroll, setResidentalPayroll] = useState("");
  const [invesment, setInvesment] = useState("");
  const [importFunds, setImportFunds] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [quarterly, setQuarterly] = React.useState("first");
  const [yearsd, setYears] = React.useState(2020);
  const { user } = React.useContext(UserContext)

  const handleChangeYear = (event) => {
    setYears(event.target.value);
  };
  const handleChange = (event) => {
    setQuarterly(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const commitData = () => {
    if (true) {
      postRequest('/audit/v2', {
        name_of_report:"Choraklik hisobot",
        type_of_report:"Choraklik",
        company_id: user?._id,
        release_product: releaseProduct?releaseProduct:null,
        release_republic: releaseRepublic?releaseRepublic:null,
        residental_payroll: residentalPpayroll?residentalPpayroll:null,
        invesment:invesment?invesment:null,
        import_funds:importFunds?importFunds:null,
        year:yearsd,
        quarterly:quarterly
      }).then((response) => {
          toast.success("Muvaffaqiyatli!");
          handleClose()                    
          console.log(response)
      }).catch((error) => {
          console.log(error);
          handleClose()
          toast.error("Serverda xatolik.");                    
      })
  }
  };
  const yearList = useMemo(() => {
    return year.map((year) => {
      return { value: year.value, year_name: year["uz"] };
    });
  });

  return (
    <div className="main-panel report">
      <div className="content-wrapper">
        <div class="container-fluid">
          <div class="title-wrapper">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="title">
                  <h2>Form Cyber Park</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="form-elements-wrapper">
            <div class="row">
              <div class="col-lg-12 custom-title">
                <div class="card-style mb-30">
                  <h4 class="mb-25">Hisobot davri</h4>
                  <div class="select-style-1">
                    <div class="select-div">
                      <label>Yil</label>
                      <div class="select-position">
                        <select onChange={handleChangeYear}>
                          {yearList.map((elem) => {
                            return (
                              <option value={elem.value}>
                                {elem.year_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div class="select-div">
                      <label>Chorak</label>
                      <div class="select-position">
                        <select onChange={handleChange}>
                          <option value="first">1</option>
                          <option value="second">2</option>
                          <option value="third">3</option>
                          <option value="fourth">4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <PartOne
                  setReleaseProduct={(val) => {
                    console.log(val);
                    setReleaseProduct(val);
                  }}
                />
                <PartTwo
                  setReleaseRepublic={(val) => {
                    console.log(val);
                    setReleaseRepublic(val);
                  }}
                />
                <PartThree
                  setInvesment={(val) => {
                    console.log(val);
                    setInvesment(val);
                  }}
                />
                <PartFour
                  setResidentalPayroll={(val) => {
                    console.log(val);
                    setResidentalPayroll(val);
                  }}
                />
                <PartFive
                  setImportFunds={(val) => {
                    console.log(val);
                    setImportFunds(val);
                  }}
                />
                <div class="card-style mb-30">
                  <h4 class="mb-25">Hisobotni saqlash</h4>
                  <div class="button-add">
                    <button class="save-btn" onClick={handleOpen}>
                      <i class="lni lni-save"></i>Saqlash
                    </button>
                  </div>
                </div>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>
                    {"Hisobotni yuborishni tasdiqlaysizmi?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}>Yo'q</Button>
                    <Button onClick={commitData}>Ha</Button>
                  </DialogActions>
                </Dialog>
                <Toaster richColors position="bottom-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
