import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export const useProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: true })

            if (error) {
                setError(error)
            } else {
                setProducts(data)
            }

            setLoading(false)
        }

        fetchProducts()
    }, [])

    return { products, loading, error }
}
