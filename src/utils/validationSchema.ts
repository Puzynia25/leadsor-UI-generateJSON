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

export const offerValidationSchema = Yup.object().shape({
    data: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required("Title is required"),
            money: Yup.string().required("Money field is required"),
            img: Yup.string().url("Must be a valid URL").required("Image URL is required"),
            term: Yup.string(),
            link: Yup.string().url("Must be a valid URL").required("Link is required"),
            tagId: Yup.number().required("Tag ID must be a number"),
            isBestOffer: Yup.boolean(),
        })
    ),
    tags: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().required("Tag ID is required"),
            name: Yup.string().required("Tag name is required"),
        })
    ),
    settings: Yup.object().shape({
        rangeMoney: Yup.object().shape({
            title: Yup.string().required("Range money title is required"),
            currency: Yup.string().required("Currency is required"),
        }),
        linkText: Yup.string().required("Link text is required"),
        cookieExpiresDays: Yup.number().required("Cookie expires days is required"),
        title: Yup.string().required("Title is required"),
        subtitle: Yup.string().required("Subtitle is required"),
        logo: Yup.string().url("Must be a valid URL").required("Logo URL is required"),
    }),
});
