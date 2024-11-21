import { Field } from "formik";
import { TextField } from "@mui/material";

// const NumberInput = ({ id, name }: { id: string; name: string }) => (
//     <Field as={TextField} id={id} name={name} style={{ width: "100%" }} type="number" />
// );

// export default NumberInput;

interface NumberInputProps {
    id: string;
    name: string;
    min?: number;
    max?: number;
}

const NumberInput = (props: NumberInputProps) => {
    const { id, name, min, max } = props;
    return <Field as={TextField} id={id} name={name} type="number" inputProps={{ min, max }} />;
};

export default NumberInput;
