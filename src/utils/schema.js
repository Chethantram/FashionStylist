import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    avatarUrl: z.string().url("Invalid URL").optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
});

