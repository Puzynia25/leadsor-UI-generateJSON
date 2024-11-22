import { Field } from "formik";

const DateInput = ({ id, name }: { id: string; name: string }) => {
    return (
        <Field
            id={id}
            name={name}
            type="date"
            style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
        />
    );
};

export default DateInput;
