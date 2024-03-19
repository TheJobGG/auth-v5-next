"use server";

import bcrypt from 'bcrypt';
import { ZodRegisterSchema } from '@/schemas';
import type { RegisterSchema } from '@/schemas';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: RegisterSchema) => {

  const validateFields = ZodRegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, name, password } = validateFields.data

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Email already in use!' };

  const hashedPassword = await bcrypt.hash(password, 11)

  await db.user.create({
    data: {
      name, email, password: hashedPassword
    }
  });

  // TODO : Send verification token email


  return { success: 'User created!' }

}