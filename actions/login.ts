"use server";

import * as z from 'zod';
import { ZodLoginSchema } from '@/schemas';
import type{ LoginSchema } from '@/schemas';

export const login =  async (values:LoginSchema) => {
  
  const validateFields = ZodLoginSchema.safeParse(values)

  if(!validateFields.success) {
    return {error: 'Invalid fields'}
  }

  return {success: 'Email sent!'}
  
}