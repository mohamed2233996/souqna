import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export const useRelatedProducts = (category, currentProductId) => {
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!category || !currentProductId) return;

        const fetchRelated = async () => {
            setLoading(true)
            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('category', category) // هات نفس القسم
                .neq('id', currentProductId) // استبعد المنتج اللي معروض دلوقتي
                .limit(4); // كفاية 4 منتجات تحت

            if (data) setRelated(data);
            setLoading(false)
        }

        fetchRelated()
    }, [category, currentProductId])

    return { related, loading }
}