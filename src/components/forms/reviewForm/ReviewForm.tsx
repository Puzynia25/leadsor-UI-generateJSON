import { useState } from "react";
import { Review, ReviewsData } from "./ReviewForm.types";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, TextareaAutosize, TextField } from "@mui/material";

import "./ReviewForm.css";

interface ReviewsFormProps {
    onSubmit: (data: ReviewsData) => void;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author name is required"),
    rating: Yup.number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5")
        .required("Rating is required"),
    date: Yup.date().nullable(),
    description: Yup.string().required("Description is required"),
});

const initialValues = {
    title: "",
    author: "",
    rating: 0,
    date: "",
    description: "",
};

const ReviewForm = ({ onSubmit }: ReviewsFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting, setErrors, validateForm }) => {
                validateForm(values).then((errors) => {
                    if (Object.keys(errors).length === 0) {
                        const formattedValues: ReviewsData = {
                            title: values.title,
                            items: [
                                {
                                    id: Date.now(),
                                    rating: values.rating,
                                    author: values.author,
                                    date: values.date ?? "",
                                    description: values.description,
                                },
                            ],
                        };
                        onSubmit(formattedValues);
                        resetForm();
                    } else {
                        setErrors(errors);
                    }
                    setSubmitting(false);
                });
            }}>
            {() => (
                <Form className="form__wrapper">
                    <div className="field__wrapper">
                        <label htmlFor="title" className="field__label">
                            Title:
                        </label>
                        <Field as={TextField} id="title" name="title" type="text" />
                        <ErrorMessage name="title" component="div" />
                    </div>

                    <div className="field__wrapper">
                        <label htmlFor="rating" className="field__label">
                            Rating:
                        </label>
                        <Field as={TextField} id="rating" name="rating" type="number" min="1" max="5" />
                        <ErrorMessage name="rating" component="div" />
                    </div>

                    <div className="field__wrapper">
                        <label htmlFor="author" className="field__label">
                            Author:
                        </label>
                        <Field as={TextField} id="author" name="author" type="text" />
                        <ErrorMessage name="author" component="div" />
                    </div>

                    <div className="field__wrapper">
                        <label htmlFor="date" className="field__label">
                            Date:
                        </label>
                        <Field as={TextField} id="date" name="date" type="date" />
                        <ErrorMessage name="date" component="div" />
                    </div>

                    <div className="field__wrapper">
                        <label htmlFor="description" className="field__label">
                            Description:
                        </label>
                        <Field
                            as={TextareaAutosize}
                            id="description"
                            name="description"
                            minRows={6}
                            style={{
                                width: "100%",
                                resize: "vertical",
                            }}
                        />
                        <ErrorMessage name="description" component="div" />
                    </div>

                    <div className="btn__wrapper">
                        <Button type="submit" variant="contained" color="warning">
                            сгенерировать JSON
                        </Button>
                        <Button type="button" variant="contained" color="inherit">
                            Добавить еще один отзыв
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ReviewForm;
