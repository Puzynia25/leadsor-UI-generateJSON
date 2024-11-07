import * as Yup from "yup";

export const reviewValidationSchema = Yup.object().shape({
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
