import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ clientSecret }) => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const amount = localStorage.getItem('paymentAmount');
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            setError("Stripe has not loaded correctly.");
            setProcessing(false);
            return;
        }
        
        const payload = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/transaction",  // Optional redirect URL after successful payment
            },
            redirect: 'if_required'
        });
        console.log(payload.paymentIntent);
        const token = localStorage.getItem("token");
        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // Call your backend to complete the payment
            fetch('http://localhost:8089/api/payment/secure/payment-complete', {
                method: 'PUT',
                headers: {
                    'Authorization': token ,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: payload.paymentIntent.amount })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error('Error completing payment:', err));
        }
        // rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm lg:col-span-2
        navigate("/transaction");
    };
    return (
        <form onSubmit={handleSubmit} className="bg-gray-800  shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Complete Your Payment</h2>
            <div className="mb-4">
                <PaymentElement className="text-gray-100 border-gray-200 rounded-lg" />
            </div>
            <button
                type="submit"
                disabled={processing || !stripe}
                className={`w-full mt-6 py-3 text-white font-medium rounded-lg
                            ${processing || !stripe ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition duration-200'}
                            focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
                {processing ? 'Processing...' : `Pay Now - ${amount}TND `}
            </button>
            {error && <div className="text-red-500 mt-4 text-center font-medium">{error}</div>}
            {succeeded && <div className="text-green-500 mt-4 text-center font-medium">Payment succeeded!</div>}
        </form>
    );
};

export default CheckoutForm;
