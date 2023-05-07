import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    body: string()
      .required("Body is required")
      .min(120, "Body is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    taskId: string().required("taskId is required"),
  }),
};

export const createTaskValidationSchema = object({
  ...payload,
});

export const updateTaskValidationSchema = object({
  ...params,
  ...payload,
});

export const deleteTaskValidationSchema = object({
  ...params,
});
