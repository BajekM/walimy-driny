import React from 'react';
import PropTypes from 'prop-types';

import SimpleSlider from '../../features/DrinkProductCarousel/Carousel';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/drinksRedux';

import styles from './DrinkId.module.scss';

const Component = ({className, match, drinks }) => {
  const drink = drinks.find(item => item.name === match.params.id);
  return (
    <div className={clsx(className, styles.root)}>
      <h2>{match.params.id}</h2>
      <div className='row'>
        <div className='col-6 px-2 pb-4'>
          <SimpleSlider>
            {drink.carousel.map(item =>
              <img src={item} key={item} alt='item'></img>
            )}
          </SimpleSlider>
        </div>
        <div className='col-6 00'>
          <div className={clsx('col-12', 'px-2', 'py-3', 'mb-4', styles.border)}>Skladniki</div>
          <div className={clsx('col-12', 'px-2', 'py-3', styles.border)}>Wykonanie</div>
        </div>
      </div>
      <div className='my-5'>
        <iframe
          title='dfs'
          width='100%'
          height='600'
          src={drink.video}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
        </iframe>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  drinks: PropTypes.array,
};

const mapStateToProps = state => ({
  drinks: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as DrinkId,
  Container as DrinkId,
  Component as DrinkIdComponent,
};
