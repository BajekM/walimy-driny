import React, {useState} from 'react';
import PropTypes from 'prop-types';
import logo from '../../../images/400dpiLogo.png';
// import {settings} from '../../../data/dataStore';

import {GoogleButton} from '../../common/GoogleButton/GoogleButton';
import {Login} from '../../common/Login/Login';
import {Basket} from '../../common/Basket/Basket';
import {Icon}  from '../../common/Icon/Icon';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, fetchUser, logOut } from '../../../redux/userRedux';

import styles from './TopBar.module.scss';
import { getBasket, changeAmount } from '../../../redux/ordersRedux';



const Component = ({className, user, getLoggedUser, getLoggedOut, basket, setAmount}) => {
  getLoggedUser();
  // console.log('user', user);

  const calculatePrice = (items) => {
    let price = 0;
    for (let item of items) {
      price = price + item.price * item.amount;
    }
    return price;
  };

  const calculateAmount = (items) => {
    let amount = 0;
    for (let item of items) {
      amount = amount + parseInt(item.amount);
    }
    console.log(amount);
    return amount;
  };


  const [basketActive, setBasketActive] = useState(false);
  const [basketAmount, setBasketAmount] = useState(basket ? calculatePrice(basket.products) : 0);

  console.log('state', basketAmount);



  return (
    <div className={clsx(className, styles.root, 'justify-content-between py-2')}>
      <div className={clsx(styles.logoWrappper, 'col-xl-2 col-sm-6 col-12')}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={clsx(styles.loginWrapper, 'col-xl-4 col-sm-6 col-12')}>
        {!user || user === 'loggedOut'?
          <GoogleButton /> :
          <div className='d-flex ml-2 align-items-center'>
            <Login name={user.displayName}/>
            <a className={styles.logOut} href='/auth/auth.logout' onClick={() => getLoggedOut()}>Wyloguj</a>
          </div>
        }
      </div>
      <div className='col-xl-6 col-sm-12 col-12 d-flex justify-content-end'>
        <div className={clsx(styles.basketWrapper, basketActive ? 'd-flex position-relative align-items-center': 'd-flex position-relative align-items-center col-xl-6 col-sm-5 col-12')}>
          {basketActive ?
            <div className={clsx('position-absolute w-100 h-100', styles.basket)}>
              {basket ? basket.products.map(product =>
                <div key={product.name} className={clsx('px-3 py-3 row justify-content-between align-items-center m-0', styles.basketProduct)}>
                  <TextField
                    className='col-md-2 col-sm-2'
                    id='amount'
                    label='Ilość'
                    type='number'
                    defaultValue= {product.amount}
                    onChange= {e => setAmount({
                      id: product.id,
                      amount: e.target.value,
                    })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 99,
                    }}
                  />
                  <div className='col-md-3 col-sm-6'><span>{product.name}</span></div>
                  <div className='col-md-4 col-sm-12 my-4'><TextareaAutosize className='w-100' aria-label='empty textarea' placeholder='Uwagi'/></div>
                  <div className='col-md-2 col-sm-6'>{product.price * product.amount}zł</div>
                  <div className='col-md-1 col-sm-6'><Icon name={'trash'}></Icon></div>
                </div>
              ) : ''}
              <div className={clsx('px-3 py-3 d-flex justify-content-end align-tems-center', styles.total)}>
                <div className='px-2'>Kwota: </div>
                <div className='px-2 d-flex'>{calculatePrice(basket.products)}zł</div>
                <div className='text-right'><button className='mr-4 px-2 py-1'>Zamów</button></div>
              </div>
            </div> : ''
          }
          <Basket amount={basket ? calculateAmount(basket.products) : 0}/>
          {basketActive ?
            <div className={styles.basketControls} onClick={() => setBasketActive(false)}><Icon name='angle-up'/></div> :
            <div className={styles.basketControls} onClick={() => setBasketActive(true)}><Icon name='angle-down'/></div>
          }
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string,
  getLoggedUser: PropTypes.func,
  getLoggedOut: PropTypes.func,
  basket: PropTypes.object,
  setAmount: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
  basket: getBasket(state),
});

const mapDispatchToProps = dispatch => ({
  getLoggedUser: () => dispatch(fetchUser()),
  getLoggedOut: () => dispatch(logOut()),
  setAmount: (obj) => dispatch(changeAmount(obj)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as TopBar,
  Container as TopBar,
  Component as TopBarComponent,
};
