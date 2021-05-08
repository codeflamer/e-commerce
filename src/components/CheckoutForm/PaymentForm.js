import React from 'react';
import {Divider,Typography,Button} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe('pk_test_51In9pSFuL9KodL5tJIrA6nklV9aoBuoUwi4dHW7n9UsBPrjcVYBPYNWj3n084ngzBZjbn22S70Azo7nr2ehLxljx00rnQlIQje');

const PaymentForm = ({shippingData,checkoutToken,backStep,onCaptureCheckout,nextStep}) => {

    const handleSubmit = async(event,stripe,elements)=>{
        event.preventDefault();
        
       
        if (!stripe || !elements) return
       
        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            
            const orderData = {
                line_items:checkoutToken.live.line_items,
                customer:{
                    firstname:shippingData.firstName,
                    lastname:shippingData.lastName,
                    email:shippingData.email
                },
                shipping:{
                    name:'Primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    country_state:shippingData.shippingSubDivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry
                },
                // fufillment:{shipping_method:shippingData.shippingOption},
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.id,orderData);
            console.log(checkoutToken.id,orderData);
            nextStep();
        }

    }

    return (
        <div>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant='h6' gutterBottom style={{magin:'20px'}}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({stripe,elements})=>(
                           <form onSubmit = {(e)=>handleSubmit(e,stripe,elements)}>
                            <CardElement/>
                            <br/><br/>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button variant='outlined' onClick={backStep}>Back</Button>
                                <Button type="submit" disabled={!stripe}  variant='contained' color='primary'>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm
