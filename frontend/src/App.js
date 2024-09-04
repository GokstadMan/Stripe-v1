import './App.css';
import React, {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import LEDLamp from "./components/images/030024.png"

function App() {
  const [product,setProduct] = useState({
    name: "LEDLamp no 1 from BØ",
    price: 50,
    poductBy: "Ben Øhman"
  });

  const makeCharge = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch("http://localhost:5000/charge",{
      method: "POST",
      headers,
      body: JSON.stringify(body)})
      .then(response => {
        console.log("Response ", response)
        const status = {response};
        console.log("Status", status)
      })
      .catch(error => console.log(error));
    

  }

  return (
    <div>
      <h1 className='text-6xl text-center bg-lime-500'>Wonderful world of Stripe:</h1> <br/>
      <img src={LEDLamp} alt='LEDLAmp'/>
      <StripeCheckout stripeKey={
        process.env.REACT_APP_KEY} 
        amount={product.price*100}
        shippingAddress
        billingAddress
        allowRememberMe
        token={makeCharge} 
        name='Buy LEDlamps'></StripeCheckout>
      <br/> <br/>
      <button type="button" className='text-white text-xl bg-purple-800 rounded'>Buy LEDlamp for {product.price} NOK</button>
    </div>
  );
}

export default App;