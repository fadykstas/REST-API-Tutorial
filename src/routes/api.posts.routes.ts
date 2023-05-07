import { Express, Router } from "express";
import {
    createPostHandler,
    updatePostHandler,
    getPostHandler,
    deletePostHandler,
} from "../controller/post.controller";
import { validateRequest, requiresUser } from "../middleware";
import {
    createPostValidationSchema,
    updatePostValidationSchema,
    deletePostSchema,
} from "../validator/post.validator";

export default function (app: Express) {
    const postsRouter = Router();

    // Create a post
    postsRouter.post(
        "/",
        [requiresUser, validateRequest(createPostValidationSchema)],
        createPostHandler
    );

    // Update a post
    postsRouter.put(
        "/:postId",
        [requiresUser, validateRequest(updatePostValidationSchema)],
        updatePostHandler
    );

    // Get a post
    postsRouter.get("/:postId", getPostHandler);

    // Delete a post
    postsRouter.delete(
        "/:postId",
        [requiresUser, validateRequest(deletePostSchema)],
        deletePostHandler
    );

    // Mount the posts router under '/api/posts'
    app.use("/api/posts", postsRouter);
}
