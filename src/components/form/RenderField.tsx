import { RegisterOptions } from "react-hook-form";

import DynamicTextArea from "./DynamicTextArea";
import FileUploadInput from "./FileUploadInput";
import MultiSelect from "./MultiSelect";
import Select from "./Select";
import DynamicInputField from "./DynamicInputField";

export interface SelectOption {
  label: string;
  value: string;
}

export interface PhoneConfig {
  defaultCountry: string;
  format: Record<string, string>;
}
export interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  fieldType?:
    | "input"
    | "select"
    | "multiSelect"
    | "file"
    | "textarea"
    | "checkbox";
  validation?: RegisterOptions;
  accept?: string;
  multiple?: boolean;
  size?: "small" | "medium" | "large";
  rows?: number;
  cols?: number;
  options?: SelectOption[];
  phoneConfig?: PhoneConfig;
}

export interface SectionConfig {
  title: string;
  fields: FieldConfig[];
}

export const renderField = (field: FieldConfig) => {
  switch (field.fieldType) {
    case "select":
      return (
        <Select
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options || []} // Use field-specific options or fallback
          validationOptions={field.validation}
        />
      );
    case "multiSelect":
      return (
        <MultiSelect
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options || []} // Use field-specific options or fallback
          validationOptions={field.validation}
        />
      );
    case "file":
      return (
        <FileUploadInput
          key={field.name}
          name={field.name}
          label={field.label}
          accept={field.accept || "image/*"}
          multiple={field.multiple || false}
          validationOptions={field.validation}
        />
      );
    case "textarea":
      return (
        <DynamicTextArea
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          cols={field.cols || 50}
          validationOptions={field.validation}
        />
      );
    default:
      return (
        <DynamicInputField
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type || "text"}
          validationOptions={field.validation}
        />
      );
  }
};
