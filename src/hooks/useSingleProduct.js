import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export const useSingleProduct = (id) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()   

            if (error) {
                setError(error)
            } else {
                setProduct(data)
            }
            setLoading(false)
        }

        fetchProduct()
    }, [id])

    return { product, loading, error }
}