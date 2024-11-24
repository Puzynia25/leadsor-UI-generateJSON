import { Button } from "@mui/material";

import "./FileUploadButton.css";

const FileUploadButton = ({
    onFileUpload,
    fileName,
}: {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string;
}) => {
    return (
        <div className="file-upload-btn">
            <input accept=".json" type="file" id="upload-json" style={{ display: "none" }} onChange={onFileUpload} />
            <label htmlFor="upload-json">
                <Button variant="contained" component="span" sx={{ bgcolor: "#2e2e2e" }}>
                    + Загрузить {fileName}.json
                </Button>
            </label>
        </div>
    );
};

export default FileUploadButton;
