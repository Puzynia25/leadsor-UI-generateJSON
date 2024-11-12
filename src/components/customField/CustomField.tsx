import { IconButton, TextareaAutosize, TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { CustomFieldProps } from "./CustomField.types";

import "./CustomField.css";
import { DeleteRounded } from "@mui/icons-material";

const CustomField = ({
    label,
    id,
    name,
    type = "text",
    multiline = false,
    remove = false,
    onRemove = () => {},
}: CustomFieldProps) => {
    return (
        <div className="custom-field-wrapper">
            <label htmlFor={id} className="custom-field__label">
                {label}
            </label>
            <div className="custom-field__input">
                <div className="custom-field__input-container">
                    {multiline ? (
                        <Field
                            as={TextareaAutosize}
                            id={id}
                            name={name}
                            minRows={3}
                            style={{ resize: "vertical", width: "100%" }}
                        />
                    ) : (
                        <Field
                            as={TextField}
                            id={id}
                            name={name}
                            type={type}
                            style={{ resize: "vertical", width: "100%" }}
                        />
                    )}

                    <ErrorMessage name={name} component="div" className="error-message" />
                </div>

                {remove ? (
                    <div>
                        <IconButton onClick={onRemove} color="error" aria-label="delete-field">
                            <DeleteRounded />
                        </IconButton>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CustomField;
