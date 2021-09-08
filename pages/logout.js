import nookies from 'nookies';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast'
import React, { useEffect } from 'react';

export default function logout() {
  const router = useRouter();
  useEffect(() => {
    nookies.destroy(null,'USER',{path:'/'});
    nookies.destroy(null,'USER_TOKEN',{path:'/'});

    toast.success("Logout efetuado com sucesso!");

    setTimeout(() =>{
      router.push('/login');
    },2000)
  }, [])
  return <> 
  <div><Toaster/></div>
  </>

}