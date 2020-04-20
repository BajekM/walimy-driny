import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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
import { getAll, changeParam } from '../../../redux/productsRedux';
import { addProdToBasket, getBasket, changeAmount } from '../../../redux/ordersRedux';

import styles from './ProductId.module.scss';


const Component = ({className, match, products, addToBasket, basket, increase, handleChange }) => {
  const product = products.find(item => item._id === match.params.id);

  // const [value, setValue] = useState();
  const [amount, setAmount] = useState(1);

  return (
    <div className={clsx(className, styles.root)}>
      <h2>{product.name}</h2>
      <div className='row'>
        <div className='col-12 col-md-6 px-2 pb-4'>
          <SimpleSlider>
            {product.carousel.map(item =>
              <img src={item} key={item} alt='item'></img>
            )}
          </SimpleSlider>
        </div>
        <div className={clsx('col-12 col-md-6 d-flex flex-column justify-content-between py-3', styles.border)}>
          <div className='px-2 py-3 h-50 d-flex flex-column justify-content-around'>
            <div>
            Status:
              {product.status === 'available' ?
                <span className={clsx(styles.status, styles.available)}>Dostępny</span> :
                <span className={clsx(styles.status, styles.nonAvailable)}>Produkt niedostępny</span>
              }
            </div>
            <div className='mt-3 d-flex align-items-center'>
              <TextField
                id='amount'
                label='Ilość'
                type='number'
                defaultValue= {1}
                onChange={e => setAmount(e.target.value)}
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
                      <RadioGroup aria-label={param.name} name={param.name}  defaultValue={param.options[0]} value={param.option} onChange={e => handleChange({productId: product._id, name: param.name, value: e.target.value})}>
                        {param.options.map(option =>
                          <FormControlLabel key={option} className='d-flex' value={option} control={<Radio />} label={option} />
                        )}
                      </RadioGroup>
                    </div>
                  )}
                </FormControl> : ''
              }
              {product.status !== 'available' ?
                <button className='ml-3  justify-content-around' disabled><Icon name ='shopping-cart'/><span className={clsx('ml-3', styles.disabledButton)}>Dodaj do koszyka</span></button> :
                <button className='ml-3  justify-content-around' onClick={
                  (!basket.products || !basket.products.find(item => item._id === product._id) || product.params.length !== 0) ?
                    (!basket.products ? () => addToBasket([{...product, amount: amount}], uuidv4()) :
                      () => addToBasket([...basket.products, {...product, amount: amount}], uuidv4())) :
                    (() => increase(
                      basket.products.map(item =>
                        item._id !== product._id ?
                          item : {...item, amount: parseInt(amount) + parseInt((basket.products.find(item => item._id === product._id)).amount)}
                      )
                    ))
                }>
                  <Icon name ='shopping-cart'/><span className='ml-3'>Dodaj do koszyka</span></button>
              }
            </div>
          </div>
          <div className='px-2 py-3 h-50 d-flex align-items-center'>
            <p>{product.description}</p>
          </div>
          <div>Cena: {product.price} zł</div>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  products: PropTypes.array,
  addToBasket: PropTypes.func,
  increase: PropTypes.func,
  basket: PropTypes.object,
  handleChange: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
  basket: getBasket(state),
});

const mapDispatchToProps = dispatch => ({
  addToBasket: (obj, id) => dispatch(addProdToBasket(obj, id)),
  increase: amount => dispatch(changeAmount(amount)),
  handleChange: obj => dispatch(changeParam(obj)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as productId,
  Container as ProductId,
  Component as ProductIdComponent,
};
