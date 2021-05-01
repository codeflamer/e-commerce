import React from 'react';
import {Grid,Container,Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';


const Cart = ({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {

    const classes = useStyles();
    console.log(cart);

    const EmptyCart = () =>{
        return(
            <Typography variant='subtitle1'>You have no items in your shopping Cart..
                <Link to='/' className={classes.link}>Start adding some</Link>
            </Typography>
        )
    };

    const FilledCart = () =>{
        return(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>{
                    return <Grid key={item.id} item xs={12} sm={4} md={3}>
                                <CartItem item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty}/>
                            </Grid>
                })}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.EmptyButton} size='large' variant='contained' type='button' color='secondary' onClick={handleEmptyCart}>Empty</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' variant='contained' type='button' color='primary' >Checkout</Button>
                </div>
            </div>
        </>
        )
    };

    if( !cart.line_items) return 'Loading...';

    return (
       <Container>
           <div className={classes.toolbar}></div>
           <Typography variant='h4' className={classes.title} gutterBottom>Your Shopping Cart</Typography>
           {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
       </Container>
    )
}

export default Cart
