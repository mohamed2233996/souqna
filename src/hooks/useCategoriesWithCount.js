import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export const useCategoriesWithCount = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)

            const { data, error } = await supabase
                .from('category_with_cont')
                .select('*')
                .order('products_count', { ascending: false })

            if (error) {
                setError(error)
            } else {
                setCategories(data)
            }

            setLoading(false)
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}
