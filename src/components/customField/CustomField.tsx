import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import CheckboxInput from "./CheckboxInput";
import NumberInput from "./NumberInput";
import RadioGroupInput from "./RadioGroupInput";
import DateInput from "./DateInput";

import { CustomFieldProps } from "./CustomField.types";
import { ErrorMessage } from "formik";
import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

import "./CustomField.css";

const CustomField = (props: CustomFieldProps) => {
    const { label, id, name, type = "text", options, onRemove } = props;

    return (
        <div className="custom-field-wrapper">
            <label htmlFor={id} className="custom-field__label">
                {label}
            </label>
            <div className="custom-field__input">
                <div className="custom-field__input-container">
                    {type === "text" && <TextInput id={id} name={name} />}
                    {type === "textarea" && <TextareaInput id={id} name={name} />}
                    {type === "checkbox" && <CheckboxInput id={id} name={name} label={label} />}
                    {type === "number" && <NumberInput id={id} name={name} />}
                    {type === "radio" && options && <RadioGroupInput id={id} name={name} options={options} />}
                    {type === "date" && <DateInput id={id} name={name} />}

                    {/* Удаление поля */}
                    {onRemove && (
                        <div className="custom-field__basket">
                            <IconButton onClick={onRemove} color="error" aria-label="delete-field">
                                <DeleteRounded />
                            </IconButton>
                        </div>
                    )}
                </div>

                <div className="custom-field__error">
                    <ErrorMessage name={name} component="div" />
                </div>
            </div>
        </div>
    );
};

export default CustomField;
