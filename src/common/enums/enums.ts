export enum TaskStatus {
  "New",
  "InProcessed",
  "Completed",
}

export enum TaskPriority {
  "low" = 0,
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}
