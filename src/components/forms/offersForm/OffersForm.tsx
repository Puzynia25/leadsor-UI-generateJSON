import { useState } from "react";
import * as Yup from "yup";
import { Offer, OffersData } from "./OffersForm.types";

interface OffersFormProps {
    onSubmit: (data: OffersData) => void;
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

const OffersForm = (onSubmit: OffersFormProps) => {
    const [offers, setOffers] = useState<Offer[]>([]);

    return (
        <>
            <div>OffersForm</div>
        </>
    );
};

export default OffersForm;
