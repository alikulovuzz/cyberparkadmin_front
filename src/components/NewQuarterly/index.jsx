import React from "react";
export default function NewQuarterly() {

  return (
    // <div className="main-panel report">
    //   <div className="content-wrapper">
    //     <div class="container-fluid">
    //       <div class="title-wrapper">
    //         <div class="row align-items-center">
    //           <div class="col-md-6">
              
    //           </div>
    //         </div>
    //       </div>
    //       <div class="form-elements-wrapper">
    //         <div class="row">
    //           <div class="col-lg-12 custom-title">
    //             <div class="card-style mb-30">
    //               <h4 class="mb-25">Отчетный период</h4>
    //               <div class="select-style-1">
    //                 <div class="select-div">
    //                   <label>Год</label>
    //                   <div class="select-position">
    //                     <select onChange={handleChangeYear}>
    //                       {yearList.map((elem) => {
    //                         return (
    //                           <option value={elem.value}>
    //                             {elem.year_name}
    //                           </option>
    //                         );
    //                       })}
    //                     </select>
    //                   </div>
    //                 </div>
    //                 <div class="select-div">
    //                   <label>Квартал</label>
    //                   <div class="select-position">
    //                     <select onChange={handleChange}>
    //                       <option value="first">1</option>
    //                       <option value="second">2</option>
    //                       <option value="third">3</option>
    //                       <option value="fourth">4</option>
    //                     </select>
    //                   </div>
    //                 </div>
    //                 <div class="select-div">
    //                   <label>Плательщик НДФЛ</label>
    //                   <div class="select-position">
    //                     <select onChange={handleChangeRefs}>
    //                       <option value="Yo'q">Нет</option>
    //                       <option value="Ha">Да</option>
    //                     </select>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <PartOne
    //               setReleaseProduct={(val) => {
    //                 // console.log(val);
    //                 setReleaseProduct(val);
    //               }}
    //               validateProduct={validateProduct}
    //             />
    //             <PartTwo
    //               setReleaseRepublic={(val) => {
    //                 // console.log(val);
    //                 setReleaseRepublic(val);
    //               }}
    //             />
    //             <PartThree
    //               setInvesment={(val) => {
    //                 // console.log(val);
    //                 setInvesment(val);
    //               }}
    //             />
    //             <PartFour
    //               setResidentalPayroll={(val) => {
    //                 // console.log(val);
    //                 setResidentalPayroll(val);
    //               }}
    //               validateResidentalPayroll={residentalPayroll}
    //             />
    //             <PartFive
    //               setImportFunds={(val) => {
    //                 // console.log(val);
    //                 setImportFunds(val);
    //               }}
    //             />
    //             <div class="card-style mb-30">
    //               <h4 class="mb-25">Дополнительный отчет *</h4>
    //               <form ref={formRef}>
    //                 {!addRefs ? (
    //                   <div>
    //                     <MuiFileInput
    //                       sx={{
    //                         mx: 1,
    //                         my: 1,
    //                         display: "inline-grid",
    //                         width: "auto",
    //                         height: "auto",
    //                       }}
    //                       value={aylanmaSoliq}
    //                       label="НДС"
    //                       onChange={handleChangeAylanmaSoliq}
    //                       placeholder="Файл *"
    //                       disabled={formValid}
    //                     // required
    //                     />
    //                     <MuiFileInput
    //                       sx={{
    //                         mx: 1,
    //                         my: 1,
    //                         display: "inline-grid",
    //                         width: "auto",
    //                         height: "auto",
    //                       }}
    //                       value={jisDaromadSoliq}
    //                       label="Налог на прибыль с физических лиц"
    //                       onChange={handleChangeJisDaromadSoliq}
    //                       placeholder="Файл *"
    //                       disabled={formValid}
    //                     // required
    //                     />
    //                   </div>
    //                 ) : (
    //                   <div>
    //                     <MuiFileInput
    //                       sx={{
    //                         mx: 1,
    //                         my: 1,
    //                         display: "inline-grid",
    //                         width: "auto",
    //                         height: "auto",
    //                       }}
    //                       label="НДС"
    //                       value={kksSoliq}
    //                       onChange={handleChangeKksSoliq}
    //                       disabled={formValid}
    //                       placeholder="Файл *"
    //                     />
    //                     <MuiFileInput
    //                       sx={{
    //                         mx: 1,
    //                         my: 1,
    //                         display: "inline-grid",
    //                         width: "auto",
    //                         height: "auto",
    //                       }}
    //                       label="Налог на прибыль юридических лиц"
    //                       disabled={formValid}
    //                       value={daromadSoliq}
    //                       onChange={handleChangeDaromadSoliq}
    //                       placeholder="Файл *"
    //                     />
    //                     <MuiFileInput
    //                       sx={{
    //                         mx: 1,
    //                         my: 1,
    //                         display: "inline-grid",
    //                         width: "auto",
    //                         height: "auto",
    //                       }}
    //                       label="Налог на доходы физических лиц"
    //                       disabled={formValid}
    //                       value={jisDaromadSoliq}
    //                       onChange={handleChangeJisDaromadSoliq}
    //                       placeholder="Файл *"
    //                     />
    //                   </div>
    //                 )}
    //                 {validateRefs ? (
    //                   <></>
    //                 ) : (
    //                   <div class="warn-file">Пожалуйста, заполните вышеуказанные файлы...</div>
    //                 )}

    //                 <div class="button-add">
    //                   <Button class="save-btn" variant="contained" onClick={formRefSend}>
    //                   <i class="lni lni-save"></i>Сохранять
    //                   </Button>
    //                 </div>
    //               </form>
    //             </div>
    //             <div class="card-style mb-30">
    //               <h4 class="mb-25">Отправить отчет</h4>
    //               <div class="button-add">
    //                 <button class="save-btn" onClick={handleOpen}>
    //                   <i class="lni lni-upload"></i>Отправить
    //                 </button>
    //               </div>
    //             </div>

    //             <Dialog
    //               open={open}
    //               TransitionComponent={Transition}
    //               keepMounted
    //               onClose={handleClose}
    //               aria-describedby="alert-dialog-slide-description"
    //             >
    //               <DialogTitle>
    //                 {"Hisobotni yuborishni tasdiqlaysizmi?"}
    //               </DialogTitle>
    //               <DialogActions>
    //                 <Button onClick={handleClose}>Нет</Button>
    //                 <Button onClick={commitData}>Да</Button>
    //               </DialogActions>
    //             </Dialog>
    //             <Toaster richColors position="bottom-right" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>salom</div>
  );
}
