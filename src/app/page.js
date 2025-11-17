import Landing from '@/components/Landing';
import { supabase } from '../../lib/supabaseClient'
import Shop from '@/components/Shop';

export default async function Home() {

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
    </div>
  )
}
