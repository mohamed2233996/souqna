"use client";
import Landing from '@/components/Landing';
import { supabase } from '../../lib/supabaseClient'
import Shop from '@/components/Shop';
import Toast from '@/components/Toast';
import { useState } from 'react';


export default async function Home() {
  const [toast, setToast] = useState(null);
  
// const { data: products, error } = await supabase
//     .from('products')
//     .select('*')

//     console.log(products)
//   if (error) {
//     console.error(error)
//     return <div>Error loading products</div>
//   }


  return (
    <div className="pt-20">
      <Landing  />
      <Shop />

      {toast && (
        <Toast
          message={toast.message}
          onClose={() => setToast(null)}
          type={toast.type}
        />
      )}
    </div>
  )
}
