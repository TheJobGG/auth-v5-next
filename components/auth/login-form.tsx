"use client";

import { useTransition, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ZodLoginSchema } from '@/schemas';
import type { LoginSchema } from '@/schemas';


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
import { login } from '@/actions/login';



export function LoginForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const formLogin = useForm<LoginSchema>({
    resolver: zodResolver(ZodLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: LoginSchema) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success)
        });
    });

  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...formLogin}>
        <form onSubmit={formLogin.handleSubmit(onSubmit)}
          className='space-y-4'>
          <div className="space-y-4">
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
          <Button disabled={isPending} type='submit' className='w-full'>Login</Button>
        </form>
      </Form>
    </CardWrapper >
  )
}