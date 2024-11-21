import { Field } from "formik";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const RadioGroupInput = ({
    id,
    name,
    options,
}: {
    id: string;
    name: string;
    options: { label: string; value: boolean }[];
}) => (
    <Field name={name}>
        {({ field }) => (
            <RadioGroup
                {...field}
                aria-labelledby={id}
                name={name}
                style={{ flexDirection: "column", gap: "10px" }}
                value={field.value}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.label}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        )}
    </Field>
);

export default RadioGroupInput;
