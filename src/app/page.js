import Landing from '@/components/Landing';
import { supabase } from '../../lib/supabaseClient'
import Shop from '@/components/Shop';
import FirstOrder from '@/components/FirstOrder';
import WhyChooseUs from '@/components/WhyChooseUs';
import FavoriteProducts from '@/components/FavoriteProducts';

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
      <FavoriteProducts />
      <Shop />
      <FirstOrder />
      <WhyChooseUs />
    </div>
  )
}
