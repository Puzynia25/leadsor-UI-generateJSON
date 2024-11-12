import { Tag, Settings, Data, Offers } from "./OffersForm.types";
import { Formik, Form, FieldArray, FormikHelpers, Field } from "formik";
import { Button, IconButton, Radio, FormControl } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { offerValidationSchema } from "../../../utils/validationSchema";
import CustomField from "../../customField/CustomField";

import "./OffersForm.css";

const OffersForm = ({ onSubmit }: { onSubmit: (values: Offers) => void }) => {
    const onOffersSubmit = (values: Offers, { resetForm }: FormikHelpers<Offers>) => {
        const formData = (list: Data[]): Data[] => {
            return list.map((item) => {
                const { isBestOffer, ...rest } = item;
                return isBestOffer === "true"
                    ? { ...rest, isBestOffer: true } // Добавить поле, если оно `true`
                    : rest; // Удалить поле, если оно `false`
            });
        };

        const formTags = (list: Tag[]): Tag[] => {
            return list.map((tag) => ({
                id: tag.id,
                name: tag.name || "",
            }));
        };

        const formattedValues: Offers = {
            data: formData(values.data),
            tags: formTags(values.tags),
            settings: values.settings,
        };

        onSubmit(formattedValues);
        resetForm();
    };

    return (
        <>
            <div className="tab__content-title">
                <h3>Offers:</h3>
            </div>

            <Formik initialValues={initialValues} validationSchema={offerValidationSchema} onSubmit={onOffersSubmit}>
                {({ values }) => (
                    <Form className="form__wrapper">
                        <div className="offers-form__wrapper">
                            {/* Data Section */}
                            <div className="form__title">
                                <h3>Data</h3>
                            </div>
                            <FieldArray name="data">
                                {({ push: pushData, remove: removeData }) => (
                                    <>
                                        {values.data.map((dataItem, dataIndex) => (
                                            <div key={dataItem.id}>
                                                <div className="data-header">
                                                    <h4>Data {dataIndex + 1}:</h4>
                                                    <div>
                                                        <IconButton
                                                            onClick={() => removeData(dataIndex)}
                                                            color="error"
                                                            aria-label="delete-description">
                                                            <DeleteRounded />
                                                        </IconButton>
                                                    </div>
                                                </div>

                                                <CustomField
                                                    label="Title"
                                                    id={`title-${dataIndex}`}
                                                    name={`data[${dataIndex}].title`}
                                                />

                                                <CustomField
                                                    label="Money"
                                                    id={`money-${dataIndex}`}
                                                    name={`data[${dataIndex}].money`}
                                                />

                                                <CustomField
                                                    label="Image URL"
                                                    id={`img-${dataIndex}`}
                                                    name={`data[${dataIndex}].img`}
                                                />

                                                <CustomField
                                                    label="Term"
                                                    id={`term-${dataIndex}`}
                                                    name={`data[${dataIndex}].term`}
                                                />

                                                <CustomField
                                                    label="Link"
                                                    id={`link-${dataIndex}`}
                                                    name={`data[${dataIndex}].link`}
                                                />

                                                <CustomField
                                                    label="Tag ID"
                                                    id={`tagId-${dataIndex}`}
                                                    name={`data[${dataIndex}].tagId`}
                                                    type="number"
                                                />
                                                <FormControl>
                                                    <label
                                                        htmlFor={`isBestOffer-${dataIndex}`}
                                                        className="custom-field__label">
                                                        Best Offer
                                                    </label>
                                                    <div
                                                        role="group"
                                                        aria-labelledby={`isBestOffer-${dataIndex}`}
                                                        className="field-radio__wrapper">
                                                        <div>
                                                            <label>
                                                                <Field
                                                                    type="radio"
                                                                    name={`data[${dataIndex}].isBestOffer`}
                                                                    value="true"
                                                                    as={Radio}
                                                                />
                                                                true
                                                            </label>
                                                        </div>

                                                        <div>
                                                            <label>
                                                                <Field
                                                                    type="radio"
                                                                    name={`data[${dataIndex}].isBestOffer`}
                                                                    value="false"
                                                                    as={Radio}
                                                                />
                                                                false
                                                            </label>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            </div>
                                        ))}

                                        <div className="add-offer-btn">
                                            <Button
                                                type="button"
                                                variant="contained"
                                                sx={{ bgcolor: "#2e2e2e" }}
                                                onClick={() =>
                                                    pushData({
                                                        ...initialOfferData,
                                                        id: Date.now(),
                                                    })
                                                }>
                                                + offer
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </FieldArray>

                            {/* Tags Section */}
                            <div className="form__title">
                                <h3>Tags</h3>
                            </div>
                            <FieldArray name="tags">
                                {({ push: pushTag, remove: removeTag }) => (
                                    <>
                                        {values.tags.map((tag, tagIndex) => (
                                            <div key={tag.id}>
                                                <h4>Tag {tagIndex + 1}:</h4>
                                                <div>
                                                    <CustomField
                                                        label="Name"
                                                        id={`name-${tagIndex}`}
                                                        name={`tags[${tagIndex}].name`}
                                                        remove={true}
                                                        onRemove={() => removeTag(tagIndex)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className="add-offer-btn">
                                            <Button
                                                type="button"
                                                variant="contained"
                                                sx={{ bgcolor: "#2e2e2e" }}
                                                onClick={() =>
                                                    pushTag({
                                                        ...initialTag,
                                                        id: Date.now(),
                                                    })
                                                }>
                                                + tag
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </FieldArray>

                            {/* Settings Section */}
                            <div className="">
                                <div className="form__title">
                                    <h3>Settings</h3>
                                </div>

                                <CustomField
                                    label="Range Money Title"
                                    id="settings-rangeMoney-title"
                                    name={`settings.rangeMoney.title`}
                                />
                                <CustomField
                                    label="Currency"
                                    id="settings-currency"
                                    name={`settings.rangeMoney.currency`}
                                />
                                <CustomField label="Link Text" id="settings-linkText" name={`settings.linkText`} />
                                <CustomField
                                    label="Cookie Expires Days"
                                    id="settings-cookieExpiresDays"
                                    name={`settings.cookieExpiresDays`}
                                    type="number"
                                />
                                <CustomField label="Title" id="settings-title" name={`settings.title`} />
                                <CustomField label="Subtitle" id="settings-subtitle" name={`settings.subtitle`} />
                                <CustomField label="Logo URL" id="settings-logo" name={`settings.logo`} />
                            </div>
                        </div>
                        <div className="json-btn">
                            <Button type="submit" variant="contained" color="warning" fullWidth>
                                сгенерировать JSON
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default OffersForm;

const initialOfferData: Data = {
    id: Date.now(),
    title: "",
    money: "",
    img: "",
    term: "",
    link: "",
    tagId: [],
    isBestOffer: false,
};

const initialSettings: Settings = {
    rangeMoney: { title: "", currency: "" },
    linkText: "",
    cookieExpiresDays: 0,
    title: "",
    subtitle: "",
    logo: "",
};

const initialTag: Tag = {
    id: Date.now(),
    name: "",
};

const initialValues: Offers = {
    data: [initialOfferData],
    tags: [initialTag],
    settings: initialSettings,
};
