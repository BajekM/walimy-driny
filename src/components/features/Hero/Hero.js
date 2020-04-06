import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {settings} from '../../../data/dataStore';


// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Hero.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div></div>
    <div className={styles.inner}>
      <blockquote>{settings.hero.heroQuotation}</blockquote>
      <span className={styles.author}>-- {settings.hero.author}</span>
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
  Component as Hero,
  // Container as Hero,
  Component as HeroComponent,
};
