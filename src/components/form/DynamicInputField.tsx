"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../helpers/utils/schemaValidation";
import { HTMLInputTypeAttribute } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IInput {
  name: string;
  type?: HTMLInputTypeAttribute;
  size?: "large" | "small";
  value?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  validationOptions?: object;
  error?: string;
  accept?: string;
  description?: string;
}

const DynamicInputField = ({
  name,
  type = "text",
  size = "large",
  value,
  id,
  placeholder,
  label,
  validationOptions = {},
  error,
  accept,
  description,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Controller
          control={control}
          name={name}
          rules={validationOptions}
          render={({ field }) => (
            <Input
              id={id}
              type={inputType}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              className={`${size === "small" ? "h-8 text-sm" : "h-10"} ${
                isPassword ? "pr-10" : ""
              }`}
              accept={type === "file" ? accept : undefined}
            />
          )}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default DynamicInputField;
