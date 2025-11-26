// @/components/form/MultiSelect.tsx
"use client";

import React, { useState } from "react";
import {
  Controller,
  useFormContext,
  Path,
  PathValue,
  FieldValues,
} from "react-hook-form";
import { X, ChevronDown, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type SelectOptions = {
  label: string;
  value: string;
};

type MultiSelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: SelectOptions[];
  placeholder?: string;
  label?: string;
  handleChange?: (selected: string[]) => void;
  className?: string;
  validationOptions?: object;
  description?: string;
};

const MultiSelect = <T extends FieldValues>({
  name,
  placeholder = "Select options",
  options,
  label,
  handleChange,
  className = "",
  validationOptions = {},
  description,
}: MultiSelectProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const [isOpen, setIsOpen] = useState(false);
  const error = errors[name]?.message as string | undefined;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full space-y-2">
      {label && <Label className="text-base font-medium">{label}</Label>}

      <Controller
        control={control}
        name={name}
        rules={validationOptions}
        defaultValue={[] as PathValue<T, Path<T>>}
        render={({ field: { value, onChange } }) => {
          const selectedOptions = (value || []) as string[];

          const handleSelect = (optionValue: string) => {
            const newSelectedOptions = selectedOptions.includes(optionValue)
              ? selectedOptions.filter((val) => val !== optionValue)
              : [...selectedOptions, optionValue];
            onChange(newSelectedOptions);
            handleChange?.(newSelectedOptions);
          };

          const removeOption = (value: string) => {
            const newSelectedOptions = selectedOptions.filter(
              (val) => val !== value
            );
            onChange(newSelectedOptions);
            handleChange?.(newSelectedOptions);
          };

          const selectedValuesText = selectedOptions.map(
            (val) => options.find((option) => option.value === val)?.label || ""
          );

          return (
            <div className="relative">
              <Card
                className={`cursor-pointer border transition-all duration-200 ${
                  isOpen
                    ? "border-primary ring-2 ring-primary/20"
                    : error
                    ? "border-destructive"
                    : "border-input hover:border-primary/50"
                } ${className}`}
                onClick={toggleDropdown}
              >
                <CardContent className="p-3">
                  <div className="flex min-h-[2.5rem] items-center gap-2">
                    {selectedValuesText.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedValuesText.map((text, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1 capitalize group hover:bg-secondary/80"
                          >
                            <span className="max-w-xs truncate">{text}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 hover:bg-transparent hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeOption(selectedOptions[index]);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground capitalize">
                        {placeholder}
                      </span>
                    )}

                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>

              {isOpen && (
                <Card className="absolute top-full left-0 z-50 mt-1 w-full border shadow-lg">
                  <CardContent className="p-0">
                    <ScrollArea className="h-40">
                      <div className="p-1">
                        {options.map((option, index) => {
                          const isSelected = selectedOptions.includes(
                            option.value
                          );
                          return (
                            <div
                              key={index}
                              className={`flex cursor-pointer items-center rounded-md p-2 text-sm transition-colors hover:bg-accent ${
                                isSelected ? "bg-accent" : ""
                              }`}
                              onClick={() => handleSelect(option.value)}
                            >
                              <div
                                className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border"
                                }`}
                              >
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <span className="capitalize">{option.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          );
        }}
      />

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default MultiSelect;
