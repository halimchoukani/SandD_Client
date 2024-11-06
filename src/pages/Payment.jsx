// stripe imports
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
const stripePromise = loadStripe('pk_test_51PFFUzHRQLj7s4nIJK5th2BUE2DlfNNs2FW96mpQJHFuVXb97b8oBpM4c4AIzGvVAml5e37IaHg5vr93VFxi8mhD00AWixtWHD');

export default function Payment() {
    const [clientSecret, setClientSecret] = useState('')
    const navigate = useNavigate();
    const appearance = {
        theme: 'flat', // or another theme if you prefer
        variables: {
            colorBackground: '#1a1a1a',       // Background color for the form
            colorPrimary: '#4f46e5',          // Primary color for buttons and accents
            colorText: '#f3f4f6',             // Light gray text, similar to `text-gray-100`
            colorTextSecondary: '#a1a1a1',    // Secondary text color (lighter gray)
            colorDanger: '#f56565',           // Color for error messages
            borderRadius: '8px',              // Rounded borders
        },
        rules: {
            '.Input': {
                color: '#f3f4f6',             // Input text color (also light gray)
                borderColor: '#4f46e5',       // Border color for inputs
                borderWidth: '1px',
            },
            '.Label': {
                color: '#a1a1a1',             // Label color
            },
        }
    };
    

    useEffect(() => {

        // get the USERID 
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const decoded = jwtDecode(token);
        const id = Number(decoded.sub);
        const amount = localStorage.getItem('paymentAmount')
        console.log(amount);
            
        const data = 
        {  
            amount: parseFloat(amount)*100 ,
            user: {
                id: id
            },
            currency: "usd"
        }
        fetch('http://localhost:8089/api/payment/secure/payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data ) // Convert to cents
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.client_secret);
                console.log(data.client_secret);
            })
    }, [])
    
  return (
    <>
        { clientSecret != "" && (
            <div className="min-h-screen bg-gray-950 text-gray-100">
                <Header />
                <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1  gap-8">
                        <Elements stripe={stripePromise}  options={{clientSecret: clientSecret,appearance: appearance}}>
                            <CheckoutForm clientSecret={clientSecret} />
                        </Elements>
                </div>
                </main>
                <Footer />
        </div>
        )
        }
    </>
  );
};