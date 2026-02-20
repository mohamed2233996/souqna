import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { amount, currency, items, user } = body;

        // 1. Authentication Request
        const authResponse = await axios.post(
            'https://accept.paymob.com/api/auth/tokens',
            { api_key: process.env.PAYMOB_API_KEY }
        );
        const authToken = authResponse.data.token;

        // 2. Order Registration
        const orderResponse = await axios.post(
            'https://accept.paymob.com/api/ecommerce/orders',
            {
                auth_token: authToken,
                delivery_needed: 'false',
                amount_cents: Math.round(amount * 100),
                currency: currency || 'EGP',
                items: items || [],
            }
        );
        const orderId = orderResponse.data.id;

        // 3. Payment Key Request
        const paymentKeyResponse = await axios.post(
            'https://accept.paymob.com/api/acceptance/payment_keys',
            {
                auth_token: authToken,
                amount_cents: Math.round(amount * 100),
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

        return NextResponse.json({
            success: true,
            paymentToken: paymentKeyResponse.data.token,
            orderId,
        }, { status: 200 });

    } catch (error) {
        console.error('Paymob Error:', error);
        return NextResponse.json({
            success: false,
            message: 'حدث خطأ في إنشاء عملية الدفع'
        }, { status: 500 });
    }
}