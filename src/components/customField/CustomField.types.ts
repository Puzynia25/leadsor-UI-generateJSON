export interface CustomFieldProps {
    label: string;
    id: string;
    name: string;
    type?: "text" | "checkbox" | "textarea" | "number" | "radio";
    options?: { value: boolean; label: string }[];
    onRemove?: () => void | undefined;
}
