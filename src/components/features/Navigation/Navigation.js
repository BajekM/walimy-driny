import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { settings } from '../../../data/dataStore';

import { Icon } from '../../common/Icon/Icon';
import { FaCocktail } from 'react-icons/fa';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Navigation.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)} id='nav'>
    {settings.nav.map(item =>
      <NavLink
        key={item.id}
        exact to={item.path}
        activeClassName={styles.active}>
        <div>
          {item.icon === 'cocktail' ? <FaCocktail /> : <Icon name={item.icon}/>}
          {/* <Icon name={item.icon}/> */}
        </div>
      </NavLink>
    )}
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
  Component as Navigation,
  // Container as Navigation,
  Component as NavigationComponent,
};
