import React, { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import Button from "@mui/material/Button";
import "./main.css";
import "./lineicons.css";
import { FormControl, TextField } from "@mui/material";
import { postRequest, uploadFile } from "../../utils/resquests";
import { Toaster, toast } from "sonner";
import { upload } from "../../utils/API_urls";

export default function ApplyResidents() {
  const [data, setData] = useState({});
  const [value, setValue] = React.useState(null);


  //validate
  const [validate, setValidate] = useState(false);

  // this states used for stroring files
  const [email, setEmail] = useState(null);
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

  // const handleFileInputChange = (fieldName, file) => {
  //   setFileInputs({ ...fileInputs, [fieldName]: file });
  // };

  // const handleTextChange = (event) => {
  //   setTextInput(event.target.value);
  // };
  const handleChangeFile = (type, value) => {
    if ((type == "requirements")) {
      setRequirements(value);
    } else if ((type == "application")) {
      setApplication(value);
    } else if ((type == "constituent_documents")) {
      setConstituentDocuments(value);
    } else if ((type == "description")) {
      setDescription(value);
    } else if ((type == "license")) {
      setLicense(value);
    } else if ((type == "copy_passport")) {
      setCopyPassport(value);
    } else if ((type == "project_description")) {
      setProjectDescription(value);
    } else if ((type == "candidate_application")) {
      setCandidateApplication(value);
    } else if ((type == "business_plan")) {
      setBusinessPlan(value);
    }
  };
  const handleReport = (value, type) => {
    const formData = new FormData();
    formData.append("file", value);
    uploadFile(upload, formData)
      .then((response) => {
        // body.push({ type:response.data.link });
        body[type]=response.data.link
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.message == "Please upload a file") {
          toast.error("Please upload a file");
        } else {
          toast.error("Serverda xatolik.");
        }
      });
  };
  const clearInputs = () => {
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
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const uploadFiles =  async () => {
    body["email"]=email
    handleReport(requirements,"requirements")
    handleReport(application,"application")
    handleReport(constituent_documents,"constituent_documents")
    handleReport(description,"description")
    handleReport(license,"license")
    handleReport(copy_passport,"copy_passport")
    handleReport(project_description,"project_description")
    handleReport(candidate_application,"candidate_application")
    handleReport(business_plan,"business_plan")
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidate(true)
    uploadFiles()
    postRequest("/application_form/create", body)
      .then((response) => {
        toast.success("Muvaffaqiyatli!");
        // handleClose();
        clearInputs()
        // navigate({
        //   pathname: "/user",
        // });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Serverda xatolik.");
      });  
  };

  return (
    <>
      <div className="container-scroller">
        <div className="custom-title-form">
          <div className="card-style-form mb-30">
            <div>
              <h4 className="mb-25 pt-50">
                ЗАЯВКА НА РЕЗИДЕНТСВО В IT-PARK ИННОВАЦИЙ В КИБЕРНЕТИКЕ
              </h4>
            </div>
            <div className="card-style mb-30">
              <div style={{ width: "50%", lineHeight: "10px" }}>
                <h5 className="mb-25">
                  В данной форме представлен полный перечень документов для
                  подачи заявки на резидентство в IT-PARK ИННОВАЦИЙ В
                  КИБЕРНЕТИКЕ *
                </h5>
              </div>
              <FormControl onSubmit={handleSubmit}>
                <div className="apply-resident">
                  <TextField
                    key="input_app"
                    label="Электронная почта"
                    variant="outlined"
                    placeholder="Электронная почта *"
                    className="apply-block"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!(validate&&!email)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Основные требования для получения статуса резидента (Файл для ознакомления №1)"
                    placeholder="Файл *"
                    className="apply-block"
                    value={requirements}
                    onChange={(file) => handleChangeFile("requirements", file)}
                  />
                  {!(validate&&!requirements)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Заявление о регистрации в качестве резидента (Файл №2)"
                    placeholder="Файл *"
                    className="apply-block"
                    value={application}
                    onChange={(file) => handleChangeFile("application", file)}
                  />
                  {!(validate&&!application)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Копии учредительных документов: Устав, Учредительный договор (если учредителей больше одного), Гувохнома."
                    placeholder="Файл *"
                    className="apply-block"
                    value={constituent_documents}
                    onChange={(file) =>
                      handleChangeFile("constituent_documents", file)
                    }
                  />
                  {!(validate&&!constituent_documents)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Описание проекта, предлагаемого для реализации в качестве резидента IТ-парка инноваций в кибернетике (оригинал с живой подписью и печатью)"
                    placeholder="Файл *"
                    className="apply-block"
                    value={description}
                    onChange={(file) => handleChangeFile("description", file)}
                  />
                  {!(validate&&!description)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Копия лицензии или разрешительного документа (при наличии)."
                    placeholder="Файл *"
                    className="apply-block"
                    value={license}
                    onChange={(file) => handleChangeFile("license", file)}
                  />
                  {!(validate&&!license)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Копия приказа на директора и его паспорта"
                    placeholder="Файл *"
                    className="apply-block"
                    value={copy_passport}
                    onChange={(file) => handleChangeFile("copy_passport", file)}
                  />
                  {!(validate&&!copy_passport)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Примерная форма описания проекта (Файл №3)"
                    placeholder="Файл *"
                    value={project_description}
                    className="apply-block"
                    onChange={(file) =>
                      handleChangeFile("project_description", file)
                    }
                  />
                  {!(validate&&!project_description)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Анкета кандидата (Файл №4)"
                    placeholder="Файл *"
                    className="apply-block"
                    value={candidate_application}
                    onChange={(file) =>
                      handleChangeFile("candidate_application", file)
                    }
                  />
                  {!(validate&&!candidate_application)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <MuiFileInput
                    label="Структура бизнес план (Файл №5)"
                    placeholder="Файл *"
                    className="apply-block"
                    value={business_plan}
                    onChange={(file) => handleChangeFile("business_plan", file)}
                  />
                  {!(validate&&!business_plan)?(<></>):(<><div className="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div></>)}
                  <div className="apply-div">
                    <p>
                      Указ президента, где Вы можете ознакомиться с льготами
                      (УП-5099-сон 30.06.2017. О мерах по коренному улучшению
                      условий для развития отрасли информационных технологий в
                      республике)
                      <a href="https://lex.uz/docs/3249654">
                        {" "}
                        https://lex.uz/docs/3249654
                      </a>
                    </p>
                  </div>
                  <div className="apply-div">
                    <p>
                      Закон о кибербезопасности, который был подписан недавно{" "}
                      <br></br>
                      <a href="https://lex.uz/ru/docs/5960609?query=%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C#sr-1 ">
                        {" "}
                        https://lex.uz/ru/docs/5960609?query=%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C#sr-1{" "}
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
                <div className="button-add">
                  <Button type="submit" className="add-btn" onClick={handleSubmit} variant="contained">
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
  );
}
