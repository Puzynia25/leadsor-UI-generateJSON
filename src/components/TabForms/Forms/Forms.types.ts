interface ValidationPattern {
    reg: string;
    message: string;
    mask?: string;
}

interface FieldValidation {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: ValidationPattern;
}

interface FormItem {
    id: number;
    name: string;
    input_type: "text" | "checkbox" | "radio" | "select" | "textarea";
    label: string;
    description?: string;
    placeholder?: string;
    validate?: FieldValidation;
    grid?: number;
}

interface FormButtons {
    next: string;
    prev: string;
    finish: string;
}

interface FormErrors {
    required: string;
    min?: string;
    max?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
}

interface Range {
    title: string;
    description: string;
}

export interface FormsData {
    items: FormItem[];
    title: string[];
    buttons: FormButtons;
    errors: FormErrors;
    range: Range;
    stepsLength: number;
}
