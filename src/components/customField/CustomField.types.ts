export interface CustomFieldProps {
    label: string;
    id: string;
    name: string;
    type?: "text" | "checkbox" | "textarea" | "number" | "radio" | "date";
    options?: { value: boolean; label: string }[];
    onRemove?: () => void | undefined;
}
