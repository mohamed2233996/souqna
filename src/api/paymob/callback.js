import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const data = req.body;

        // التحقق من صحة الـ HMAC (اختياري لكن مهم للأمان)
        // const hmac = data.hmac;
        // قم بالتحقق من الـ HMAC هنا

        if (data.success === 'true' || data.success === true) {
            // الدفع نجح
            console.log('Payment successful:', data);

            // هنا تحدث الداتابيز بتاعتك
            // await updateOrderStatus(data.order_id, 'paid');

            return res.status(200).json({ message: 'Payment verified' });
        } else {
            // الدفع فشل
            console.log('Payment failed:', data);
            return res.status(400).json({ message: 'Payment failed' });
        }

    } catch (error) {
        console.error('Callback Error:', error);
        return res.status(500).json({ message: 'Error processing callback' });
    }
}