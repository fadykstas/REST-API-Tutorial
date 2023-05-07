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
    postId: string().required("postId is required"),
  }),
};

export const createPostValidationSchema = object({
  ...payload,
});

export const updatePostValidationSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({
  ...params,
});
