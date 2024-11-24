import { useState } from "react";

export const useFileUpload = <T>(onLoad: (data: T) => void) => {
    const [error, setError] = useState<string | null>(null);

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                onLoad(json);
                setError(null);
            } catch (error) {
                setError("Ошибка при чтении файла. Убедитесь, что это корректный JSON.");
            }
        };

        reader.readAsText(file);
    };

    return { onFileUpload, error };
};
