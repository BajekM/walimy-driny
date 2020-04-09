import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../common/Icon/Icon';

import clsx from 'clsx';

import { settings } from '../../../data/dataStore';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Socials.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root, 'd-flex', 'justify-content-around')}>
    {settings.socials.map(item =>
      <a  key={item.name} href={item.href} className={clsx(styles.social, 'd-flex', 'justify-content-center', 'align-items-center')}>
        <div>
          <Icon name={item.icon}/>
        </div>
      </a>
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
  Component as Socials,
  // Container as Socials,
  Component as SocialsComponent,
};
