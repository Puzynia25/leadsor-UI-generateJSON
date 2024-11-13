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

export const generalValidationSchema = Yup.object({
    common: Yup.object({
        primaryButtonText: Yup.string().required("This field is required"),
        rangeData: Yup.object({
            summa: Yup.object({
                min: Yup.number().required("Minimum is a required field").min(1, "Minimum should be at least 1"),
                max: Yup.number()
                    .required("Maximum is a required field")
                    .max(100000, "Maximum should not exceed 100000"),
                step: Yup.number().required("Step is a required field"),
                currency: Yup.string().required("Currency is a required field"),
                firstValue: Yup.number().required("Initial value is a required field"),
                name: Yup.string().required("Name is a required field"),
            }),
            period: Yup.object({
                min: Yup.number().required("Minimum is a required field").min(1, "Minimum should be at least 1"),
                max: Yup.number().required("Maximum is a required field").max(36, "Maximum should not exceed 36"),
                step: Yup.number().required("Step is a required field"),
                currency: Yup.string().required("Currency is a required field"),
                firstValue: Yup.number().required("Initial value is a required field"),
                name: Yup.string().required("Name is a required field"),
            }),
        }),
        steps: Yup.array().of(Yup.mixed()),
    }),
    header: Yup.object({
        logo: Yup.string().url("Must be a valid URL").nullable(),
        links: Yup.array().of(
            Yup.object({
                name: Yup.string().required("Name is a required field"),
                link: Yup.string().required("Link is a required field"),
            })
        ),
    }),
    main: Yup.object({
        title: Yup.string().required("Title is a required field"),
        description: Yup.array().of(Yup.string().required("Each description must be a string")),
        img: Yup.object({
            url: Yup.string().url("Must be a valid URL").required("Image URL is required"),
            alt: Yup.string().required("Alt text is required"),
        }),
        rangeBlock: Yup.object({
            title: Yup.string().required("Title is a required field"),
            description: Yup.string().required("Description is a required field"),
            value: Yup.string().required("Value is a required field"),
            period: Yup.string().required("Period is a required field"),
            return: Yup.string().required("Return is a required field"),
            date: Yup.string().required("Date is a required field"),
        }),
        answerBlock: Yup.array().of(
            Yup.object({
                title: Yup.string().required("Title is a required field"),
                description: Yup.string().required("Description is a required field"),
            })
        ),
    }),
    why: Yup.object({
        title: Yup.string().required("Title is a required field"),
        description: Yup.string().required("Description is a required field"),
        card_list: Yup.array().of(
            Yup.object({
                description: Yup.string().required("Description is a required field"),
            })
        ),
        rating: Yup.array().of(
            Yup.object({
                rating: Yup.number().required("Rating is required").min(0).max(5),
                title: Yup.string().nullable(),
                description: Yup.string().required("Description is a required field"),
                link: Yup.string().url("Must be a valid URL").nullable(),
            })
        ),
    }),
    footer: Yup.object({
        logo: Yup.string().url("Must be a valid URL").nullable(),
        links: Yup.array().of(
            Yup.object({
                name: Yup.string().required("Name is a required field"),
                url: Yup.string().url("Must be a valid URL").required("URL is required"),
            }).nullable()
        ),
        text: Yup.array().of(
            Yup.object({
                title: Yup.string().nullable(),
                description: Yup.array().of(Yup.string().required("Each description must be a string")),
            })
        ),
        copyright: Yup.array().of(Yup.string().required("Copyright text is required")),
    }),
    banner: Yup.object({
        title: Yup.string().required("Title is a required field"),
        description: Yup.array().of(Yup.string().required("Each description must be a string")),
        img: Yup.string().url("Must be a valid URL").required("Image URL is required"),
    }),
    forWhat: Yup.object({
        descriptionBlock: Yup.object({
            title: Yup.string().required("Title is a required field"),
            card_list: Yup.array().of(
                Yup.object({
                    title: Yup.string().required("Title is a required field"),
                })
            ),
        }),
        priceBlock: Yup.object({
            title: Yup.string().required("Title is a required field"),
            buttons: Yup.array().of(
                Yup.object({
                    title: Yup.string().required("Button title is required"),
                    value: Yup.number().required("Button value is required"),
                })
            ),
        }),
    }),
    about: Yup.object({
        title: Yup.string().required("Title is a required field"),
        description: Yup.array().of(Yup.string().required("Each description must be a string")),
        tableData: Yup.object({
            head: Yup.object({
                question: Yup.string().required("Question is a required field"),
                comment: Yup.string().required("Comment is a required field"),
            }),
            body: Yup.array().of(
                Yup.object({
                    question: Yup.string().required("Question is a required field"),
                    answer: Yup.string().required("Answer is a required field"),
                    comment: Yup.string().required("Comment is a required field"),
                })
            ),
        }),
    }),
    faq: Yup.object({
        title: Yup.string().required("Title is a required field"),
        data: Yup.array().of(
            Yup.object({
                title: Yup.string().required("Title is a required field"),
                description: Yup.string().required("Description is a required field"),
            })
        ),
    }),
    congratulation: Yup.object({
        title: Yup.string().required("Title is a required field"),
        description: Yup.string().required("Description is a required field"),
        clockTitle: Yup.string().required("Clock title is a required field"),
    }),
    analytics: Yup.object({
        // googleAnalyticsScript: Yup.string().required("Google Analytics script is required"),
        // googleTagManagerScript: Yup.string().required("Google Tag Manager script is required"),
        // googleTagManagerNoScript: Yup.string().required("Google Tag Manager no-script is required"),
        googleAnalyticsScript: Yup.string().nullable(),
        googleTagManagerScript: Yup.string().nullable(),
        googleTagManagerNoScript: Yup.string().nullable(),
    }),
});

export const formsValidationSchema = Yup.object().shape({
    items: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required(),
                name: Yup.string().required(),
                input_type: Yup.string().oneOf(["text", "checkbox", "radio", "select", "textarea"]).required(),
                label: Yup.string().required(),
                placeholder: Yup.string().optional(),
                description: Yup.string().optional(),
                validate: Yup.object()
                    .shape({
                        required: Yup.boolean().required(),
                        minLength: Yup.number().optional(),
                        maxLength: Yup.number().optional(),
                        pattern: Yup.object()
                            .shape({
                                reg: Yup.string()
                                    .matches(/^(\/.*\/[gimsuy]*)?$/, "Invalid regular expression format")
                                    .optional(),
                                message: Yup.string().required("Error message is required"),
                                mask: Yup.string().optional(),
                            })
                            .optional(),
                    })
                    .optional(),
                grid: Yup.number().optional(),
            })
        )
        .required("The form items list is required"),
    title: Yup.array().of(Yup.string().optional()).required(),
    buttons: Yup.object()
        .shape({
            next: Yup.string().required('"Next" button text is required'),
            prev: Yup.string().required('"Prev" button text is required'),
            finish: Yup.string().required('"Finish" button text is required'),
        })
        .required("Button data is required"),
    errors: Yup.object()
        .shape({
            required: Yup.string().required('"Required" error message is required'),
            min: Yup.string().optional(),
            max: Yup.string().optional(),
            minLength: Yup.string().optional(),
            maxLength: Yup.string().optional(),
            pattern: Yup.string().optional(),
        })
        .required("Error messages are required"),
    range: Yup.object()
        .shape({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
        })
        .required("Range is required"),
    stepsLength: Yup.number().required("Number of steps is required").min(1, "There must be at least one step"),
});
