import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchAllProducts } from '../../../redux/productsRedux';

import { Pagination } from '../../common/Pagination/Pagination';
import { settings } from '../../../data/dataStore';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './Shop.module.scss';

const Component = ({className, products, fetchProducts}) => {


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2);
  const [category, setCategory] = useState('');
  const [startPrice, setStartPrice] = useState(1);
  const [endPrice, setEndPrice] = useState(1000);

  const filterProducts = (items) => {
    const filtered = [];
    if (category) {
      for (let item of items) {
        if (item.price >= startPrice && item.price <= endPrice && item.category === category) {
          filtered.push(item);
        }
      }
    }
    else{
      for (let item of items) {
        if (item.price >= startPrice && item.price <= endPrice) {
          filtered.push(item);
        }
      }
    }
    return filtered;
  };

  // Get current products
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = filterProducts(products).slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrevious = () => setCurrentPage(currentPage - 1);

  fetchProducts();
  return (
    <div className={clsx(className, styles.root, 'row')}>
      <div className='col-12'>
        <FormControl component="fieldset">
          <FormLabel  component="legend">Kategoria</FormLabel>
          <RadioGroup className='flex-row' aria-label="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {settings.productCategories.map(productCategory =>
              <FormControlLabel key={productCategory} className='d-flex mx-3' value={productCategory} control={<Radio color='primary' />} label={productCategory} />
            )}
          </RadioGroup>
        </FormControl>
      </div>
      <div className='col-12 my-3 position-relative'>
        <TextField
          id='table'
          label='Cena od'
          type='number'
          className='mx-5'
          value={startPrice}
          onChange={(e) => setStartPrice(e.target.value)}
          defaultValue= {1}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1,
            min: 1,
            max: 99,
          }}
        />
        <span className={styles.currencyFrom}>zł</span>
        <TextField
          id='table'
          label='Cena do'
          type='number'
          className='mx-5'
          value={endPrice}
          onChange={(e) => setEndPrice(e.target.value)}
          defaultValue= {1}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 10,
            min: 1,
            max: 1000,
          }}
        />
        <span className={styles.currencyTo}>zł</span>
      </div>
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
        totalItems={filterProducts(products).length}
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
