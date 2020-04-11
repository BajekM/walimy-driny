import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../images/400dpiLogo.png';
// import {settings} from '../../../data/dataStore';

import {GoogleButton} from '../../common/GoogleButton/GoogleButton';
import {Login} from '../../common/Login/Login';
import {Basket} from '../../common/Basket/Basket';

import {Icon}  from '../../common/Icon/Icon';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './TopBar.module.scss';




console.log(logo);

const Component = ({className}) => (
  <div className={clsx(className, styles.root, 'justify-content-between py-2')}>
    <div className={clsx(styles.logoWrappper, 'col-xl-2 col-sm-6 col-12')}>
      <img src={logo} alt="logo"></img>
    </div>
    <div className={clsx(styles.loginWrapper, 'col-xl-4 col-sm-6 col-12')}>
      <GoogleButton />
      {/* <Login /> */}
    </div>
    <div className={clsx(styles.basketWrapper, 'col-xl-6 col-sm-12')}>
      <Basket />
      <Icon name='angle-down'/>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as TopBar,
  // Container as TopBar,
  Component as TopBarComponent,
};
