import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MuiFileInput } from "mui-file-input";
import Button from "@mui/material/Button";
import "./style.css";
import { FormControl, TextField } from "@mui/material";
import { getRequest, postRequest, uploadFile } from "../../utils/resquests";
import { Toaster, toast } from "sonner";
import { upload } from "../../utils/API_urls";
import { UserContext } from "../../context/UserContext";
import { useSearchParams } from "react-router-dom";

export default function IncomingMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get("id"));
  const [data, setData] = useState({});
  const [value, setValue] = React.useState(null);
  const [applications, setApplications] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getRequest(`application_form/getone?id=${id}`)
        .then((response) => {
          setApplications(response?.data?.applications[0]);
        })
        .catch((error) => {
          toast.error("Serverda xatolik");
        });
    }
  }, []);
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

  useEffect(() => {
    localStorage.removeItem("savedEmail");
    setEmail("");
  }, []);

  const uploadFiles = async () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidate(true);
    uploadFiles();
    postRequest("/application_form/create", body)
      .then((response) => {
        toast.success("Muvaffaqiyatli!");
        // handleClose();
        clearInputs();
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
            <div className="card-messages mb-30">
              <FormControl>
                <div className="apply-message">
                  <h5>Название организации:</h5>
                  <p>{applications.company}</p>
                </div>
                <div className="apply-message">
                  <h5>Электронная почта:</h5>
                  <p>{applications.email}</p>
                </div>
                <div className="apply-message">
                  <h5>
                    Основные требования для получения статуса резидента (Файл
                    для ознакомления №1):
                  </h5>
                  <a href={applications.requirements} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>
                    Заявление о регистрации в качестве резидента (Файл №2):
                  </h5>
                  <a href={applications.application} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>
                    Копии учредительных документов: Устав, Учредительный договор
                    (если учредителей больше одного), Гувохнома:
                  </h5>
                  <a href={applications.constituent_documents} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>
                    Описание проекта, предлагаемого для реализации в качестве
                    резидента IТ-парка инноваций в кибернетике (оригинал с живой
                    подписью и печатью):
                  </h5>
                  <a href={applications.description} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>
                    Копия лицензии или разрешительного документа (при наличии):
                  </h5>
                  <a href={applications.license} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>Копия приказа на директора и его паспорта:</h5>
                  <a href={applications.copy_passport} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>Примерная форма описания проекта (Файл №3):</h5>
                  <a href={applications.project_description} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>Анкета кандидата (Файл №4):</h5>
                  <a href={applications.candidate_application} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>Структура бизнес план (Файл №5):</h5>
                  <a href={applications.business_plan} download>
                    Yuklab olish
                  </a>
                </div>
                <div className="apply-message">
                  <h5>Структура бизнес план (Файл №5):</h5>
                  <p>
                  {applications.created_at}
                  </p>
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
