/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useState, useCallback } from "react";
import Form from "@/components/form/Form";
import { renderField } from "./RenderField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

interface FieldConfig {
  title: string;
  fields: any[];
}

interface DynamicFormHandlerProps<T extends FieldValues> {
  onSubmit?: SubmitHandler<T>;
  apiEndpoint: string;
  method: "POST" | "PATCH" | "PUT";
  contentType?: string;
  imageFields?: string[];
  children?: React.ReactNode;
  fieldConfigs: Record<string, FieldConfig>;
  defaultValues?: any;
  submitButtonText: string;
  pageTitle?: string;
  refetch?: () => void;
  className?: string;
}

const AddForm = <T extends FieldValues>({
  onSubmit,
  apiEndpoint,
  method,
  contentType,
  imageFields = [],
  fieldConfigs,
  defaultValues,
  submitButtonText,
  pageTitle,
  refetch,
  className = "grid grid-cols-1 gap-4 lg:grid-cols-2",
}: DynamicFormHandlerProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: SubmitHandler<T> = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const formData = new FormData();

        // Add all non-file fields to FormData
        Object.entries(data).forEach(([key, value]) => {
          if (!imageFields.includes(key)) {
            formData.append(
              key,
              typeof value === "object" && value !== null
                ? JSON.stringify(value)
                : String(value)
            );
          }
        });

        // Handle file fields
        if (imageFields.length > 0) {
          imageFields.forEach((field) => {
            if (data[field]) {
              if (Array.isArray(data[field])) {
                data[field].forEach((file: File, index: number) => {
                  formData.append(`${field}[${index}]`, file);
                });
              } else {
                formData.append(field, data[field]);
              }
            }
          });
        }

        const response = await axios({
          method,
          url: `${getBaseUrl()}${apiEndpoint}`,
          data: formData,
          headers: {
            "Content-Type": contentType || "multipart/form-data",
          },
        });

        toast.success(
          response?.data?.message || "Operation completed successfully"
        );
        refetch?.();
        return response.data;
      } catch (err: any) {
        console.error("Form submission error:", err);
        toast.error(err.response?.data?.message || "Something went wrong");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiEndpoint, method, imageFields, contentType, refetch]
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-foreground">{children}</h3>
      <Separator className="bg-border" />
    </div>
  );

  return (
    <Card className="w-full">
      {pageTitle && (
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {pageTitle}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className={pageTitle ? "pt-6" : "p-6"}>
        <Form
          submitHandler={onSubmit || handleSubmit}
          defaultValues={defaultValues}
        >
          <div className="space-y-8">
            {Object.values(fieldConfigs).map(
              (section: FieldConfig, index: number) => (
                <section
                  key={section.title || `section-${index}`}
                  className="space-y-6"
                >
                  {section.title && (
                    <SectionTitle>{section.title}</SectionTitle>
                  )}
                  <div className={className}>
                    {section.fields.map((field: any, fieldIndex: number) =>
                      renderField({
                        ...field,
                        key: field.key || `field-${index}-${fieldIndex}`,
                        disabled: isLoading,
                      })
                    )}
                  </div>
                </section>
              )
            )}

            <div className="flex justify-end border-t pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  submitButtonText
                )}
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddForm;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { SubmitHandler, FieldValues } from "react-hook-form";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { getBaseUrl } from "@/helpers/config/envConfig";
// import { useState, useCallback } from "react";
// import Form from "@/components/form/Form";
// import LoadingModal from "@/components/LoadingState/LoadingModal";
// import { renderField } from "./RenderField";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// interface FieldConfig {
//   title: string;
//   fields: any[];
// }

// interface DynamicFormHandlerProps<T extends FieldValues> {
//   onSubmit?: SubmitHandler<T>;
//   apiEndpoint: string;
//   method: "POST" | "PATCH" | "PUT";
//   contentType?: string;
//   imageFields?: string[];
//   children?: React.ReactNode;
//   fieldConfigs: Record<string, FieldConfig>;
//   defaultValues?: any;
//   submitButtonText: string;
//   pageTitle?: string;
//   refetch?: () => void;
//   className?: string;
// }

// const AddForm = <T extends FieldValues>({
//   onSubmit,
//   apiEndpoint,
//   method,
//   contentType,
//   imageFields = [],
//   fieldConfigs,
//   defaultValues,
//   submitButtonText,
//   pageTitle,
//   refetch,
//   className = "grid grid-cols-1 gap-4 lg:grid-cols-2",
// }: DynamicFormHandlerProps<T>) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit: SubmitHandler<T> = useCallback(
//     async (data) => {
//       setIsLoading(true);
//       try {
//         const formData = new FormData();

//         // Add all non-file fields to FormData
//         Object.entries(data).forEach(([key, value]) => {
//           if (!imageFields.includes(key)) {
//             formData.append(
//               key,
//               typeof value === "object" ? JSON.stringify(value) : value,
//             );
//           }
//         });

//         // Handle file fields
//         if (imageFields.length > 0) {
//           imageFields.forEach((field) => {
//             if (data[field]) {
//               // Handle single file or multiple files
//               if (Array.isArray(data[field])) {
//                 data[field].forEach((file: File, index: number) => {
//                   formData.append(`${field}[${index}]`, file);
//                 });
//               } else {
//                 formData.append(field, data[field]);
//               }
//             }
//           });
//         }

//         const response = await axios({
//           method,
//           url: `${getBaseUrl()}${apiEndpoint}`,
//           data: formData,
//           headers: {
//             "Content-Type": contentType || "multipart/form-data",
//           },
//         });

//         toast.success(response?.data?.message);
//         if (refetch) {
//           refetch();
//         }
//         return response.data;
//       } catch (err: any) {
//         console.error(err);
//         toast.error(err.response?.data?.message);
//         throw err;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [apiEndpoint, method, imageFields, contentType, refetch],
//   );

//   const SectionTitle = ({ children }: { children: React.ReactNode }) => (
//     <div className="space-y-2">
//       <h3 className="text-lg font-semibold text-foreground">{children}</h3>
//       <Separator />
//     </div>
//   );

//   return (
//     <>
//       <LoadingModal isOpen={isLoading} message="Processing..." />

//       <Card>
//         {pageTitle && (
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-foreground">
//               {pageTitle}
//             </CardTitle>
//           </CardHeader>
//         )}

//         <CardContent className="pt-6">
//           <Form
//             submitHandler={onSubmit || handleSubmit}
//             defaultValues={defaultValues}
//           >
//             <div className="space-y-8">
//               {Object.values(fieldConfigs).map((section: FieldConfig, index: number) => (
//                 <div key={section.title || index} className="space-y-6">
//                   {section.title && <SectionTitle>{section.title}</SectionTitle>}
//                   <div className={className}>
//                     {section.fields.map((field: any, fieldIndex: number) =>
//                       renderField({ ...field, key: field.key || `field-${fieldIndex}` })
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <div className="flex justify-end pt-6">
//                 <Button
//                   type="submit"
//                   size="lg"
//                   disabled={isLoading}
//                   className="min-w-[120px]"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
//                       Processing...
//                     </>
//                   ) : (
//                     submitButtonText
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </Form>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default AddForm;
