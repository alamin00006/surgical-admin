"use client";

import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../helpers/utils/schemaValidation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ITextArea {
  name: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  label?: string;
  validationOptions?: object;
  error?: string;
  description?: string;
}

const DynamicTextArea = ({
  name,
  rows = 4,
  cols = 50,
  placeholder,
  label,
  validationOptions = {},
  description,
}: ITextArea) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="grid w-full gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={validationOptions}
        render={({ field }) => (
          <Textarea
            id={name}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            {...field}
            value={field.value ?? ""}
            className="resize-none"
          />
        )}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default DynamicTextArea;
