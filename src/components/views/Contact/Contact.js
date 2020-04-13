import React from 'react';
import PropTypes from 'prop-types';

import { settings } from '../../../data/dataStore';

import { Socials } from '../../common/Socials/Socials';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Contact.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Kontakt</h2>
    <div className='row'>
      <div className='col-12 col-md-6 px-2 pb-4'>
        <iframe
          title= 'map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d640.550597250397!2d19.951939329263528!3d50.04503985995152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b44f246b04d%3A0x6fef551f6bea8340!2sKrakusa%2016%2C%2030-535%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1586440684470!5m2!1spl!2spl'
          width='100%'
          height='450'
          frameBorder='0'
          allowFullScreen=''
          aria-hidden='false'
          tabIndex='0'>
        </iframe>
      </div>
      <div className='col-12 col-md-6'>
        <div className={clsx('col-12', 'px-2', 'py-3', 'mb-4', styles.border)}>
          <h3 className='mb-3'>Nasze social media</h3>
          <Socials className={styles.socials}/>
        </div>
        <div className={clsx('col-12', 'px-2', 'py-3', 'mb-4')}>
          <h3 className='mt-3'>{settings.contactData.name}</h3>
          <ul>
            {!settings.contactData.apartmentNumber ?
              <li>{`${settings.contactData.street} ${settings.contactData.houseNumber}`}</li> :
              <li>{`${settings.contactData.street} ${settings.contactData.houseNumber}/${settings.contactData.apartmentNumber}`}</li>
            }
            <li>{`${settings.contactData.postalCode}, ${settings.contactData.city}`}</li>
            <li>{`phone: ${settings.contactData.phone}`}</li>
            <li>email: <a href={`mailto:${settings.contactData.email}`}>{settings.contactData.email}</a></li>
          </ul>
        </div>
      </div>
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
  Component as Contact,
  // Container as Contact,
  Component as ContactComponent,
};
