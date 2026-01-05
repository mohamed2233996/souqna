import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useUserProfile(userId) {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return

        const getProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (!error) setProfile(data)
            setLoading(false)
        }

        getProfile()
    }, [userId])

    return { profile, loading }
}
