import { useState } from "react";
import { Box, Button, Chip, Divider, Tab, Tabs, TextField } from "@mui/material";
import ReviewForm from "./forms/reviewForm/ReviewForm";
import OffersForm from "./forms/offersForm/OffersForm";
import GeneralForm from "./forms/generalForm/GeneralForm";
import FormsForm from "./forms/formsForm/FormsForm";

import "./App.css";
import { downloadJSON } from "../utils";
import { ReviewsData } from "./forms/reviewForm/ReviewForm.types";

function App() {
    const [showSections, setShowSections] = useState(false);
    const [country, setCountry] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [activeTab, setActiveTab] = useState(0);

    const onAddNewCountry = () => {
        setError(false);
        setErrorMessage("");
        if (country === "") {
            setError(true);
            setErrorMessage("Введите код страны");
            return;
        }
        setShowSections(true);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleSubmit = (values: ReviewsData, section: string): void => {
        console.log("handleSubmit", values, section);

        // Задайте имя файла
        const filename = `${section}`;

        downloadJSON(values, filename);
    };

    return (
        <div className="app__container">
            <div className="app__wrapper">
                <div className="new-country-form__wrapper">
                    <div>Добавить страну:</div>
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

                    <Button variant="contained" color="warning" onClick={onAddNewCountry} disabled={showSections}>
                        Добавить
                    </Button>
                </div>

                <Divider />

                {/* Tabs Section */}
                {showSections && (
                    <div className="sections__wrapper">
                        <div className="country__content">
                            <p>страна:</p>
                            <Chip label={country} color="warning" />
                        </div>

                        <Divider />

                        <Box
                            sx={{
                                flexGrow: 1,
                                bgcolor: "background.paper",
                                display: "flex",
                                height: 224,
                            }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                textColor="inherit"
                                indicatorColor="secondary"
                                orientation="vertical"
                                sx={{
                                    borderRight: 1,
                                    borderColor: "divider",
                                    width: "200px",
                                }}>
                                <Tab label="Forms" />
                                <Tab label="General" />
                                <Tab label="Offers" />
                                <Tab label="Review" />
                            </Tabs>

                            <Box className="tab-content">
                                {activeTab === 0 && <FormsForm onSubmit={(values) => handleSubmit(values, "forms")} />}
                                {activeTab === 1 && (
                                    <GeneralForm onSubmit={(values) => handleSubmit(values, "general")} />
                                )}
                                {activeTab === 2 && (
                                    <OffersForm onSubmit={(values) => handleSubmit(values, "offers")} />
                                )}
                                {activeTab === 3 && (
                                    <ReviewForm onSubmit={(values) => handleSubmit(values, "review")} />
                                )}
                            </Box>
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
