import React from 'react';
import PropTypes from 'prop-types';

import {Icon}  from '../Icon/Icon';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Basket.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div>
      <Icon name='shopping-cart' />
      <div className={styles.amount}><span>0</span></div>
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
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
  Component as Basket,
  // Container as Basket,
  Component as BasketComponent,
};
