import { TextareaAutosize, TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { CustomFieldProps } from "./CustomField.types";

import "./CustomField.css";

const CustomField = ({ label, id, name, type = "text", multiline = false }: CustomFieldProps) => {
    return (
        <div className="field__wrapper">
            <label htmlFor={id} className="field__label">
                {label}
            </label>
            {multiline ? (
                <Field as={TextareaAutosize} name={name} minRows={3} style={{ width: "100%", resize: "vertical" }} />
            ) : (
                <Field as={TextField} id={id} name={name} type={type} />
            )}

            <ErrorMessage name={name} component="div" className="error-message" />
        </div>
    );
};

export default CustomField;
