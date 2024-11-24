import { useState } from "react";
import { Form as FormikForm, Formik, FormikHelpers, FieldArray } from "formik";
import { formsValidationSchema } from "../../../utils/validationSchema";
import { FormsData } from "./Forms.types";
import { Alert, Button, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import CustomField from "../../CustomField/CustomField";
import { useFileUpload } from "../../../hooks/useFileUpload";
import FileUploadButton from "../../FileUploadButton/FileUploadButton";

import "./Forms.css";

const FormsForm = ({ onSubmit }: { onSubmit: (values: FormsData) => void }) => {
    const [initialValues, setInitialValues] = useState<FormsData>(initialValuesData);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const { onFileUpload, error } = useFileUpload<FormsData>((json) => {
        setInitialValues(json);
        setIsFormVisible(true);
    });

    const onFormsSubmit = (values: FormsData, { resetForm }: FormikHelpers<FormsData>) => {
        onSubmit(values);
        resetForm();
    };

    const renderForms = () => (
        <Formik initialValues={initialValues} validationSchema={formsValidationSchema} onSubmit={onFormsSubmit}>
            {({ values, errors }) => (
                <>
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="error" className="fixed-alert">
                            В форме есть ошибки!
                        </Alert>
                    )}

                    <FormikForm className="form__wrapper">
                        <div className="forms-form__wrapper">
                            {/* Items Section */}
                            <div>
                                <div className="form__title">
                                    <h3>Items:</h3>
                                </div>

                                <FieldArray name="items">
                                    {({ push: pushItem, remove: removeItem }) => (
                                        <>
                                            {values.items.map((item, itemIndex) => (
                                                <div key={item.id} className="forms-fields__section">
                                                    <div className="field-list__header">
                                                        <h4 className="forms-field__title">Item {itemIndex + 1}</h4>
                                                        <div className="close-btn">
                                                            <IconButton
                                                                onClick={() => removeItem(itemIndex)}
                                                                aria-label="delete-item">
                                                                <CloseOutlined />
                                                            </IconButton>
                                                        </div>
                                                    </div>

                                                    <CustomField
                                                        label="Name"
                                                        id={`name-${itemIndex}`}
                                                        name={`items[${itemIndex}].name`}
                                                    />
                                                    <CustomField
                                                        label="Input type"
                                                        id={`input_type-${itemIndex}`}
                                                        name={`items[${itemIndex}].input_type`}
                                                    />
                                                    <CustomField
                                                        label="Label"
                                                        id={`label-${itemIndex}`}
                                                        name={`items[${itemIndex}].label`}
                                                    />
                                                    <CustomField
                                                        label="Placeholder"
                                                        id={`placeholder-${itemIndex}`}
                                                        name={`items[${itemIndex}].placeholder`}
                                                    />

                                                    {/* Validate object */}
                                                    <h4>Validate block:</h4>
                                                    <div className="forms-fields__section">
                                                        <CustomField
                                                            label="Required"
                                                            id={`required-${itemIndex}`}
                                                            name={`items[${itemIndex}].validate.required`}
                                                            options={[
                                                                { value: true, label: "true" },
                                                                { value: false, label: "false" },
                                                            ]}
                                                            type="radio"
                                                        />

                                                        <CustomField
                                                            label="MinLength"
                                                            id={`minLength-${itemIndex}`}
                                                            name={`items[${itemIndex}].validate.minLength`}
                                                            type="number"
                                                        />

                                                        {/* Pattern object */}
                                                        <h4>Pattern</h4>
                                                        <CustomField
                                                            label="Reg"
                                                            id={`reg-${itemIndex}`}
                                                            name={`items[${itemIndex}].validate.pattern.reg`}
                                                        />
                                                        <CustomField
                                                            label="Message"
                                                            id={`message-${itemIndex}`}
                                                            name={`items[${itemIndex}].validate.pattern.message`}
                                                        />
                                                    </div>

                                                    <CustomField
                                                        label="Grid"
                                                        id={`grid-${itemIndex}`}
                                                        name={`items[${itemIndex}].grid`}
                                                        type="number"
                                                    />
                                                </div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="contained"
                                                sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                onClick={() =>
                                                    pushItem({
                                                        id: Date.now(),
                                                        name: "",
                                                        input_type: "",
                                                        label: "",
                                                        placeholder: "",
                                                        validate: {
                                                            required: true,
                                                            minLength: 2,
                                                            pattern: {
                                                                reg: "",
                                                                message: "",
                                                            },
                                                        },
                                                        grid: 0,
                                                    })
                                                }>
                                                + item
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Title Section */}
                            <FieldArray name="title">
                                {({ push: pushTitle, remove: removeTitle }) => (
                                    <>
                                        <div className="form__title">
                                            <h3>Title:</h3>
                                        </div>
                                        {values.title.map((title, titleIndex) => (
                                            <div key={titleIndex}>
                                                <CustomField
                                                    label={`Title ${titleIndex + 1}:`}
                                                    id={`title-${titleIndex}`}
                                                    name={`title[${titleIndex}]`}
                                                    onRemove={() => removeTitle(titleIndex)}
                                                    type="textarea"
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="contained"
                                            sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                            onClick={() => pushTitle("")}>
                                            + title
                                        </Button>
                                    </>
                                )}
                            </FieldArray>

                            {/* Buttons Section */}
                            <div>
                                <div className="form__title">
                                    <h3>Buttons:</h3>
                                </div>

                                <CustomField label="next" id="buttons-next" name={`buttons.next`} />
                                <CustomField label="prev" id="buttons-prev" name={`buttons.prev`} />
                                <CustomField label="finish" id="buttons-finish" name={`buttons.finish`} />
                            </div>

                            {/* Errors Section */}
                            <div>
                                <div className="form__title">
                                    <h3>Errors:</h3>
                                </div>

                                <CustomField label="required" id="errors-required" name={`errors.required`} />
                                <CustomField label="min" id="errors-min" name={`errors.min`} />
                                <CustomField label="max" id="errors-max" name={`errors.max`} />
                                <CustomField label="minLength" id="errors-minLength" name={`errors.minLength`} />
                                <CustomField label="maxLength" id="errors-maxLength" name={`errors.maxLength`} />
                                <CustomField label="pattern" id="errors-pattern" name={`errors.pattern`} />
                            </div>

                            {/* Range Section */}
                            <div>
                                <div className="form__title">
                                    <h3>Range:</h3>
                                </div>

                                <CustomField label="title" id="range-title" name={`range.title`} />
                                <CustomField label="description" id="range-description" name={`range.description`} />
                            </div>

                            <CustomField label="stepsLength" id="stepsLength" name="stepsLength" type="number" />
                        </div>

                        <div className="json-btn">
                            <Button type="submit" variant="contained" color="warning" fullWidth>
                                сгенерировать JSON
                            </Button>
                        </div>
                    </FormikForm>
                </>
            )}
        </Formik>
    );

    return (
        <div>
            <div className="tab__content-title">
                <h3>Forms:</h3>
            </div>

            {error && <Alert severity="error">{error}</Alert>}
            {isFormVisible ? renderForms() : <FileUploadButton fileName="forms" onFileUpload={onFileUpload} />}
        </div>
    );
};

export default FormsForm;

const initialValuesData: FormsData = {
    items: [
        {
            id: 1,
            name: "first_name",
            input_type: "text",
            label: "Имя",
            placeholder: "Имя",
            validate: {
                required: true,
                minLength: 2,
                pattern: {
                    reg: "/^[a-zA-Za-zA]+$/i",
                    message: "Имя может содержать только английские и русские буквы",
                },
            },
            grid: 2,
        },
    ],
    title: ["Регистрация", "", "", ""],
    buttons: {
        next: "Продолжить",
        prev: "Продолжить",
        finish: "Продолжить",
    },
    errors: {
        required: "Это поле обязательно к заполнению.",
        min: "Hodnota musí být větší",
        max: "Vyberte hodnotu nižší",
        minLength: "Должно быть не меньше 2-х символов.",
        maxLength: "Слишком длинное слово.",
        pattern: "Неправильный формат.",
    },
    range: {
        title: "Деньги уже почти ваши",
        description: "Кредит за 10 минут",
    },
    stepsLength: 1,
};
