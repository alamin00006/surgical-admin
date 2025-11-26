import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  placeholder?: string;
  label?: string;
  handleChange?: (el: string) => void;
  className?: string;
  validationOptions?: object;
  description?: string;
};

const SelectField = ({
  name,
  placeholder = "Select",
  options,
  label,
  handleChange,
  className = "",
  validationOptions = {},
  description,
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && <Label className="text-base font-medium">{label}</Label>}

      <Controller
        control={control}
        name={name}
        rules={validationOptions}
        render={({ field: { value, onChange } }) => (
          <Select
            onValueChange={(selectedValue) => {
              onChange(selectedValue);
              handleChange?.(selectedValue);
            }}
            value={value}
          >
            <SelectTrigger
              className={`w-full ${error ? "border-destructive" : ""}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default SelectField;
