import { Field } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxInput = ({ id, name, label }: { id: string; name: string; label: string }) => (
    <FormControlLabel control={<Field type="checkbox" as={Checkbox} id={id} name={name} />} label={label} />
);

export default CheckboxInput;
