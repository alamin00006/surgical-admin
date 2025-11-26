/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../helpers/utils/schemaValidation";
import { useState, useEffect, useRef } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface IFileInput {
  name: string;
  size?: "large" | "small";
  id?: string;
  label?: string;
  accept?: string;
  validationOptions?: object;
  multiple?: boolean;
  maxFiles?: number;
}

const FileUploadInput = ({
  name,
  size = "large",
  id,
  label,
  accept = "image/*",
  validationOptions = {},
  multiple = true,
  maxFiles = 10,
}: IFileInput) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsLoading(true);

    try {
      const newFiles = Array.from(files);

      // Check file limit
      if (multiple && previews.length + newFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const imageFiles = newFiles.filter((file) =>
        file.type.startsWith("image/")
      );

      // Create previews for image files
      const newPreviews = imageFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));

      setPreviews((prev) =>
        multiple ? [...prev, ...newPreviews] : newPreviews
      );

      // Update form value with all files
      const allFiles = multiple
        ? [...previews.map((p) => p.file), ...imageFiles]
        : imageFiles;

      setValue(name, allFiles, { shouldValidate: true });
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const previewToRemove = previews[index];
    URL.revokeObjectURL(previewToRemove.url);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);

    // Update form value
    setValue(name, multiple ? updatedPreviews.map((p) => p.file) : [], {
      shouldValidate: true,
    });
  };

  const handleRemoveAll = () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setPreviews([]);
    setValue(name, multiple ? [] : null, { shouldValidate: true });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={id || name} className="text-base font-medium">
            {label}
          </Label>
          {previews.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveAll}
              className="h-auto p-0 text-sm text-destructive hover:text-destructive/90 hover:bg-transparent"
            >
              Remove all
            </Button>
          )}
        </div>
      )}

      <Controller
        control={control}
        name={name}
        rules={validationOptions}
        render={({ field: { ref } }) => (
          <Card
            ref={dropRef}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`group relative cursor-pointer border-2 border-dashed transition-all duration-200 ${
              isDragging
                ? "border-primary bg-primary/5 scale-[0.99]"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            } ${size === "small" ? "p-4" : "p-6"}`}
            onClick={triggerFileInput}
          >
            <CardContent className="p-0">
              <input
                id={id || name}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={(e) => handleFileChange(e.target.files)}
                ref={(e) => {
                  ref(e);
                  fileInputRef.current = e;
                }}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-3 text-center">
                <div
                  className={`rounded-full p-3 transition-colors ${
                    isDragging
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                  }`}
                >
                  {isLoading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/25 border-t-primary" />
                  ) : (
                    <Upload size={24} />
                  )}
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-foreground">
                    {isDragging ? "Drop to upload" : "Click or drag files here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {multiple
                      ? `Upload up to ${maxFiles} images (PNG, JPG, GIF)`
                      : "Upload one image (PNG, JPG, GIF)"}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Max file size: 5MB
                  </p>
                </div>
              </div>

              {/* Drag overlay */}
              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <Upload size={20} />
                    <span className="font-medium">Drop to upload</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      />

      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <span>⚠</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Selected images ({previews.length}
              {multiple ? `/${maxFiles}` : ""})
            </h4>
            <Badge variant="secondary">
              {previews.length} {previews.length === 1 ? "file" : "files"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {previews.map((preview, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden transition-all hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    {isLoading ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      <Image
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        width={200}
                        height={200}
                        onLoad={() => URL.revokeObjectURL(preview.url)}
                      />
                    )}
                  </div>

                  {/* Remove button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 transition-all group-hover:opacity-100"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X size={14} />
                  </Button>

                  {/* File info overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="truncate text-xs text-white">
                      {preview.file.name}
                    </p>
                    <p className="text-xs text-muted">
                      {(preview.file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {previews.length === 0 && !isLoading && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ImageIcon size={16} />
            <span className="text-sm">No images selected</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
