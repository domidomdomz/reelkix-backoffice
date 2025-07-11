export type ApiValidationError = {
  PropertyName: string;
  ErrorMessage: string;
};

export type CreateProductErrorResponse = {
  Message: string;
  Errors: ApiValidationError[];
};