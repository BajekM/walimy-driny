import React, {useState} from 'react';
import PropTypes from 'prop-types';


import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/drinksRedux';

import { Pagination } from '../../common/Pagination/Pagination';

import styles from './Drinks.module.scss';

import { settings } from '../../../data/dataStore';

const tagsArray = [];


const Component = ({className, drinks, fetchPublishedDrinks}) => {

  // Filtering

  const handleTags = (tag, isChecked) => {
    if (isChecked) {
      tagsArray.push(tag);
    }
    else{
      if (tagsArray.includes(tag)) {
        tagsArray.splice(tagsArray.indexOf(tag), 1);
      }
    }
    if (tagsArray.length > 0) {
      filter(drinks);
    } else {
      filterDrinks(drinks);
    }
  };

  const filter = (items) => {
    const filtered = [];
    for (let item of items) {
      const conditions = [];
      for (let tagArray of tagsArray) {
        conditions.push(item.tags.includes(tagArray));
      }

      for (let tag of item.tags) {
        if (tagsArray.includes(tag) && !filtered.includes(item) && !conditions.includes(false)) {
          filtered.push(item);
        }
      }
    }
    filterDrinks(filtered);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(3);
  const [filteredDrinks, filterDrinks] = useState(drinks);

  // Get current drinks
  const indexOfLastPost = currentPage * drinksPerPage;
  const indexOfFirstPost = indexOfLastPost - drinksPerPage;
  const currentDrinks = filteredDrinks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrevious = () => setCurrentPage(currentPage - 1);

  fetchPublishedDrinks();
  return (
    <div className={clsx(className, styles.root, 'row')} id='nav'>
      <div className='col-12'>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Tagi</FormLabel>
          <FormGroup className='flex-row'>
            {settings.tags.map(tag =>
              <FormControlLabel
                className='mx-3'
                key={tag}
                control={
                  <Checkbox
                    name={tag}
                    color='primary'
                    onChange={(e) => handleTags(tag, e.currentTarget.checked)}
                  />
                }
                label={tag}
              />
            )}
          </FormGroup>
        </FormControl>
      </div>
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
              <div className={styles.tags}>
                  Tagi: {drink.tags.map(tag => tag + ' ')}
              </div>
            </div>
          </Link>
        </div>
      )}
      <Pagination
        itemsPerPage={drinksPerPage}
        totalItems={filteredDrinks.length}
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
