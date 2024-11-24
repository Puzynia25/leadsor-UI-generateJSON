import { useState } from "react";
import { Review, ReviewsData, ReviewsFormProps } from "./Review.types";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Alert, Button, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import CustomField from "../../CustomField/CustomField";
import { reviewValidationSchema } from "../../../utils/validationSchema";
import { useFileUpload } from "../../../hooks/useFileUpload";
import FileUploadButton from "../../FileUploadButton/FileUploadButton";

import "./Review.css";

const ReviewForm = ({ onSubmit }: ReviewsFormProps) => {
    const [initialValues, setInitialValues] = useState<ReviewsData>(initialValuesData);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const { onFileUpload, error } = useFileUpload<ReviewsData>((json) => {
        setInitialValues(json);
        setIsFormVisible(true);
    });

    const onReviewsSubmit = (values: ReviewsData, { resetForm }: FormikHelpers<ReviewsData>) => {
        const formItems = (list: Review[]) => {
            return list.map((review) => ({
                id: review.id,
                rating: review.rating,
                author: review.author,
                date: review.date ?? "",
                description: review.description,
            }));
        };

        const formattedValues: ReviewsData = {
            title: values.title,
            items: formItems(values.items),
        };

        onSubmit(formattedValues);
        resetForm();
    };

    const renderReviewForm = () => (
        <Formik initialValues={initialValues} validationSchema={reviewValidationSchema} onSubmit={onReviewsSubmit}>
            {({ values, errors }) => (
                <>
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="error" className="fixed-alert">
                            В форме есть ошибки!
                        </Alert>
                    )}

                    <Form className="form__wrapper ">
                        <div className="review-form__wrapper">
                            <CustomField id="title" name="title" label="Title" />

                            <FieldArray name="items">
                                {({ push, remove }) => (
                                    <>
                                        {values.items.map((review, reviewIndex) => (
                                            <div key={review.id} className="review-fields__section">
                                                <div className="review-field-list__header">
                                                    <h4 className="review-field__title">Review {reviewIndex + 1}:</h4>
                                                    <div className="close-btn">
                                                        <IconButton
                                                            onClick={() => remove(reviewIndex)}
                                                            aria-label="delete-review">
                                                            <CloseOutlined />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                {/* Form */}

                                                <CustomField
                                                    label="Rating:"
                                                    id={`rating-${reviewIndex}`}
                                                    name={`items[${reviewIndex}].rating`}
                                                    type="number"
                                                />

                                                <CustomField
                                                    label="Author:"
                                                    id={`author-${reviewIndex}`}
                                                    name={`items[${reviewIndex}].author`}
                                                />

                                                <CustomField
                                                    label="Date:"
                                                    id={`date-${reviewIndex}`}
                                                    name={`items[${reviewIndex}].date`}
                                                    type="date"
                                                />

                                                <FieldArray name={`items[${reviewIndex}].description`}>
                                                    {({ push: pushDesc, remove: removeDesc }) => (
                                                        <>
                                                            {review.description.map((desc, descIndex) => (
                                                                <div key={descIndex} className="field__wrapper">
                                                                    <CustomField
                                                                        label={`Description ${descIndex + 1}:`}
                                                                        id={`description-${reviewIndex}-${descIndex}`}
                                                                        name={`items[${reviewIndex}].description[${descIndex}]`}
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
                                            </div>
                                        ))}

                                        <div className="add-review-btn">
                                            <Button
                                                type="button"
                                                variant="contained"
                                                onClick={() => push({ ...initialReview, id: Date.now() })}
                                                sx={{ bgcolor: "#2e2e2e" }}>
                                                + review
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </FieldArray>
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
        <div>
            <div className="tab__content-title">
                <h3>Reviews:</h3>
            </div>

            {error && <Alert severity="error">{error}</Alert>}
            {isFormVisible ? renderReviewForm() : <FileUploadButton fileName="review" onFileUpload={onFileUpload} />}
        </div>
    );
};

export default ReviewForm;

const initialReview = { id: Date.now(), author: "", rating: 0, date: "", description: [""] };

const initialValuesData: ReviewsData = {
    title: "",
    items: [initialReview],
};
