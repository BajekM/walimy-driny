import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchAllProducts } from '../../../redux/productsRedux';

import { Pagination } from '../../common/Pagination/Pagination';

import styles from './Shop.module.scss';

const Component = ({className, products, fetchProducts}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  // Get current products
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrevious = () => setCurrentPage(currentPage - 1);

  fetchProducts();
  return (
    <div className={clsx(className, styles.root, 'row')}>
      {currentProducts.map(product =>
        <div key={product.name} className={clsx(styles.productItem, 'col-12 col-sm-6 col-md-4 col-lg-3')}>
          <Link exact to={`/product/${product.name}`}>
            <div>
              <h2>{product.name}</h2>
              <img src={product.image} alt='product'></img>
              <p>{product.description}</p>
            </div>
          </Link>
        </div>
      )}
      <Pagination
        itemsPerPage={productsPerPage}
        totalItems={products.length}
        paginate={paginate}
        paginateNext={paginateNext}
        paginatePrevious={paginatePrevious}
        currentPage={currentPage}
      />
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
