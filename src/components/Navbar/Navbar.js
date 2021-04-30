import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
// import classes from '*.module.css';
import logo from '../../assets/commerce.png';
import useStyles from './styles';
import {Link,useLocation} from 'react-router-dom';



const Navbar = ({totalItems}) => {

    const Location= useLocation();
    
    const classes = useStyles();
    return (
        <>
          <AppBar position='fixed' className={classes.appBar} color='inherit'>
             <Toolbar>
                 <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt='Anonymous' height='25px' className={classes.image}/>
                   Anonymous
                 </Typography>
                 <div className={classes.grow}></div>
                 <div className={classes.button}>
                     {Location.pathname==='/'&&
                        (<IconButton component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>)
                        }
                 </div>
             </Toolbar>
          </AppBar>
        </>
    )
}

export default Navbar
