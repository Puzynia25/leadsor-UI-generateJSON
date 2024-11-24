import { useState } from "react";
import { Button } from "@mui/material";

import "./ImageUploadField.css";

interface ImageUploadFieldProps {
    name: string;
    onImageUpload: (file: File) => Promise<string>; // Загружаем изображение и возвращаем URL
}

const ImageUploadField = ({ name, onImageUpload }: ImageUploadFieldProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Устанавливаем локальное превью

            try {
                const imageUrl = await onImageUpload(file); // Загружаем на сервер
                console.log(`Image uploaded: ${imageUrl}`);
            } catch (error) {
                console.error("Ошибка при загрузке изображения:", error);
            }
        }
    };

    return (
        <div className="upload-img-btn">
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "150px" }} />}
            <input
                accept="image/*"
                type="file"
                id={`${name}-upload`}
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
            <label htmlFor={`${name}-upload`}>
                <Button variant="contained" component="span" sx={{ bgcolor: "#6739b7de" }}>
                    Загрузить изображение
                </Button>
            </label>
        </div>
    );
};

export default ImageUploadField;
