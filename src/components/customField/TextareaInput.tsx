import { Field } from "formik";
import { TextareaAutosize } from "@mui/material";

const TextareaInput = ({ id, name }: { id: string; name: string }) => (
    <Field
        as={TextareaAutosize}
        id={id}
        name={name}
        minRows={2.5}
        style={{ resize: "vertical", width: "100%", padding: "5px" }}
    />
);

export default TextareaInput;
