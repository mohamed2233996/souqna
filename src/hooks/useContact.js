import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const useContact = (tableName = 'contact_messages') => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const sendData = async (formData) => {
        setLoading(true);
        setError(null);
        
        try {
            const { error: supabaseError } = await supabase
                .from(tableName)
                .insert([formData]); //

            if (supabaseError) throw supabaseError;
            
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetStatus = () => {
        setSuccess(false);
        setError(null);
    };

    return { sendData, loading, success, error, resetStatus };
};