'use client';

import { useState } from 'react';
import { pricingPlans, PricingPlan } from '@/app/data/pricing-plans';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/app/hooks/AuthContext';
import toast from 'react-hot-toast';

interface PricingProps {
  onSelectPlan?: (plan: PricingPlan) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const { user } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState('btc');
  const [loading, setLoading] = useState<string | null>(null);

  const currencies = [
    { code: 'btc', name: 'Bitcoin', symbol: '₿' },
    { code: 'eth', name: 'Ethereum', symbol: 'Ξ' },
    { code: 'usdttrc20', name: 'USDT', symbol: '$' },
    { code: 'ltc', name: 'Litecoin', symbol: 'Ł' },
    { code: 'doge', name: 'Dogecoin', symbol: 'Ð' },
  ];

  const handleSelectPlan = async (plan: PricingPlan) => {
    if (!user) {
      toast.error('Please sign in to access server access', {
        style: {
          background: '#333',
          color: '#fff',
        }
      });
      return;
    }

    setLoading(plan.id);

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          payCurrency: selectedCurrency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      // Store payment info in localStorage for status checking
      localStorage.setItem('currentPayment', JSON.stringify({
        paymentId: data.payment.paymentId,
        planId: plan.id,
        amount: plan.price,
      }));

      // Call the onSelectPlan callback if provided
      if (onSelectPlan) {
        onSelectPlan(plan);
      }

      // Show payment details in a modal or redirect to payment page
      toast.success('Server access activated! Complete payment to activate.', {
        style: {
          background: '#333',
          color: '#fff',
        }
      });

      // You can redirect to a payment page or show payment details in a modal
      window.open(data.payment.paymentUrl || '/payment/success');

    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast.error(error.message || 'Failed to activate server access', {
        style: {
          background: '#333',
          color: '#fff',
        }
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Choose Your Flashing Server
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Select the perfect server for your crypto flashing operations
          </p>
        </div>

        {/* Currency Selector */}
        <div className="mt-8 flex justify-center">
          <div className="bg-gray-950 rounded-lg p-2 shadow-sm border border-gray-950">
            <div className="flex space-x-2">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCurrency === currency.code
                      ? 'bg-green-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {currency.symbol} {currency.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 ">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-950 rounded-lg shadow-lg divide-y divide-gray-700 border ${
                plan.popular
                  ? 'border-2 border-green-800 transform scale-105'
                  : 'border-gray-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-lg font-medium text-white">{plan.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className="text-base font-medium text-gray-400"> USD</span>
                </p>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={loading === plan.id}
                  className={`mt-8 w-full py-3 px-6 border border-transparent rounded-md text-center text-sm font-medium transition-colors ${
                    plan.popular
                      ? 'bg-green-800 text-white hover:bg-green-700 focus:ring-green-800'
                      : 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Activating Server...
                    </div>
                  ) : (
                    'Activate Server'
                  )}
                </button>
              </div>

              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                  Features included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex space-x-3">
                      <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-800" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}
