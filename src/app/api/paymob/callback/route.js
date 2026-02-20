import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.json();

        // التأكد من حالة الدفع
        const isSuccess = data.success === 'true' || data.success === true || data.obj?.success === true;

        if (isSuccess) {
            console.log('Payment successful:', data);
            
            // هنا كود تحديث الداتابيز لما الدفع ينجح
            
            return NextResponse.json({ message: 'Payment verified' }, { status: 200 });
        } else {
            console.log('Payment failed:', data);
            return NextResponse.json({ message: 'Payment failed' }, { status: 400 });
        }

    } catch (error) {
        console.error('Callback Error:', error);
        return NextResponse.json({ message: 'Error processing callback' }, { status: 500 });
    }
}