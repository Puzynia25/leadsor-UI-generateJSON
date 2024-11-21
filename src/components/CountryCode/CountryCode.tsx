import { Button, TextField } from "@mui/material";
import { useState } from "react";

import "./CountryCode.css";

const CountryCodeForm = ({
    onAddCountry,
    disabled,
}: {
    onAddCountry: (country: string) => void;
    disabled: boolean;
}) => {
    const [country, setCountry] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleAddCountry = () => {
        setError(false);
        setErrorMessage("");
        if (country === "") {
            setError(true);
            setErrorMessage("Введите код страны");
            return;
        }
        onAddCountry(country);
    };

    return (
        <div className="new-country-form__wrapper">
            <div>
                <b>Добавить страну:</b>
            </div>
            <TextField
                placeholder="cz"
                variant="outlined"
                size="small"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                error={error}
                helperText={errorMessage}
                color="warning"
            />

            <Button variant="contained" color="warning" onClick={handleAddCountry} disabled={disabled}>
                Добавить
            </Button>
        </div>
    );
};

export default CountryCodeForm;
