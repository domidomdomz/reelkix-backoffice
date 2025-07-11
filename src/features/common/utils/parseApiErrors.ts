import type { ApiValidationError } from "@common-types/api";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const parseApiValidationErrors = <T extends FieldValues>(
  errors: ApiValidationError[],
  setError: UseFormSetError<T>,
  toast?: (msg: string) => void
) => {
  errors.forEach((err) => {
    const fieldValues = Object.keys(err.PropertyName) as Path<T>[];
    
    if (err.PropertyName in fieldValues) {
        setError(err.PropertyName as Path<T>, {
            type: "server",
            message: err.ErrorMessage
        });
    }

    if (toast) toast(`${err.PropertyName}: ${err.ErrorMessage}`);
  });
};
