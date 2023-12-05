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
import { postRequest, uploadFile } from "../../utils/resquests";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";
import { MuiFileInput } from "mui-file-input";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

import { audit_v2, upload } from "../../utils/API_urls";

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
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  const formRef = React.useRef();

  const [addRefs, setAddRefs] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [addRefsList, setAddRefsList] = useState([]);
  const [validateRefs, setValidateRefs] = useState(true);
  const [aylanmaSoliq, setAylanmaSoliq] = useState(null);
  const [jisDaromadSoliq, setJisDaromadSoliq] = useState(null);
  const [kksSoliq, setKksSoliq] = useState(null);
  const [daromadSoliq, setDaromadSoliq] = useState(null);
  const [value, setValue] = React.useState(null);

  const handleChangeAylanmaSoliq = (newValue) => {
    setAylanmaSoliq(newValue);
  };
  const handleChangeJisDaromadSoliq = (newValue) => {
    setJisDaromadSoliq(newValue);
  };
  const handleChangeKksSoliq = (newValue) => {
    setKksSoliq(newValue);
  };
  const handleChangeDaromadSoliq = (newValue) => {
    setDaromadSoliq(newValue);
  };

  const handleChangeFile = (newValue) => {
    // console.log("clicked");
    // setValue(newValue);
  };

  const handleChangeYear = (event) => {
    setYears(event.target.value);
  };
  const handleChange = (event) => {
    setQuarterly(event.target.value);
  };
  const handleChangeRefs = (event) => {
    // console.log(event.target.value);
    if (event.target.value == "Ha") {
      setAddRefs(true);
    } else {
      setAddRefs(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleReport = (value, type) => {
    // uploadFile()
    const formData = new FormData();
    formData.append("file", value);
    uploadFile(upload, formData)
      .then((response) => {
        addRefsList.push({ name: type, link: response.data.link });
      })
      .catch((error) => {
        if (error.response.data.message == "Please upload a file") {
          toast.error("Please upload a file");
        } else {
          toast.error("Serverda xatolik.");
        }
      });
  };

  const formRefSend = () => {
    // console.log(addRefs)
    if (!addRefs && jisDaromadSoliq && aylanmaSoliq) {
      handleReport(aylanmaSoliq, "aylanmaSoliq");
      handleReport(jisDaromadSoliq, "jisDaromadSoliq");
      setValidateRefs(true);
      setFormValid(true);
      toast.success("Muvaffaqiyatli!");
      // handleReport(jisDaromadSoliq)
    } else if (addRefs && kksSoliq && daromadSoliq && jisDaromadSoliq) {
      handleReport(jisDaromadSoliq, "jisDaromadSoliq");
      handleReport(kksSoliq, "kksSoliq");
      handleReport(daromadSoliq, "daromadSoliq");
      setFormValid(true);
      setValidateRefs(true);
      toast.success("Muvaffaqiyatli!");
    } else {
      setFormValid(false);
      toast.error("Please upload a file");
      setValidateRefs(false);
    }
  };
  const commitData = () => {
    if (addRefsList.length > 0) {
      postRequest("/audit/v2", {
        name_of_report: "Choraklik hisobot",
        type_of_report: "Choraklik",
        company_id: user?._id,
        release_product: releaseProduct ? releaseProduct : null,
        release_republic: releaseRepublic ? releaseRepublic : null,
        residental_payroll: residentalPpayroll ? residentalPpayroll : null,
        invesment: invesment ? invesment : null,
        import_funds: importFunds ? importFunds : null,
        year: yearsd,
        kks_payer: addRefs ? 'yes' : 'no',
        quarterly: quarterly,
        additional_refs: addRefsList
      })
        .then((response) => {
          toast.success("Muvaffaqiyatli!");
          handleClose();
          navigate({
            pathname: "/user",
          });
          // console.log(response);
        })
        .catch((error) => {
          // console.log(error);
          handleClose();
          toast.error("Serverda xatolik.");
        });
    } else {
      setValidateRefs(false);
      handleClose();
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
                  <h4 class="mb-25">Отчетный период</h4>
                  <div class="select-style-1">
                    <div class="select-div">
                      <label>Год</label>
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
                      <label>Квартал</label>
                      <div class="select-position">
                        <select onChange={handleChange}>
                          <option value="first">1</option>
                          <option value="second">2</option>
                          <option value="third">3</option>
                          <option value="fourth">4</option>
                        </select>
                      </div>
                    </div>
                    <div class="select-div">
                      <label>Плательщик НДС</label>
                      <div class="select-position">
                        <select onChange={handleChangeRefs}>
                          <option value="Yo'q">Нет</option>
                          <option value="Ha">Да</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <PartOne
                  setReleaseProduct={(val) => {
                    // console.log(val);
                    setReleaseProduct(val);
                  }}
                />
                <PartTwo
                  setReleaseRepublic={(val) => {
                    // console.log(val);
                    setReleaseRepublic(val);
                  }}
                />
                <PartThree
                  setInvesment={(val) => {
                    // console.log(val);
                    setInvesment(val);
                  }}
                />
                <PartFour
                  setResidentalPayroll={(val) => {
                    // console.log(val);
                    setResidentalPayroll(val);
                  }}
                />
                <PartFive
                  setImportFunds={(val) => {
                    // console.log(val);
                    setImportFunds(val);
                  }}
                />
                <div class="card-style mb-30">
                  <h4 class="mb-25">Дополнительный отчет</h4>
                  <form ref={formRef}>
                    {!addRefs ? (
                      <div>
                        <MuiFileInput
                          sx={{
                            mx: 1,
                            my: 1,
                            display: "inline-grid",
                            width: "auto",
                            height: "auto",
                          }}
                          value={aylanmaSoliq}
                          label="Налог с оборота"
                          onChange={handleChangeAylanmaSoliq}
                          placeholder="file"
                          disabled={formValid}
                        // required
                        />
                        <MuiFileInput
                          sx={{
                            mx: 1,
                            my: 1,
                            display: "inline-grid",
                            width: "auto",
                            height: "auto",
                          }}
                          value={jisDaromadSoliq}
                          label="Налог на прибыль с физических лиц"
                          onChange={handleChangeJisDaromadSoliq}
                          placeholder="file"
                          disabled={formValid}
                        // required
                        />
                      </div>
                    ) : (
                      <div>
                        <MuiFileInput
                          sx={{
                            mx: 1,
                            my: 1,
                            display: "inline-grid",
                            width: "auto",
                            height: "auto",
                          }}
                          label="НДС"
                          value={kksSoliq}
                          onChange={handleChangeKksSoliq}
                          disabled={formValid}
                          placeholder="file"
                        />
                        <MuiFileInput
                          sx={{
                            mx: 1,
                            my: 1,
                            display: "inline-grid",
                            width: "auto",
                            height: "auto",
                          }}
                          label="Подоходный налог"
                          disabled={formValid}
                          value={daromadSoliq}
                          onChange={handleChangeDaromadSoliq}
                          placeholder="file"
                        />
                        <MuiFileInput
                          sx={{
                            mx: 1,
                            my: 1,
                            display: "inline-grid",
                            width: "auto",
                            height: "auto",
                          }}
                          label="Налог на прибыль с физических лиц"
                          disabled={formValid}
                          value={jisDaromadSoliq}
                          onChange={handleChangeJisDaromadSoliq}
                          placeholder="file"
                        />
                      </div>
                    )}
                    {validateRefs ? (
                      <></>
                    ) : (
                      <div class="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div>
                    )}

                    <div class="button-add">
                      <Button class="save-btn" variant="contained" onClick={formRefSend}>
                      <i class="lni lni-save"></i>Сохранять
                      </Button>
                    </div>
                  </form>
                </div>
                <div class="card-style mb-30">
                  <h4 class="mb-25">Отправить отчет</h4>
                  <div class="button-add">
                    <button class="save-btn" onClick={handleOpen}>
                      <i class="lni lni-upload"></i>Отправить
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
                    <Button onClick={handleClose}>Нет</Button>
                    <Button onClick={commitData}>Да</Button>
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
