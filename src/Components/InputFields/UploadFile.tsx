import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface InputProps {
    multipleUpload?: boolean;
    styles?: any;
    formik?: any;
    name: string;
    handleUpload: (event: any) => void
}

export const InputFileUpload: React.FC<InputProps> = ({ formik = {}, handleUpload, multipleUpload = false, name, styles = {} }) => {
    const formikErrors: any = formik?.errors;
    const formikTouched: any = formik?.touched;
    const errors: any = formikErrors && formikErrors[name];
    const touched: any = formikTouched && formikTouched[name];

    return (
        <label id='upload' style={{ ...styles }}>
            <CloudUploadIcon />
            <VisuallyHiddenInput
                type="file"
                name={name}
                onChange={(event) => handleUpload(event.target.files)}
                multiple={multipleUpload}
                accept='image/png, image/jpeg, image/jpg'
            />
            {touched && errors && <p className=" text-md mt-1 text-red-300 font-semibold tracking-wider">{errors}</p>}
        </label>
    );
}
