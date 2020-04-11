import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/drinksRedux';

import { Pagination } from '../../common/Pagination/Pagination';

import styles from './Drinks.module.scss';

const Component = ({className, drinks, fetchPublishedDrinks}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(12);

  // Get current drinks
  const indexOfLastPost = currentPage * drinksPerPage;
  const indexOfFirstPost = indexOfLastPost - drinksPerPage;
  const currentDrinks = drinks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrevious = () => setCurrentPage(currentPage - 1);

  fetchPublishedDrinks();
  return (
    <div className={clsx(className, styles.root, 'row')} id='nav'>
      {currentDrinks.map(drink =>
        <div key={drink.name} className={clsx(styles.drinkItem, 'col-12 col-sm-6 col-md-4 col-lg-3')}>
          <Link exact to={`/drink/${drink.name}`}>
            <div>
              <h2>{drink.name}</h2>
              <img src={drink.image} alt='drink'></img>
              <ul>
                {drink.ingredients.map(ingerdient =>
                  <li key={ingerdient.indexOf}>{ingerdient}</li>
                )}
              </ul>
            </div>
          </Link>
        </div>
      )}
      <Pagination
        itemsPerPage={drinksPerPage}
        totalItems={drinks.length}
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
  drinks: PropTypes.array,
  fetchPublishedDrinks: PropTypes.func,
};

const mapStateToProps = state => ({
  drinks: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedDrinks: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Drinks,
  Container as Drinks,
  Component as DrinksComponent,
};
