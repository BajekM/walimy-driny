import React from 'react';
import PropTypes from 'prop-types';


import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOrders } from '../../../redux/ordersRedux';

import styles from './Formula.module.scss';

const Component = ({className, orders, match}) => (
  <div className={clsx(className, styles.root)}>
    <form action={'/api/orders/basket/' + match.params.id} method="POST">
      <input type='text' id='imie' label="Imię" name='imie' placeholder='Imię' required />
      <input type='text' id='nazwisko' label="Nazwisko" name='nazwisko' placeholder='Nazwisko' required />
      <input type='text' id='ulica' label="Ulica" name='ulica' placeholder='Ulica' required />
      <input type='text' id='nrDomu' label="Nr domu" name='nrDomu' placeholder='Nr domu' required />
      <input type='text' id='nrMieszkania' label="Nr mieszkania" placeholder='Nr mieszkania' name='nrMieszkania' />
      <input type='text' id='kodPocztowy' label="Kod pocztowy" name='kodPocztowy' placeholder='Miejscowość' required />
      <input type='text' id='miejscowosc' label="Miejscowość" name='miejscowosc' placeholder='Kod pocztowy' required />
      <input type='text' id='telefon' label="Nr telefonu" name='telefon' placeholder='Nr telefonu' required />
      <input type='text' id='email' label='email' name='email' placeholder='email' required />
      <input type='submit' value='Potwierdź'></input>
    </form>
  </div>
);

Component.propTypes = {
  orders: PropTypes.object,
  className: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  orders: getOrders(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Formula,
  Container as Formula,
  Component as FormulaComponent,
};
