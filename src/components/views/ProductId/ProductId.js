import React from 'react';
import PropTypes from 'prop-types';

import SimpleSlider from '../../features/DrinkProductCarousel/Carousel';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';

import styles from './ProductId.module.scss';

const Component = ({className, match, products }) => {
  const product = products.find(item => item.name === match.params.id);
  return (
    <div className={clsx(className, styles.root)}>
      <h2>{match.params.id}</h2>
      <div className='row'>
        <div className='col-6 px-2 pb-4'>
          <SimpleSlider>
            {product.carousel.map(item =>
              <img src={item} key={item} alt='item'></img>
            )}
          </SimpleSlider>
        </div>
        <div className='col-6 00'>
          <div className={clsx('col-12', 'px-2', 'py-3', 'mb-4', styles.border)}>Sklep</div>
          <div className={clsx('col-12', 'px-2', 'py-3', styles.border)}>Opis</div>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as productId,
  Container as ProductId,
  Component as ProductIdComponent,
};
