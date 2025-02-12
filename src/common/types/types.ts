export type FieldError = {
  error: string;
  field: string;
};

export type Response<T = {}> = {
  fieldsErrors: FieldError;
  messages: string[];
  resultCode: number;
  data: T;
};

export type FilterValues = "all" | "completed" | "active";
