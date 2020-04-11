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
      <div className='row justify-content-center'>
        <div className='col-md-12 col-lg-6 px-2 pb-4'>
          <SimpleSlider className='px-3'>
            {drink.carousel.map(item =>
              <img src={item} key={item} alt='item'></img>
            )}
          </SimpleSlider>
        </div>
        <div className={clsx('col-md-12 col-lg-6 pb-4 row justify-content-around align-items-center', styles.bordered)}>
          <div className={clsx('col-12  col-sm-6 px-2 h-80', styles.wrapper)}>
            <div className='px-2 py-3'>
              <h3>Składniki</h3>
              <ul>
                {drink.ingredients.map(ingredient =>
                  <li key={ingredient}>{ingredient}</li>
                )}
              </ul>
            </div>
          </div>
          <div className={clsx('col-12  col-sm-6 px-2 h-80', styles.wrapper)}>
            <div className='px-2 py-3'>
              <h3>Wykonanie</h3>
              <ol>
                {drink.actions.map(action =>
                  <li key={action}>{action}</li>
                )}
              </ol>
            </div>
          </div>
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
