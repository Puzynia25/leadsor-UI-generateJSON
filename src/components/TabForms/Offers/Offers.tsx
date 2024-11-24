import { useCallback, useState } from "react";
import { Tag, Settings, Data, OffersData } from "./Offers.types";
import { Formik, Form, FieldArray, FormikHelpers } from "formik";
import { Button, IconButton, Alert } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { offerValidationSchema } from "../../../utils/validationSchema";
import { useFileUpload } from "../../../hooks/useFileUpload";

import CustomField from "../../CustomField/CustomField";
import FileUploadButton from "../../FileUploadButton/FileUploadButton";
import ImageUploadField from "../../ImageUploadField/ImageUploadField";

import "./Offers.css";

const OffersForm = ({
    onSubmit,
    selectedCountry,
}: {
    onSubmit: (values: OffersData) => void;
    selectedCountry: string;
}) => {
    const [initialValues, setInitialValues] = useState<OffersData>(initialValuesData);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const onOffersSubmit = (values: OffersData, { resetForm }: FormikHelpers<OffersData>) => {
        onSubmit(values);
        resetForm();
    };

    const { onFileUpload, error } = useFileUpload<OffersData>((json) => {
        setInitialValues(json);
        setIsFormVisible(true);
    });

    const uploadImageToServer = useCallback(
        async (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const fakeServerUrl = `https://conf.leadsor.com/${selectedCountry}/img/${file.name}`;
                    console.log(`Загружено на ${fakeServerUrl}`);
                    resolve(fakeServerUrl);
                }, 2000); // Имитация задержки
            });
        },
        [selectedCountry]
    );

    const renderOffersForm = () => (
        <Formik initialValues={initialValues} validationSchema={offerValidationSchema} onSubmit={onOffersSubmit}>
            {({ values, errors }) => (
                <>
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="error" className="fixed-alert">
                            В форме есть ошибки!
                        </Alert>
                    )}

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

                                                <ImageUploadField
                                                    name={`data[${dataIndex}].img`}
                                                    onImageUpload={async (file) => {
                                                        const imageUrl = await uploadImageToServer(file);
                                                        // Устанавливаем URL изображения в поле img
                                                        values.data[dataIndex].img = imageUrl;
                                                        return imageUrl;
                                                    }}
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

                                                <CustomField
                                                    label="Is Best Offer?"
                                                    id={`isBestOffer-${dataIndex}`}
                                                    name={`data[${dataIndex}].isBestOffer`}
                                                    options={[
                                                        { value: true, label: "true" },
                                                        { value: false, label: "false" },
                                                    ]}
                                                    type="radio"
                                                />
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
                                                        id: Date.now(),
                                                        name: "",
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
                </>
            )}
        </Formik>
    );

    return (
        <>
            <div className="tab__content-title">
                <h3>Offers:</h3>
            </div>

            {error && <Alert severity="error">{error}</Alert>}
            {isFormVisible ? renderOffersForm() : <FileUploadButton fileName="offers" onFileUpload={onFileUpload} />}
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

const initialValuesData: OffersData = {
    data: [initialOfferData],
    tags: [initialTag],
    settings: initialSettings,
};
