import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished, getLoadingState } from '../../../redux/drinksRedux';
import { getTags, addTag, removeTag } from '../../../redux/tagsRedux';

import { Pagination } from '../../common/Pagination/Pagination';

import styles from './Drinks.module.scss';

import { settings } from '../../../data/dataStore';



const Component = ({className, drinks, fetchPublishedDrinks, loading, tags, addNewTag, deleteTag}) => {

  // Filtering

  // const handleTags = (tag, isChecked) => {
  //   let tagsArray;
  //   tags.length > 0 ?
  //     tagsArray = tags :
  //     tagsArray = [];
  //   // const tagsArray = [];
  //   if (isChecked) {
  //     tagsArray.push(tag);
  //   }
  //   else{
  //     if (tagsArray.includes(tag)) {
  //       tagsArray.splice(tagsArray.indexOf(tag), 1);
  //     }
  //   }
  //   console.log('tagsArray', tagsArray);
  //   setTags(tagsArray);
  //   console.log('State', tags);
  // };


  const filter = (items) => {
    const filtered = [];
    console.log('tags redux', tags);

    if (tags.length !== 0) {

      for (let item of items) {
        const conditions = [];
        for (let tagArray of tags) {
          conditions.push(item.tags.includes(tagArray));
        }
        for (let tag of item.tags) {
          if (tags.includes(tag) && !filtered.includes(item) && !conditions.includes(false)) {
            filtered.push(item);
          }
        }
      }
      console.log(filtered);
      return filtered;
    } else return items;
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(3);
  // const [filteredDrinks, filterDrinks] = useState(drinks);
  // const [tags, setTags] = useState([]);



  // Get current drinks
  const indexOfLastPost = currentPage * drinksPerPage;
  const indexOfFirstPost = indexOfLastPost - drinksPerPage;
  const currentDrinks = filter(drinks).slice(indexOfFirstPost, indexOfLastPost);

  console.log('current', currentDrinks);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrevious = () => setCurrentPage(currentPage - 1);

  fetchPublishedDrinks();
  console.log('loading', loading.active);

  if(loading.active || !drinks.length){
    return (
      <Paper className={styles.component}>
        <p>Loading...</p>
      </Paper>
    );
  } else if(loading.error) {
    return (
      <Paper className={styles.component}>
        <p>Error! Details:</p>
        <pre>{loading.error}</pre>
      </Paper>
    );
  } else {

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
                      onChange={(e) => e.currentTarget.checked ? addNewTag(tag) :  deleteTag(tag)}
                    />
                  }
                  label={tag}
                />
              )}
            </FormGroup>
          </FormControl>
        </div>
        {currentDrinks.map(drink =>
          <div key={drink._id} className={clsx(styles.drinkItem, 'col-12 col-sm-6 col-md-4 col-lg-3')}>
            <Link exact to={`/drink/${drink._id}`}>
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
          totalItems={filter(drinks).length}
          paginate={paginate}
          paginateNext={paginateNext}
          paginatePrevious={paginatePrevious}
          currentPage={currentPage}
        />
      </div>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  drinks: PropTypes.array,
  fetchPublishedDrinks: PropTypes.func,
  loading: PropTypes.object,
  tags: PropTypes.array,
  addNewTag: PropTypes.func,
  deleteTag: PropTypes.func,
};

const mapStateToProps = state => ({
  drinks: getAll(state),
  loading: getLoadingState(state),
  tags: getTags(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedDrinks: () => dispatch(fetchPublished()),
  addNewTag: (tag) => dispatch(addTag(tag)),
  deleteTag: (tag) => dispatch(removeTag(tag)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Drinks,
  Container as Drinks,
  Component as DrinksComponent,
};
