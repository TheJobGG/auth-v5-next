import * as z from 'zod';

// Login Schema

export const ZodLoginSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(1, 'Password is required')
})

export type LoginSchema = z.infer<typeof ZodLoginSchema>;


// Register Schema

export const ZodRegisterSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(6, 'Minimum 6 characters required'),
  name: z.string().min(1, 'Name is required')
})

export type RegisterSchema = z.infer<typeof ZodRegisterSchema>;