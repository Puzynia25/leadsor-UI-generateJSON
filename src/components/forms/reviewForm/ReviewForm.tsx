import { Review, ReviewsData, ReviewsFormProps } from "./ReviewForm.types";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Button, IconButton, TextareaAutosize } from "@mui/material";
import { CloseOutlined, DeleteRounded } from "@mui/icons-material";
import CustomField from "../../customField/CustomField";
import { reviewValidationSchema } from "../../../utils/validationSchema";

import "./ReviewForm.css";

const review = { id: Date.now(), author: "", rating: 0, date: "", description: [""] };

const initialValues: ReviewsData = {
    title: "",
    items: [review],
};

const ReviewForm = ({ onSubmit }: ReviewsFormProps) => {
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

    return (
        <Formik initialValues={initialValues} validationSchema={reviewValidationSchema} onSubmit={onReviewsSubmit}>
            {({ values }) => (
                <Form className="review__wrapper">
                    <CustomField id="title" name="title" label="Title" />

                    <FieldArray name="items">
                        {({ push, remove }) => (
                            <>
                                {values.items.map((review, reviewIndex) => (
                                    <div key={reviewIndex}>
                                        <p>Review {reviewIndex + 1}:</p>

                                        {/* Form */}
                                        <div className="review-form__wrapper">
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
                                                                <label
                                                                    htmlFor={`description-${reviewIndex}-${descIndex}`}
                                                                    className="field__label">
                                                                    Description {descIndex + 1}:
                                                                </label>
                                                                <div className="review__field-description">
                                                                    <Field
                                                                        as={TextareaAutosize}
                                                                        id={`description-${reviewIndex}-${descIndex}`}
                                                                        name={`items[${reviewIndex}].description[${descIndex}]`}
                                                                        minRows={3}
                                                                        style={{
                                                                            width: "100%",
                                                                            resize: "vertical",
                                                                        }}
                                                                    />

                                                                    <div>
                                                                        <IconButton
                                                                            onClick={() => removeDesc(descIndex)}
                                                                            color="error"
                                                                            aria-label="delete-description">
                                                                            <DeleteRounded />
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage
                                                                    name={`items[${reviewIndex}].description[${descIndex}]`}
                                                                    component="div"
                                                                    className="error-message"
                                                                />
                                                            </div>
                                                        ))}

                                                        <div className="dashed_btn">
                                                            <Button
                                                                type="button"
                                                                variant="text"
                                                                fullWidth
                                                                color="inherit"
                                                                onClick={() => pushDesc("")}>
                                                                + description
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </FieldArray>

                                            <div className="close-btn">
                                                <IconButton
                                                    onClick={() => remove(reviewIndex)}
                                                    aria-label="delete-review">
                                                    <CloseOutlined />
                                                </IconButton>
                                            </div>
                                        </div>

                                        <div className="add-review-btn">
                                            <Button
                                                type="button"
                                                variant="contained"
                                                onClick={() => push(review)}
                                                sx={{ bgcolor: "#2e2e2e" }}>
                                                + review
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </FieldArray>

                    <Button type="submit" variant="contained" color="warning">
                        сгенерировать JSON
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ReviewForm;
