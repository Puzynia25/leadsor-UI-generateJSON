import { useState } from "react";
import { Box, Chip, Divider, Tab, Tabs } from "@mui/material";
import ReviewForm from "./forms/reviewForm/ReviewForm";
import OffersForm from "./forms/offersForm/OffersForm";
import GeneralForm from "./forms/generalForm/GeneralForm";
import FormsForm from "./forms/formsForm/FormsForm";
import { ReviewsData } from "./forms/reviewForm/ReviewForm.types";
import { OffersData } from "./forms/offersForm/OffersForm.types";
import { downloadJSON } from "../utils";
import CountryCodeForm from "./forms/countryCodeForm/CountryCodeForm";

import "./App.css";

function App() {
    const [showSections, setShowSections] = useState(false);
    const [country, setCountry] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const onAddNewCountry = (newCountry: string) => {
        setCountry(newCountry);
        setShowSections(true);
    };

    const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const onSubmit = (values: ReviewsData | OffersData, section: string): void => {
        console.log("handleSubmit", values, section);

        const filename = `${section}`;

        downloadJSON(values, filename);
    };

    return (
        <div className="app__container">
            <div className="app__wrapper">
                <CountryCodeForm onAddCountry={onAddNewCountry} disabled={showSections} />
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
                                {activeTab === 0 && <FormsForm onSubmit={(values) => onSubmit(values, "forms")} />}
                                {activeTab === 1 && <GeneralForm onSubmit={(values) => onSubmit(values, "general")} />}
                                {activeTab === 2 && <OffersForm onSubmit={(values) => onSubmit(values, "offers")} />}
                                {activeTab === 3 && <ReviewForm onSubmit={(values) => onSubmit(values, "review")} />}
                            </Box>
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
