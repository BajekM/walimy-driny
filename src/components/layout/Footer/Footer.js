import React from 'react';
import PropTypes from 'prop-types';

import { settings } from '../../../data/dataStore';

import { Socials } from '../../common/Socials/Socials';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Footer.module.scss';



const Component = ({className}) => (
  <div className={clsx(className, styles.root, 'row')}>
    <div className='col-md-6 col-12 col-lg-3'>
      <h3>{settings.contactData.name}</h3>
      <ul>
        {!settings.contactData.apartmentNumber ?
          <li>{`${settings.contactData.street} ${settings.contactData.houseNumber}`}</li> :
          <li>{`${settings.contactData.street} ${settings.contactData.houseNumber}/${settings.contactData.apartmentNumber}`}</li>
        }
        <li>{`${settings.contactData.postalCode}, ${settings.contactData.city}`}</li>
        <li>{`phone: ${settings.contactData.phone}`}</li>
        <li>email: <a href={`mailto:${settings.contactData.email}`} className={styles.mail}>{settings.contactData.email}</a></li>
      </ul>
    </div>
    <div className='col-md-6 col-12 col-lg-3'>
      <h3>Bądź na bieżąco :)</h3>
      <h3 className='mb-5'>Znajdziesz nas tu:</h3>
      <Socials />
    </div>
    <div className='col-md-6 col-12 col-lg-3'>
      <h3>Polecane:</h3>
      <ul className={styles.recommended}>
        {settings.recommended.map(item =>
          <a key={item.id} className={styles.recommended} href={item.href}><li>{item.name}</li></a>
        )}
      </ul>
    </div>
    <div className=' col-md-6 col-12 col-lg-3'>
      <h3>Parę słów ode mnie...</h3>
      <p>Lorem...</p>
    </div>
    <div className={clsx('col-12', styles.copyrights)}>&copy; Copyright 2020 by Walimy Driny. All rights reserved.</div>
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
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
