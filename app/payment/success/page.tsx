'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentStatus from '@/app/components/PaymentStatus';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [paymentComplete, setPaymentComplete] = useState(false);

    useEffect(() => {
        // Get payment ID from URL params or localStorage
        const urlPaymentId = "5601831053"//searchParams?.get('payment_id');
        const storedPayment = localStorage.getItem('currentPayment');

        if (urlPaymentId) {
            setPaymentId(urlPaymentId);
        } else if (storedPayment) {
            try {
                const payment = JSON.parse(storedPayment);
                setPaymentId(payment.paymentId);
            } catch (error) {
                console.error('Error parsing stored payment:', error);
            }
        }
    }, [searchParams]);

    const handlePaymentComplete = () => {
        setPaymentComplete(true);
        // Clear stored payment
        localStorage.removeItem('currentPayment');
    };

    if (paymentComplete) {
        return (
            <Suspense>
                fallback={
                    <div className="flex justify-center items-center min-h-screen">
                        <LoaderCircle className="animate-spin size-8" />
                    </div>
                }
                <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-800" />
                            <h2 className="mt-6 text-3xl font-extrabold text-green-800">
                                Payment Successful!
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Your plan has been upgraded successfully. You can now access all the features of your new plan.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense >
        );
    }

    return (
        <Suspense>
            fallback={
                <div className="flex justify-center items-center min-h-screen">
                    <LoaderCircle className="animate-spin size-8" />
                </div>
            }
            <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-green-900">
                            Payment Processing
                        </h2>
                        <p className="mt-2 text-sm text-green-600">
                            Please wait while we process your payment.
                        </p>
                    </div>

                    {paymentId ? (
                        <PaymentStatus
                            paymentId={paymentId}
                            onPaymentComplete={handlePaymentComplete}
                        />
                    ) : (
                        <div className="text-center">
                            <p className="text-sm text-green-500">
                                No payment information found. Please check your email or contact support.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Suspense>
    );
}
