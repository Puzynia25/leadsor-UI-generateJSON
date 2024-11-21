import { Field } from "formik";
import { TextField } from "@mui/material";

const TextInput = ({ id, name }: { id: string; name: string }) => (
    <Field as={TextField} id={id} name={name} style={{ width: "100%" }} />
);

export default TextInput;
