import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: '600' });

export default function Home() {
  return (
    <main
      className='flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <h1 className={cn('text-6xl text-white drop-shadow-md', poppins.className)}>🔐 Auth</h1>
      <p className='text-white text-lg'>A simple authentication service</p>
      <div>
        <LoginButton>
          <Button variant='secondary' size='lg'>
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
