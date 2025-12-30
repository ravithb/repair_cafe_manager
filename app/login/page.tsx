'use client';
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

function LoginButton(){
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const router = useRouter()

  return (<button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" onClick={() => {signIn("google", { callbackUrl }); router.refresh()}}>Sign in</button>);
}

export default function Login() {

  

  return (<>
    {/* Outer container: Flexbox makes the child (box) perfectly centered */}
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Inner box: Shadow, rounded corners, and padding */ }
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Please Login
        </h3>
        
        <p className="text-gray-600 mb-6">
          Please click below to sign in using your makerspace / samakers email credentials.
        </p>
        <Suspense>
          <LoginButton />
        </Suspense>
      </div>
    </div>
   </>
      
  );
}