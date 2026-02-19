import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { amount, currency, items, user } = req.body;

        // Step 1: Authentication Request
        const authResponse = await axios.post(
            'https://accept.paymob.com/api/auth/tokens',
            {
                api_key: process.env.PAYMOB_API_KEY,
            }
        );

        const authToken = authResponse.data.token;

        // Step 2: Order Registration
        const orderResponse = await axios.post(
            'https://accept.paymob.com/api/ecommerce/orders',
            {
                auth_token: authToken,
                delivery_needed: 'false',
                amount_cents: amount * 100, // المبلغ بالقروش
                currency: currency || 'EGP',
                items: items || [],
            }
        );

        const orderId = orderResponse.data.id;

        // Step 3: Payment Key Request
        const paymentKeyResponse = await axios.post(
            'https://accept.paymob.com/api/acceptance/payment_keys',
            {
                auth_token: authToken,
                amount_cents: amount * 100,
                expiration: 3600,
                order_id: orderId,
                billing_data: {
                    apartment: user?.apartment || 'NA',
                    email: user?.email || 'test@test.com',
                    floor: user?.floor || 'NA',
                    first_name: user?.firstName || 'John',
                    street: user?.street || 'NA',
                    building: user?.building || 'NA',
                    phone_number: user?.phone || '01000000000',
                    shipping_method: 'NA',
                    postal_code: user?.postalCode || 'NA',
                    city: user?.city || 'Cairo',
                    country: user?.country || 'EG',
                    last_name: user?.lastName || 'Doe',
                    state: user?.state || 'Cairo',
                },
                currency: currency || 'EGP',
                integration_id: parseInt(process.env.PAYMOB_INTEGRATION_ID),
            }
        );

        const paymentToken = paymentKeyResponse.data.token;

        // إرجاع Payment Token للفرونت إند
        return res.status(200).json({
            success: true,
            paymentToken,
            orderId,
        });

    } catch (error) {
        console.error('Paymob Error:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ في إنشاء عملية الدفع',
            error: error.response?.data || error.message,
        });
    }
}