import { Review, ReviewsData } from "./ReviewForm.types";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Button, IconButton, TextareaAutosize, TextField } from "@mui/material";

import "../forms.css";
import { DeleteRounded } from "@mui/icons-material";

interface ReviewsFormProps {
    onSubmit: (data: ReviewsData) => void;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    items: Yup.array().of(
        Yup.object().shape({
            author: Yup.string().required("Author name is required"),
            rating: Yup.number()
                .min(1, "Rating must be at least 1")
                .max(5, "Rating must be at most 5")
                .required("Rating is required"),
            date: Yup.date().nullable(),
            description: Yup.array()
                .of(Yup.string().required("Each description is required"))
                .min(1, "At least one description is required"),
        })
    ),
});

const initialValues: ReviewsData = {
    title: "",
    items: [
        {
            id: Date.now(),
            author: "",
            rating: 0,
            date: "",
            description: [""],
        },
    ],
};

const ReviewForm = ({ onSubmit }: ReviewsFormProps) => {
    const onAddReview = (
        values: ReviewsData,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        const newReview = {
            id: Date.now(),
            author: "",
            rating: 0,
            date: "",
            description: [""],
        };
        setFieldValue("items", [...values.items, newReview]);
    };

    const onAddDescription = (
        reviewIndex: number,
        values: ReviewsData,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        const newDescriptions = [...values.items[reviewIndex].description, ""];
        setFieldValue(`items[${reviewIndex}].description`, newDescriptions);
    };

    const onRemoveDesciption = (
        reviewIndex: number,
        descIndex: number,
        values: ReviewsData,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        const newDescriptions = values.items[reviewIndex].description.filter((desc, index) => index !== descIndex);
        setFieldValue(`items[${reviewIndex}].description`, newDescriptions);
    };

    const handleSubmit = (values: ReviewsData, { resetForm }: FormikHelpers<ReviewsData>) => {
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
                <Form className="review__wrapper">
                    <div className="field__wrapper">
                        <label htmlFor="title" className="field__label">
                            Title:
                        </label>
                        <Field as={TextField} id="title" name="title" type="text" />
                        <ErrorMessage name="title" component="div" />
                    </div>

                    {values.items.map((review, reviewIndex) => (
                        <div key={reviewIndex}>
                            <p>Review {reviewIndex + 1}:</p>
                            <div className="form__wrapper">
                                <div className="field__wrapper">
                                    <label htmlFor={`rating-${reviewIndex}`} className="field__label">
                                        Rating:
                                    </label>
                                    <Field
                                        as={TextField}
                                        id={`rating-${reviewIndex}`}
                                        name={`items[${reviewIndex}].rating`}
                                        type="number"
                                        min="1"
                                        max="5"
                                    />
                                    <ErrorMessage name="rating" component="div" className="error-message" />
                                </div>

                                <div className="field__wrapper">
                                    <label htmlFor={`author-${reviewIndex}`} className="field__label">
                                        Author:
                                    </label>
                                    <Field
                                        as={TextField}
                                        id={`author-${reviewIndex}`}
                                        name={`items[${reviewIndex}].author`}
                                        type="text"
                                    />
                                    <ErrorMessage name="author" component="div" className="error-message" />
                                </div>

                                <div className="field__wrapper">
                                    <label htmlFor={`date-${reviewIndex}`} className="field__label">
                                        Date:
                                    </label>
                                    <Field
                                        as={TextField}
                                        id={`date-${reviewIndex}`}
                                        name={`items[${reviewIndex}].date`}
                                        type="date"
                                    />
                                    <ErrorMessage name="date" component="div" className="error-message" />
                                </div>

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

                                            <IconButton
                                                onClick={() =>
                                                    onRemoveDesciption(reviewIndex, descIndex, values, setFieldValue)
                                                }
                                                color="error"
                                                aria-label="delete"
                                                sx={{ width: "auto" }}>
                                                <DeleteRounded />
                                            </IconButton>
                                        </div>
                                        <ErrorMessage
                                            name={`items[${reviewIndex}].description[${descIndex}]`}
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => onAddDescription(reviewIndex, values, setFieldValue)}
                                    sx={{ border: "1px dashed darkgrey", color: "#000" }}>
                                    + description
                                </Button>
                            </div>
                            <div className="btn__wrapper">
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() => onAddReview(values, setFieldValue)}
                                    sx={{ bgcolor: "#000" }}>
                                    + отзыв
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button type="submit" variant="contained" color="warning">
                        сгенерировать JSON
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ReviewForm;
