import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/drinksRedux';

import styles from './Drinks.module.scss';

const Component = ({className, drinks, fetchPublishedDrinks}) => {
  fetchPublishedDrinks();
  return (
    <div className={clsx(className, styles.root, 'row')}>
      {drinks.map(drink =>
        <div key={drink.name} className={clsx(styles.drinkItem, 'col-3')}>
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
