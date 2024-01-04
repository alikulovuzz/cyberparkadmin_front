import React, { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import Button from '@mui/material/Button';
import { FormControl, TextField } from '@mui/material';
import './style.css'

export default function AccessDeny() {
    return (
        <div className="container-success">
            <div class="lock"></div>
            <div class="message">
                <h1>Ushbu sahifaga kirish cheklangan</h1>
                <p>Agar buni xato deb hisoblasangiz, sayt administratoriga murojaat qiling.</p>
            </div>
        </div>
    );
}
