import { General } from "./General.types";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { generalValidationSchema } from "../../../utils/validationSchema";
import CustomField from "../../CustomField/CustomField";
import { Alert, Button, IconButton, OutlinedInput, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

import "./General.css";

const GeneralForm = ({ onSubmit }: { onSubmit: (values: General) => void }) => {
    const onOffersSubmit = (values: General, { resetForm }: FormikHelpers<General>) => {
        const formattedValues: General = values;

        onSubmit(formattedValues);
        resetForm();
    };

    return (
        <>
            <div className="tab__content-title">
                <h3>General:</h3>
            </div>

            <Formik initialValues={initialValues} validationSchema={generalValidationSchema} onSubmit={onOffersSubmit}>
                {({ values, errors }) => (
                    <>
                        {Object.keys(errors).length > 0 && (
                            <Alert severity="error" className="fixed-alert">
                                В форме есть ошибки!
                            </Alert>
                        )}

                        <Form className="form__wrapper">
                            <div className="general-form__wrapper">
                                {/* Common Section */}
                                <div className="form__title">
                                    <h3>Common</h3>
                                </div>

                                <CustomField
                                    label="Primary Button Text"
                                    id="common-primaryButtonText"
                                    name={`common.primaryButtonText`}
                                />

                                {/* rangeData object */}
                                <h4>Range:</h4>
                                <div className="general-fields__section">
                                    {/* Summa Fields */}
                                    <div className="rangeData__group">
                                        <h5 className="general-field__title">Summa:</h5>

                                        <CustomField
                                            label="min"
                                            id="common-rangeData-summa-min"
                                            name={`common.rangeData.summa.min`}
                                            type="number"
                                        />
                                        <CustomField
                                            label="max"
                                            id="common-rangeData-summa-max"
                                            name={`common.rangeData.summa.max`}
                                            type="number"
                                        />
                                        <CustomField
                                            label="Step"
                                            id="common-rangeData-summa-step"
                                            name={`common.rangeData.summa.step`}
                                            type="number"
                                        />

                                        <CustomField
                                            label="Currency"
                                            id="common-rangeData-summa-currency"
                                            name={`common.rangeData.summa.currency`}
                                        />
                                        <CustomField
                                            label="First Value"
                                            id="common-rangeData-summa-firstValue"
                                            name={`common.rangeData.summa.firstValue`}
                                            type="number"
                                        />
                                        <CustomField
                                            label="Name"
                                            id="common-rangeData-summa-name"
                                            name={`common.rangeData.summa.name`}
                                        />
                                    </div>

                                    {/* Period Fields */}
                                    <div className="rangeData__group">
                                        <h5 className="general-field__title">Period:</h5>
                                        <div className="rangeData__fields">
                                            <div className="rangeData__column">
                                                <CustomField
                                                    label="min"
                                                    id="common-rangeData-period-min"
                                                    name={`common.rangeData.period.min`}
                                                    type="number"
                                                />
                                                <CustomField
                                                    label="max"
                                                    id="common-rangeData-period-max"
                                                    name={`common.rangeData.period.max`}
                                                    type="number"
                                                />
                                                <CustomField
                                                    label="Step"
                                                    id="common-rangeData-period-step"
                                                    name={`common.rangeData.period.step`}
                                                    type="number"
                                                />
                                            </div>
                                            <div className="rangeData__column">
                                                <CustomField
                                                    label="Currency"
                                                    id="common-rangeData-period-currency"
                                                    name={`common.rangeData.period.currency`}
                                                />
                                                <CustomField
                                                    label="First Value"
                                                    id="common-rangeData-period-firstValue"
                                                    name={`common.rangeData.period.firstValue`}
                                                    type="number"
                                                />
                                                <CustomField
                                                    label="Name"
                                                    id="common-rangeData-period-name"
                                                    name={`common.rangeData.period.name`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Steps array */}
                                <FieldArray name={`common.steps`}>
                                    {({ push: pushStep, remove: removeStep }) => (
                                        <>
                                            {values.common.steps.map((step, stepIndex) => (
                                                <div key={stepIndex}>
                                                    <CustomField
                                                        label={`Step ${stepIndex + 1}:`}
                                                        id={`step-${stepIndex}`}
                                                        name={`common.steps[${stepIndex}]`}
                                                        onRemove={() => removeStep(stepIndex)}
                                                        type="textarea"
                                                    />
                                                </div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="contained"
                                                sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                onClick={() => pushStep("")}>
                                                + step
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>

                                {/* Header Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Header</h3>
                                    </div>

                                    <CustomField label="Logo" id="header-logo" name={`header.logo`} />
                                    <FieldArray name="header.links">
                                        {({ remove: removeLink, push: pushLink }) => (
                                            <div>
                                                <h4>Links:</h4>
                                                {values.header.links.map((link, linkIndex) => (
                                                    <div key={linkIndex} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Link {linkIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeLink(linkIndex)}
                                                                    aria-label="delete-link">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <CustomField
                                                            label="Name"
                                                            id={`name-${linkIndex}`}
                                                            name={`header.links[${linkIndex}].name`}
                                                        />
                                                        <CustomField
                                                            label="Link"
                                                            id={`link-${linkIndex}`}
                                                            name={`header.links[${linkIndex}].link`}
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e" }}
                                                    onClick={() => pushLink({ id: Date.now(), name: "", link: "" })}>
                                                    + link
                                                </Button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>

                                {/* Main Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Main</h3>
                                    </div>
                                    <CustomField label="Title" id="main-title" name={`main.title`} />

                                    {/* Description array */}
                                    <FieldArray name={`main.description`}>
                                        {({ push: pushDesc, remove: removeDesc }) => (
                                            <>
                                                {values.main.description.map((desc, descIndex) => (
                                                    <div key={descIndex}>
                                                        <CustomField
                                                            label={`Description ${descIndex + 1}:`}
                                                            id={`description-${descIndex}`}
                                                            name={`main.description[${descIndex}]`}
                                                            onRemove={() => removeDesc(descIndex)}
                                                            type="textarea"
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushDesc("")}>
                                                    + description
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>

                                    <h4>Image</h4>
                                    <div className="general-fields__section">
                                        <CustomField label="Url" id="main-img-url" name={`main.img.url`} />
                                        <CustomField label="Alt" id="main-img-alt" name={`main.img.alt`} />
                                    </div>

                                    <h4>Range Block</h4>
                                    <div className="general-fields__section">
                                        <CustomField
                                            label="Title"
                                            id="main-rangeBlock-title"
                                            name={`main.rangeBlock.title`}
                                        />
                                        <CustomField
                                            label="Description"
                                            id="main-rangeBlock-description"
                                            name={`main.rangeBlock.description`}
                                        />
                                        <CustomField
                                            label="Value"
                                            id="main-rangeBlock-value"
                                            name={`main.rangeBlock.value`}
                                        />
                                        <CustomField
                                            label="Period"
                                            id="main-rangeBlock-period"
                                            name={`main.rangeBlock.period`}
                                        />
                                        <CustomField
                                            label="Return"
                                            id="main-rangeBlock-return"
                                            name={`main.rangeBlock.return`}
                                        />
                                        <CustomField
                                            label="Date"
                                            id="main-rangeBlock-date"
                                            name={`main.rangeBlock.date`}
                                        />
                                    </div>

                                    <h4>Answer Block:</h4>
                                    <FieldArray name={`main.answerBlock`}>
                                        {({ push: pushAnswer, remove: removeAnswer }) => (
                                            <>
                                                {values.main.answerBlock.map((answer, answerIndex) => (
                                                    <div key={answer.id} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Answer {answerIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeAnswer(answerIndex)}
                                                                    aria-label="delete-answer">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <CustomField
                                                            label="Title"
                                                            id={`title-${answerIndex}`}
                                                            name={`main.answerBlock[${answerIndex}].title`}
                                                        />
                                                        <CustomField
                                                            label="Description"
                                                            id={`description-${answerIndex}`}
                                                            name={`main.answerBlock[${answerIndex}].description`}
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushAnswer("")}>
                                                    + answer
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                {/* Why Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Why</h3>
                                    </div>

                                    <CustomField label="Title" id="why-title" name={`why.title`} />
                                    <CustomField label="Description" id="why-description" name={`why.description`} />

                                    {/* Card_list array */}
                                    <h4>Card list:</h4>
                                    <FieldArray name={`why.card_list`}>
                                        {({ push: pushCardList, remove: removeCardList }) => (
                                            <>
                                                {values.why.card_list.map((card, cardIndex) => (
                                                    <div key={card.id} className="general-fields__section">
                                                        <CustomField
                                                            label={`Card ${cardIndex + 1}:`}
                                                            id={`card_list-${cardIndex}`}
                                                            name={`why.card_list[${cardIndex}].description`}
                                                            onRemove={() => removeCardList(cardIndex)}
                                                            type="textarea"
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() =>
                                                        pushCardList({
                                                            id: Date.now(),
                                                            description: "",
                                                        })
                                                    }>
                                                    + card
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>

                                    {/* Rating array */}
                                    <h4>Rating:</h4>
                                    <FieldArray name={`why.rating`}>
                                        {({ push: pushRating, remove: removeRating }) => (
                                            <>
                                                {values.why.rating.map((rating, ratingIndex) => (
                                                    <div key={rating.id} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Rating {ratingIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeRating(ratingIndex)}
                                                                    aria-label="delete-rating">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <div className="rating-label">
                                                            <label
                                                                htmlFor={`rating-[${ratingIndex}]`}
                                                                className="custom-field__label">
                                                                Rating
                                                            </label>
                                                        </div>
                                                        <Field
                                                            as={OutlinedInput}
                                                            type="number"
                                                            name={`why.rating[${ratingIndex}].rating`}
                                                            id={`rating-[${ratingIndex}]`}
                                                            fullWidth
                                                            inputProps={{ step: "0.1" }} // для поддержания десятичных значений
                                                        />

                                                        <CustomField
                                                            label="Title"
                                                            id={`title-${ratingIndex}`}
                                                            name={`why.rating[${ratingIndex}].title`}
                                                        />

                                                        <CustomField
                                                            label="Description"
                                                            id={`description-${ratingIndex}`}
                                                            name={`why.rating[${ratingIndex}].description`}
                                                            multiline
                                                        />

                                                        <CustomField
                                                            label="Link"
                                                            id={`link-${ratingIndex}`}
                                                            name={`why.rating[${ratingIndex}].link`}
                                                            multiline
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() =>
                                                        pushRating({
                                                            id: Date.now(),
                                                            rating: 0.0,
                                                            title: "",
                                                            description: "",
                                                            link: "",
                                                        })
                                                    }>
                                                    + card
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                {/* Footer Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Footer</h3>
                                    </div>

                                    <CustomField label="Logo" id="footer-logo" name={`footer.logo`} />

                                    {/* Links array */}
                                    <FieldArray name={`footer.links`}></FieldArray>

                                    {/* Text array */}
                                    <h4>Text Block:</h4>
                                    <FieldArray name={`footer.text`}>
                                        {({ push: pushText, remove: removeText }) => (
                                            <>
                                                {values.footer.text.map((textItem, textItemIndex) => (
                                                    <div key={textItemIndex} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Text {textItemIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeText(textItemIndex)}
                                                                    aria-label="delete-text">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <CustomField
                                                            label="Title"
                                                            id={`title-${textItemIndex}`}
                                                            name={`footer.text[${textItemIndex}].title`}
                                                        />

                                                        {/* Description array */}
                                                        <FieldArray name={`footer.text[${textItemIndex}].description`}>
                                                            {({ push: pushDesc, remove: removeDesc }) => (
                                                                <>
                                                                    {values.footer.text[textItemIndex].description.map(
                                                                        (desc, descIndex) => (
                                                                            <div key={descIndex}>
                                                                                <CustomField
                                                                                    label={`Description ${
                                                                                        descIndex + 1
                                                                                    }:`}
                                                                                    id={`description-${descIndex}`}
                                                                                    name={`footer.text[${textItemIndex}].description[${descIndex}]`}
                                                                                    onRemove={() =>
                                                                                        removeDesc(descIndex)
                                                                                    }
                                                                                    type="textarea"
                                                                                />
                                                                            </div>
                                                                        )
                                                                    )}

                                                                    <Button
                                                                        type="button"
                                                                        variant="contained"
                                                                        sx={{
                                                                            bgcolor: "#2e2e2e",
                                                                            marginBottom: "20px",
                                                                        }}
                                                                        onClick={() => pushDesc("")}>
                                                                        + description
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </FieldArray>
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() =>
                                                        pushText({
                                                            title: "",
                                                            description: [""],
                                                        })
                                                    }>
                                                    + text
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>

                                    {/* Copyright array */}
                                    <FieldArray name={`footer.copyright`}>
                                        {({ push: pushCopyright, remove: removeCopyright }) => (
                                            <>
                                                {values.footer.copyright.map((copyrightItem, copyrightItemIndex) => (
                                                    <div key={copyrightItemIndex}>
                                                        <CustomField
                                                            label={`Copyright ${copyrightItemIndex + 1}:`}
                                                            id={`copyright-${copyrightItemIndex}`}
                                                            name={`footer.copyright[${copyrightItemIndex}]`}
                                                            onRemove={() => removeCopyright(copyrightItemIndex)}
                                                            type="textarea"
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushCopyright("")}>
                                                    + copyright
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                {/* Banner Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Banner</h3>
                                    </div>
                                    <CustomField label="Title" id="banner-title" name={`banner.title`} />

                                    {/* Description array */}
                                    <FieldArray name={`banner.description`}>
                                        {({ push: pushDesc, remove: removeDesc }) => (
                                            <>
                                                {values.banner.description.map((desc, descIndex) => (
                                                    <div key={descIndex}>
                                                        <CustomField
                                                            label={`Description ${descIndex + 1}:`}
                                                            id={`description-${descIndex}`}
                                                            name={`banner.description[${descIndex}]`}
                                                            onRemove={() => removeDesc(descIndex)}
                                                            type="textarea"
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushDesc("")}>
                                                    + description
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>

                                    <CustomField label="Image" id="banner-img" name={`banner.img`} />
                                </div>

                                {/* ForWhat Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>For What</h3>
                                    </div>

                                    {/* descriptionBlock object */}
                                    <h4>Description Block</h4>
                                    <CustomField label="Title" id="title" name={`forWhat.descriptionBlock.title`} />

                                    {/* card_list array */}
                                    <h4>Card list:</h4>
                                    <FieldArray name={`forWhat.descriptionBlock.card_list`}>
                                        {({ push: pushCard, remove: removeCard }) => (
                                            <>
                                                {values.forWhat.descriptionBlock.card_list.map((card, cardIndex) => (
                                                    <div key={card.id} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Card {cardIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeCard(cardIndex)}
                                                                    aria-label="delete-card">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <CustomField
                                                            label="Title"
                                                            id={`title-${cardIndex}`}
                                                            name={`forWhat.descriptionBlock.card_list[${cardIndex}].title`}
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushCard("")}>
                                                    + card
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>

                                    {/* priceBlock object */}
                                    <h4>Price Block</h4>
                                    <CustomField label="Title" id="title" name={`forWhat.descriptionBlock.title`} />

                                    {/* buttons array */}
                                    <h4>Buttons:</h4>
                                    <FieldArray name={`forWhat.priceBlock.buttons`}>
                                        {({ push: pushBtn, remove: removeBtn }) => (
                                            <>
                                                {values.forWhat.priceBlock.buttons.map((btn, btnIndex) => (
                                                    <div key={btnIndex} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Button {btnIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeBtn(btnIndex)}
                                                                    aria-label="delete-button">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <CustomField
                                                            label="Title"
                                                            id={`title-${btnIndex}`}
                                                            name={`forWhat.priceBlock.buttons[${btnIndex}].title`}
                                                        />
                                                        <CustomField
                                                            label="Value"
                                                            id={`value-${btnIndex}`}
                                                            name={`forWhat.priceBlock.buttons[${btnIndex}].value`}
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushBtn("")}>
                                                    + button
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                {/* About Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>About</h3>
                                    </div>

                                    <CustomField label="Title" id="title" name={`about.title`} />

                                    {/* Description array */}
                                    <h4>Description:</h4>
                                    <FieldArray name={`about.description`}>
                                        {({ push: pushDesc, remove: removeDesc }) => (
                                            <>
                                                {values.about.description.map((desc, descIndex) => (
                                                    <div key={descIndex}>
                                                        <CustomField
                                                            label={`Description ${descIndex + 1}:`}
                                                            id={`description-${descIndex}`}
                                                            name={`about.description[${descIndex}]`}
                                                            onRemove={() => removeDesc(descIndex)}
                                                            type="textarea"
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() => pushDesc("")}>
                                                    + description
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>

                                    {/* tableData object */}
                                    <h4>Table Data:</h4>
                                    <div>
                                        <h5 className="h5-title">Head:</h5>

                                        <CustomField
                                            label="Question"
                                            id="question"
                                            name={`about.tableData.head.question`}
                                            multiline
                                        />
                                        <CustomField
                                            label="Comment"
                                            id="comment"
                                            name={`about.tableData.head.comment`}
                                            multiline
                                        />

                                        {/* Body array */}
                                        <h5>Body:</h5>
                                        <FieldArray name={`about.tableData.body`}>
                                            {({ push: pushBody, remove: removeBody }) => (
                                                <>
                                                    {values.about.tableData.body.map((bodyItem, bodyItemIndex) => (
                                                        <div key={bodyItem.id} className="general-fields__section">
                                                            <div className="general-field-list__header">
                                                                <h4 className="general-field__title">
                                                                    Body {bodyItemIndex + 1}
                                                                </h4>
                                                                <div className="close-btn">
                                                                    <IconButton
                                                                        onClick={() => removeBody(bodyItemIndex)}
                                                                        aria-label="delete-body">
                                                                        <CloseOutlined />
                                                                    </IconButton>
                                                                </div>
                                                            </div>

                                                            <CustomField
                                                                label="Question"
                                                                id={`question-${bodyItemIndex}`}
                                                                name={`about.tableData.body[${bodyItemIndex}].question`}
                                                            />
                                                            <CustomField
                                                                label="Value"
                                                                id={`answer-${bodyItemIndex}`}
                                                                name={`about.tableData.body[${bodyItemIndex}].answer`}
                                                            />
                                                            <CustomField
                                                                label="Comment"
                                                                id={`comment-${bodyItemIndex}`}
                                                                name={`about.tableData.body[${bodyItemIndex}].comment`}
                                                                multiline
                                                            />
                                                        </div>
                                                    ))}

                                                    <Button
                                                        type="button"
                                                        variant="contained"
                                                        sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                        onClick={() =>
                                                            pushBody({
                                                                id: Date.now(),
                                                                question: "",
                                                                answer: "",
                                                                comment: "",
                                                            })
                                                        }>
                                                        + body item
                                                    </Button>
                                                </>
                                            )}
                                        </FieldArray>
                                    </div>
                                </div>

                                {/* Faq Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>FAQ</h3>
                                    </div>

                                    <CustomField label="Title" id="title" name={`faq.title`} />

                                    {/* Data array */}
                                    <FieldArray name={`faq.data`}>
                                        {({ push: pushData, remove: removeData }) => (
                                            <>
                                                {values.faq.data.map((dataItem, dataItemIndex) => (
                                                    <div key={dataItem.id} className="general-fields__section">
                                                        <div className="general-field-list__header">
                                                            <h4 className="general-field__title">
                                                                Faq {dataItemIndex + 1}
                                                            </h4>
                                                            <div className="close-btn">
                                                                <IconButton
                                                                    onClick={() => removeData(dataItemIndex)}
                                                                    aria-label="delete-data">
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <CustomField
                                                            label="Title"
                                                            id={`title-${dataItemIndex}`}
                                                            name={`faq.data[${dataItemIndex}].title`}
                                                        />
                                                        <CustomField
                                                            label="Description"
                                                            id={`description-${dataItemIndex}`}
                                                            name={`faq.data[${dataItemIndex}].description`}
                                                            multiline
                                                        />
                                                    </div>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    sx={{ bgcolor: "#2e2e2e", marginBottom: "20px" }}
                                                    onClick={() =>
                                                        pushData({
                                                            id: Date.now(),
                                                            title: "",
                                                            description: "",
                                                        })
                                                    }>
                                                    + faq
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                {/* Congratulation Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Congratulation</h3>
                                    </div>

                                    <CustomField label="Title" id="title" name={`congratulation.title`} />
                                    <CustomField
                                        label="Description"
                                        id="description"
                                        name={`congratulation.description`}
                                        multiline
                                    />
                                    <CustomField
                                        label="Clock Title"
                                        id="clockTitle"
                                        name={`congratulation.clockTitle`}
                                        multiline
                                    />
                                </div>

                                {/* Analytics Section */}
                                <div>
                                    <div className="form__title">
                                        <h3>Analytics</h3>
                                    </div>

                                    <CustomField
                                        label="googleAnalyticsScript"
                                        id="googleAnalyticsScript"
                                        name={`analytics.googleAnalyticsScript`}
                                        multiline
                                    />
                                    <CustomField
                                        label="googleTagManagerScript"
                                        id="googleTagManagerScript"
                                        name={`analytics.googleTagManagerScript`}
                                        multiline
                                    />
                                    <CustomField
                                        label="googleTagManagerNoScript"
                                        id="googleTagManagerNoScript"
                                        name={`analytics.googleTagManagerNoScript`}
                                        multiline
                                    />
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
        </>
    );
};

export default GeneralForm;

const initialValues: General = {
    common: {
        primaryButtonText: "",
        rangeData: {
            summa: {
                min: 1000,
                max: 100000,
                step: 0,
                currency: "",
                firstValue: 0,
                name: "",
            },
            period: {
                min: 1,
                max: 36,
                step: 1,
                currency: "Месяцев",
                firstValue: 0,
                name: "",
            },
        },
        steps: [],
    },
    header: {
        logo: "",
        links: [{ name: "", link: "" }],
    },
    main: {
        title: "",
        description: [""],
        img: {
            url: "",
            alt: "",
        },
        rangeBlock: {
            title: "",
            description: "",
            value: "",
            period: "",
            return: "",
            date: "",
        },
        answerBlock: [
            {
                id: Date.now(),
                title: "",
                description: "",
            },
        ],
    },
    why: {
        title: "",
        description: "",
        card_list: [
            {
                id: Date.now(),
                description: "",
            },
        ],
        rating: [
            {
                id: Date.now(),
                rating: 0.0,
                title: "",
                description: "",
                link: "",
            },
        ],
    },
    footer: {
        logo: "",
        links: [],
        text: [
            {
                title: "",
                description: [""],
            },
        ],
        copyright: [""],
    },
    banner: {
        title: "",
        description: [""],
        img: "",
    },
    forWhat: {
        descriptionBlock: {
            title: "",
            card_list: [
                {
                    id: Date.now(),
                    title: "",
                },
            ],
        },
        priceBlock: {
            title: "",
            buttons: [
                {
                    title: "",
                    value: 0,
                },
            ],
        },
    },
    about: {
        title: "",
        description: [""],
        tableData: {
            head: {
                id: Date.now(),
                question: "",
                comment: "",
            },
            body: [
                {
                    id: Date.now(),
                    question: "",
                    answer: "",
                    comment: "",
                },
            ],
        },
    },
    faq: {
        title: "",
        data: [
            {
                id: Date.now(),
                title: "",
                description: "",
            },
        ],
    },
    congratulation: {
        title: "",
        description: "",
        clockTitle: "",
    },
    analytics: {
        googleAnalyticsScript: "",
        googleTagManagerScript: "",
        googleTagManagerNoScript: "",
    },
};
