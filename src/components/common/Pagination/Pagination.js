import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Pagination.module.scss';
import { Icon } from '../Icon/Icon';

const Component = ({ className, itemsPerPage, totalItems, paginate, paginatePrevious, paginateNext, currentPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <nav className={clsx(className, styles.root)}>
      <ul>
        {currentPage > 1 ?
          <a onClick={() => paginatePrevious()} href='#nav'><li><Icon name='angle-left'/></li></a> :
          <div className={styles.disabled} href='#nav'><li><Icon name='angle-left'/></li></div>
        }
        {pageNumbers.map(number => (
          currentPage === number ?
            <li key={number} className={styles.active}>
              <a onClick={() => paginate(number)}  href='#nav'><span>{number}</span></a>
            </li> :
            <li key={number}>
              <a onClick={() => paginate(number)}  href='#nav'><span>{number}</span></a>
            </li>
        ))}
        {currentPage <  Math.ceil(totalItems / itemsPerPage) ?
          <a onClick={() => paginateNext()} href='#nav'><li><Icon name='angle-right'/></li></a> :
          <div className={styles.disabled} href='#nav'><li><Icon name='angle-right'/></li></div>
        }
      </ul>
    </nav>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  paginate: PropTypes.func,
  paginateNext: PropTypes.func,
  paginatePrevious: PropTypes.func,
  currentPage: PropTypes.number,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Pagination,
  // Container as Pagination,
  Component as PaginationComponent,
};
