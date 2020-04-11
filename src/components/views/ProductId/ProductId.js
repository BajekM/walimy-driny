import React, {useState} from 'react';
import PropTypes from 'prop-types';

import SimpleSlider from '../../features/DrinkProductCarousel/Carousel';
import TextField from '@material-ui/core/TextField';
import {Icon} from '../../common/Icon/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';

import styles from './ProductId.module.scss';


const Component = ({className, match, products }) => {
  const product = products.find(item => item.name === match.params.id);

  const [value, setValue] = useState('value');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <h2>{match.params.id}</h2>
      <div className='row'>
        <div className='col-12 col-md-6 px-2 pb-4'>
          <SimpleSlider>
            {product.carousel.map(item =>
              <img src={item} key={item} alt='item'></img>
            )}
          </SimpleSlider>
        </div>
        <div className={clsx('col-12 col-md-6 d-flex flex-column justify-content-between', styles.border)}>
          <div className='px-2 py-3 h-50 d-flex flex-column justify-content-around'>
            <div>
            Status:
              {product.status === 'available' ?
                <span className={clsx(styles.status, styles.available)}>Dostępny</span> :
                <span className={clsx(styles.status, styles.nonAvailable)}>Produkt niedostępny</span>
              }
            </div>
            <div className='mt-3 d-flex'>
              <TextField
                id='table'
                label='Ilość'
                type='number'
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
              {product.params ?
                <FormControl component="fieldset">
                  {product.params.map(param =>
                    <div key={param.name} className={clsx(styles.paramsWrapper, 'ml-5')}>
                      <FormLabel  component="legend">{param.name}</FormLabel>
                      <RadioGroup aria-label={param.name} name={param.name} value={value} onChange={handleChange}>
                        {param.options.map(option =>
                          <FormControlLabel key={option} className='d-flex' value={option} control={<Radio />} label={option} />
                        )}
                      </RadioGroup>
                    </div>
                  )}
                </FormControl> : ''
              }
              {product.status !== 'available' ?
                <button className='ml-5' disabled><Icon name ='shopping-cart'/><span className='m-4'>Dodaj do koszyka</span></button> :
                <button className='ml-5'><Icon name ='shopping-cart'/><span className='m-4'>Dodaj do koszyka</span></button>
              }
            </div>
          </div>
          <div className='px-2 py-3 h-50 d-flex align-items-center'>
            <p>{product.description}</p>
          </div>
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
