"use client";

import { useTransition, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ZodRegisterSchema } from '@/schemas';
import type { RegisterSchema } from '@/schemas';


import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { register } from '@/actions/register';



export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const formLogin = useForm<RegisterSchema>({
    resolver: zodResolver(ZodRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = (values: RegisterSchema) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success)
        });
    });

  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...formLogin}>
        <form onSubmit={formLogin.handleSubmit(onSubmit)}
          className='space-y-4'>
          <div className="space-y-4">
            <FormField control={formLogin.control} name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='John Doe'
                      type='text'
                      disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={formLogin.control} name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='john.doe@example.com'
                      type='email'
                      disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={formLogin.control} name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <div className="space-y-4"></div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>Create an account</Button>
        </form>
      </Form>
    </CardWrapper >
  )
}