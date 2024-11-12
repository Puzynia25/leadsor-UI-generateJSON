export interface CustomFieldProps {
    id: string;
    name: string;
    label: string;
    type?: string;
    multiline?: boolean;
    remove?: boolean;
    onRemove?: () => void;
}
