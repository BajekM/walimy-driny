import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchAllProducts } from '../../../redux/productsRedux';

import styles from './Shop.module.scss';

const Component = ({className, products, fetchProducts}) => {
  fetchProducts();
  return (
    <div className={clsx(className, styles.root, 'row')}>
      {products.map(product =>
        <div key={product.name} className={clsx(styles.productItem, 'col-3')}>
          <Link exact to={`/product/${product.name}`}>
            <div>
              <h2>{product.name}</h2>
              <img src={product.image} alt='product'></img>
              <p>{product.description}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchAllProducts()),
});


const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Shop,
  Container as Shop,
  Component as ShopComponent,
};
