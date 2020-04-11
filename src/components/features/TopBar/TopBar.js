import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../images/400dpiLogo.png';
// import {settings} from '../../../data/dataStore';

import {GoogleButton} from '../../common/GoogleButton/GoogleButton';
import {Login} from '../../common/Login/Login';
import {Basket} from '../../common/Basket/Basket';

import {Icon}  from '../../common/Icon/Icon';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, fetchUser, logOut } from '../../../redux/userRedux';

import styles from './TopBar.module.scss';


const Component = ({className, user, getLoggedUser, getLoggedOut}) => {
  getLoggedUser();
  console.log('user', user);

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
      <div className={clsx(styles.basketWrapper, 'col-xl-6 col-sm-12')}>
        <Basket />
        <Icon name='angle-down'/>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string,
  getLoggedUser: PropTypes.func,
  getLoggedOut: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  getLoggedUser: () => dispatch(fetchUser()),
  getLoggedOut: () => dispatch(logOut()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as TopBar,
  Container as TopBar,
  Component as TopBarComponent,
};
