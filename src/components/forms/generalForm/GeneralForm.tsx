import { useState } from "react";
import * as Yup from "yup";
import { General, GeneralData } from "./GeneralForm.types";

interface GeneralFormProps {
    onSubmit: (data: GeneralData) => void;
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

const GeneralForm = (onSubmit: GeneralFormProps) => {
    const [general, setGeneral] = useState<General[]>([]);

    return (
        <>
            <div>GeneralForm</div>
        </>
    );
};

export default GeneralForm;
