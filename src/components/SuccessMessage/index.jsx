import React, { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import Button from '@mui/material/Button';
import { FormControl, TextField } from '@mui/material';
import './style.css'

export default function SuccessMessage() {
    const [fileInputs, setFileInputs] = useState({
        nds: null,
        profitTaxIndividuals: null,
        profitTaxLegalEntities: null,
        incomeTax: null,
    });



    return (
        <div className="container-success">
            <div className="card-style-form">
                <div className="card-success">
                    <div className='card-success-div'>
                        <div className='block-check'>
                            <i className="checkmark">✓</i>
                        </div>
                        <h1 className='success-h1'>Ваша заявка принята.</h1>
                        <p>Мы скоро свяжемся с вами!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
