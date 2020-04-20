import React from 'react';
import PropTypes from 'prop-types';

import SimpleSlider from '../../features/Carousel/Carousel';
// import { fetchPublished} from '../../../redux/drinksRedux';

import { settings } from '../../../data/dataStore';

import clsx from 'clsx';

// import { connect } from 'react-redux';

import styles from './Homepage.module.scss';

const Component = ({className}) => {
  // fetchPublishedDrinks();
  return (
    <div className={clsx(className, styles.root)}>
      <SimpleSlider>
        {settings.carousel.map(item =>
          <div key={item.id} className={clsx(styles.carouselObject, item.class, 'd-flex', 'justify-content-center', 'align-items-center')}>
            <img src={item.image} alt='bar'></img>
            <div></div>
            <h2>{item.text}</h2>
            {item.id === 5 ? <button>Quiz</button> : ''}
            {item.id === 4 ? <button>Email</button> : ''}
            {item.id === 3 ? <button>Socials</button> : ''}
            {item.id === 2 ? <button>Sklep</button> : ''}
            {item.id === 1 ? <button>Drinki</button> : ''}
          </div>
        )}
      </SimpleSlider>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  fetchPublishedDrinks: PropTypes.func,
};



// const mapDispatchToProps = dispatch => ({
//   fetchPublishedDrinks: () => dispatch(fetchPublished()),
// });

// const Container = connect(mapDispatchToProps)(Component);

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
