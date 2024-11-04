import { useState } from "react";
import * as Yup from "yup";
import { Forms, FormsData } from "./FormsForm.types";

interface FormsFormProps {
    onSubmit: (data: FormsData) => void;
}

const initialValues = {
    rating: 5,
    author: "",
    description: "",
};

const validationSchema = Yup.object().shape({
    rating: Yup.number().min(1).max(5).required("Rating is required"),
    author: Yup.string().required("Author is required"),
    description: Yup.string().required("Description is required"),
});

const FormsForm = (onSubmit: FormsFormProps) => {
    const [general, setGeneral] = useState<Forms[]>([]);

    return (
        <>
            <div>FormsForm</div>
        </>
    );
};

export default FormsForm;
