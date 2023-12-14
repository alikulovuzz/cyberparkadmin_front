import React, { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import Button from '@mui/material/Button';
import './main.css'
import './lineicons.css'
import { FormControl, TextField } from '@mui/material';


export default function ApplyResidents() {
  const [fileInputs, setFileInputs] = useState({
    nds: null,
    profitTaxIndividuals: null,
    profitTaxLegalEntities: null,
    incomeTax: null,
  });

  const [textInput, setTextInput] = useState('');
  const [email, setEmail] = useState('');

  const handleFileInputChange = (fieldName, file) => {
    setFileInputs({ ...fileInputs, [fieldName]: file });
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle form submission, for example:
    // You can use FormData to prepare form data for file uploads
    const formData = new FormData();
    formData.append('nds', fileInputs.nds);
    formData.append('profitTaxIndividuals', fileInputs.profitTaxIndividuals);
    formData.append('profitTaxLegalEntities', fileInputs.profitTaxLegalEntities);
    formData.append('incomeTax', fileInputs.incomeTax);
    formData.append('textEntry', textInput);
    formData.append('email', email);

    // Perform your submission logic here, like sending formData to your backend
    console.log('Form Data:', formData);
    // Example: You can use fetch or axios to send this formData to a server
    // fetch('your-endpoint', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));
  };

  return (
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
              <h5 className="mb-25">В данной форме представлен полный перечень документов для подачи заявки на резидентство в IT-PARK ИННОВАЦИЙ В КИБЕРНЕТИКЕ *</h5>
            </div>
            <FormControl onSubmit={handleSubmit}>
              <div className='apply-resident'>
                <TextField
                  label="Электронная почта"
                  variant="outlined"
                  placeholder="Электронная почта *"
                  // value={email}
                  className='apply-block'
                  onChange={handleEmailChange}
                />
                <MuiFileInput
                  label="Основные требования для получения статуса резидента (Файл для ознакомления №1)"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('nds', file)}
                />
                <MuiFileInput
                  label="Заявление о регистрации в качестве резидента (Файл №2)"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) =>
                    handleFileInputChange('profitTaxIndividuals', file)
                  }
                />
                <MuiFileInput
                  label="Копии учредительных документов: Устав, Учредительный договор (если учредителей больше одного), Гувохнома."
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) =>
                    handleFileInputChange('profitTaxLegalEntities', file)
                  }
                />
                <MuiFileInput
                  label="Описание проекта, предлагаемого для реализации в качестве резидента IТ-парка инноваций в кибернетике (оригинал с живой подписью и печатью)"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('incomeTax', file)}
                />
                <MuiFileInput
                  label="Копия лицензии или разрешительного документа (при наличии)."
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('incomeTax', file)}
                />
                <MuiFileInput
                  label="Копия приказа на директора и его паспорта"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('incomeTax', file)}
                />
                <MuiFileInput
                  label="Примерная форма описания проекта (Файл №3)"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('incomeTax', file)}
                />
                <MuiFileInput
                  label="Анкета кандидата (Файл №4)"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('incomeTax', file)}
                /><MuiFileInput
                  label="Структура бизнес план (Файл №5)"
                  placeholder="Файл *"
                  className='apply-block'
                  onChange={(file) => handleFileInputChange('incomeTax', file)}
                />
                <div className='apply-div'>
                  <p>
                    Указ президента, где Вы можете ознакомиться с льготами (УП-5099-сон 30.06.2017. О мерах по коренному улучшению условий для развития отрасли информационных технологий в республике)
                    <a href="https://lex.uz/docs/3249654"> https://lex.uz/docs/3249654</a>
                  </p>
                </div>
                <div className='apply-div'>
                  <p>
                    Закон о кибербезопасности, который был подписан недавно <br></br>
                    <a href="https://lex.uz/ru/docs/5960609?query=%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C#sr-1 "> https://lex.uz/ru/docs/5960609?query=%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C#sr-1 </a>
                  </p>
                </div>
                <div className='apply-div'>
                  <p>
                    Если Вам нужно будет проходить сертификацию в Центре Кибербезопасности, то для наших резидентов есть льготы в этом плане. Мы предоставляем резидентам услугу подготовки к сертификации в виде экспертизы исходных кодов.
                  </p>
                </div>
              </div>
              <div className="warn-file">
                Пожалуйста, заполните вышеуказанные файлы...
              </div>
              <div className="button-add">
                <Button
                  type="submit"
                  className="add-btn"
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
  );
}
