import React, { useState, useEffect, useRef } from "react";
import { MuiFileInput } from "mui-file-input";
import Button from "@mui/material/Button";
import "./main.css";
import "./lineicons.css";
import { FormControl, TextField } from "@mui/material";
import { postRequest, uploadFile } from "../../utils/resquests";
import { Toaster, toast } from "sonner";
import { upload } from "../../utils/API_urls";
import SuccessMessage from "../SuccessMessage";
import ReCAPTCHA from "react-google-recaptcha";

export default function ApplyResidents() {
  const [statusResult, setStatusResult] = useState(true);
  const [value, setValue] = React.useState(null);

  //validate
  const [validate, setValidate] = useState(false);

  //captcha validation
  const [captVal, setCaptVal] = useState(null);

  // this states used for stroring files
  const [company, setCompany] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailValidation, setEmailValidation] = useState(true);
  const [requirements, setRequirements] = useState(null);
  const [application, setApplication] = useState(null);
  const [constituent_documents, setConstituentDocuments] = useState(null);
  const [description, setDescription] = useState(null);
  const [license, setLicense] = useState(null);
  const [copy_passport, setCopyPassport] = useState(null);
  const [project_description, setProjectDescription] = useState(null);
  const [candidate_application, setCandidateApplication] = useState(null);
  const [business_plan, setBusinessPlan] = useState(null);

  // this use state is used for createing body json from abouse state files
  const [body, setBody] = useState({});

  const recaptcha = useRef();

  // const handleFileInputChange = (fieldName, file) => {
  //   setFileInputs({ ...fileInputs, [fieldName]: file });
  // };

  // const handleTextChange = (event) => {
  //   setTextInput(event.target.value);
  // };
  
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeFile = (type, value) => {
    if (type == "requirements") {
      setRequirements(value);
    } else if (type == "application") {
      setApplication(value);
    } else if (type == "constituent_documents") {
      setConstituentDocuments(value);
    } else if (type == "description") {
      setDescription(value);
    } else if (type == "license") {
      setLicense(value);
    } else if (type == "copy_passport") {
      setCopyPassport(value);
    } else if (type == "project_description") {
      setProjectDescription(value);
    } else if (type == "candidate_application") {
      setCandidateApplication(value);
    } else if (type == "business_plan") {
      setBusinessPlan(value);
    }
  };
  const handleReport = (value, type) => {
    const formData = new FormData();
    formData.append("file", value);
    uploadFile(upload, formData)
      .then((response) => {
        // body.push({ type:response.data.link });
        body[type] = response.data.link;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "Please upload a file") {
          toast.error("Please upload a file");
        } else {
          toast.error("Serverda xatolik.");
        }
      });
  };
  const clearInputs = () => {
    setCompany(null);
    setEmail(null);
    setRequirements(null);
    setApplication(null);
    setConstituentDocuments(null);
    setDescription(null);
    setLicense(null);
    setCopyPassport(null);
    setProjectDescription(null);
    setCandidateApplication(null);
    setBusinessPlan(null);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  useEffect(() => {
    localStorage.removeItem("savedEmail");
    setEmail("");
  }, []);

  const uploadFiles = async () => {
    body["company"] = company;
    if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      body["company"] = company;
    }else{
      setEmailValidation()
      return
    }
    body["email"] = email;
    handleReport(requirements, "requirements");
    handleReport(application, "application");
    handleReport(constituent_documents, "constituent_documents");
    handleReport(description, "description");
    handleReport(license, "license");
    handleReport(copy_passport, "copy_passport");
    handleReport(project_description, "project_description");
    handleReport(candidate_application, "candidate_application");
    handleReport(business_plan, "business_plan");
  };
  async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidate(true);
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
      return;
    }
    if (captchaValue) {
      await Promise.all([uploadFiles()]);
    }
    // await setInterval(uploadFiles(), 1000);
    // await uploadFiles()
    await delay(2000);
    if (body.description) {
      await Promise.all([
        postRequest("/application_form/create", body)
          .then((response) => {
            toast.success("Muvaffaqiyatli!");
            // handleClose();
            clearInputs();
            setValidate(false);
            setStatusResult(false);
            // navigate({
            //   pathname: "/user",
            // });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Serverda xatolik.");
          }),
      ]);
    }
  };

  return statusResult ? (
    <>
      <div className="container-scroller">
        <div className="custom-title-form">
          <div className="card-style-form mb-30">
            <div>
              <h4 className="mb-25 pt-50">
                ЗАЯВКА НА РЕЗИДЕНТСВО В IT-PARK ИННОВАЦИЙ В КИБЕРНЕТИКЕ
              </h4>
            </div>
            <div className="card-style-apply mb-30">
              <div className="title-apply">
                <h5 className="mb-25">
                  В данной форме представлен полный перечень документов для
                  подачи заявки на резидентство в IT-PARK ИННОВАЦИЙ В
                  КИБЕРНЕТИКЕ *
                </h5>
              </div>
              <FormControl onSubmit={handleSubmit}>
                <p style={{ margin: "0px" }}>Название организации?</p>
                <div className="apply-resident">
                  <TextField
                    key="input_app"
                    variant="outlined"
                    placeholder="Название организации? *"
                    className="apply-block"
                    value={company}
                    onChange={handleCompanyChange}
                  />
                  {!(validate && !company) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>Электронная почта</p>
                  <TextField
                    key="input_app"
                    variant="outlined"
                    placeholder="Электронная почта *"
                    className="apply-block"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!(validate && !email) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные email...
                      </div>
                    </>
                  )}
                  {emailValidation ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные email...
                      </div>
                    </>
                  )}
                  <p>
                    Основные требования для получения статуса резидента (Файл
                    для ознакомления №1)
                  </p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={requirements}
                    onChange={(file) => handleChangeFile("requirements", file)}
                  />
                  {!(validate && !requirements) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>Заявление о регистрации в качестве резидента (Файл №2)</p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={application}
                    onChange={(file) => handleChangeFile("application", file)}
                  />
                  {!(validate && !application) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>
                    Копии учредительных документов: Устав, Учредительный договор
                    (если учредителей больше одного), Гувохнома
                  </p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={constituent_documents}
                    onChange={(file) =>
                      handleChangeFile("constituent_documents", file)
                    }
                  />
                  {!(validate && !constituent_documents) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>
                    Описание проекта, предлагаемого для реализации в качестве
                    резидента IТ-парка инноваций в кибернетике (оригинал с живой
                    подписью и печатью)
                  </p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={description}
                    onChange={(file) => handleChangeFile("description", file)}
                  />
                  {!(validate && !description) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>
                    Копия лицензии или разрешительного документа (при наличии)
                  </p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={license}
                    onChange={(file) => handleChangeFile("license", file)}
                  />
                  {!(validate && !license) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>Копия приказа на директора и его паспорта</p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={copy_passport}
                    onChange={(file) => handleChangeFile("copy_passport", file)}
                  />
                  {!(validate && !copy_passport) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>Примерная форма описания проекта (Файл №3)</p>
                  <MuiFileInput
                    placeholder="Файл *"
                    value={project_description}
                    className="apply-block"
                    onChange={(file) =>
                      handleChangeFile("project_description", file)
                    }
                  />
                  {!(validate && !project_description) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>Анкета кандидата (Файл №4)</p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={candidate_application}
                    onChange={(file) =>
                      handleChangeFile("candidate_application", file)
                    }
                  />
                  {!(validate && !candidate_application) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <p>Структура бизнес план (Файл №5)</p>
                  <MuiFileInput
                    placeholder="Файл *"
                    className="apply-block"
                    value={business_plan}
                    onChange={(file) => handleChangeFile("business_plan", file)}
                  />
                  {!(validate && !business_plan) ? (
                    <></>
                  ) : (
                    <>
                      <div className="warn-file">
                        Пожалуйста, заполните вышеуказанные файлы...
                      </div>
                    </>
                  )}
                  <div className="apply-div">
                    <p>
                      Указ президента, где Вы можете ознакомиться с льготами
                      (УП-5099-сон 30.06.2017. О мерах по коренному улучшению
                      условий для развития отрасли информационных технологий в
                      республике)
                      <a href="https://lex.uz/docs/3249654">
                        {" "}
                        <br></br>
                        Ссылка 1
                      </a>
                    </p>
                  </div>
                  <div className="apply-div">
                    <p>
                      Закон о кибербезопасности, который был подписан недавно{" "}
                      <br></br>
                      <a href="https://lex.uz/ru/docs/5960609?query=%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C#sr-1 ">
                        Ссылка 2
                      </a>
                    </p>
                  </div>
                  <div className="apply-div">
                    <p>
                      Если Вам нужно будет проходить сертификацию в Центре
                      Кибербезопасности, то для наших резидентов есть льготы в
                      этом плане. Мы предоставляем резидентам услугу подготовки
                      к сертификации в виде экспертизы исходных кодов.
                    </p>
                  </div>
                </div>
                <ReCAPTCHA
                  // sitekey="6Lezhz0pAAAAAOLSOua8Fq9AFJgJgdQbq2q1Vz29"
                  ref={recaptcha}
                  sitekey={process.env.REACT_APP_SECRET_KEY}
                  onChange={(val) => {
                    setCaptVal(val);
                  }}
                />
                <div className="button-add">
                  <Button
                    type="submit"
                    className="add-btn"
                    onClick={handleSubmit}
                    variant="contained"
                  >
                    <i className="lni lni-upload"></i>Отправить
                  </Button>
                </div>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </>
  ) : (
    <SuccessMessage />
  );
}
