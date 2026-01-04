'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1️⃣ جلب اليوزر مرة واحدة
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user ?? null);
            setLoading(false);
        });

        // 2️⃣ متابعة أي تغيير (login / logout)
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook جاهز
export function useAuth() {
    return useContext(AuthContext);
}
