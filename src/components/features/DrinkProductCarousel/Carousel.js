import React from 'react';
import PropTypes from 'prop-types';

import styles from './Carousel.module.scss';

import clsx from 'clsx';
import Slider from 'react-slick';

function SampleNextArrow(props) {
  SampleNextArrow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#c1282d' }}
      onClick={onClick}
    />
  );
}


function SamplePrevArrow(props) {
  SamplePrevArrow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#DD4B39' }}
      onClick={onClick}
    />
  );
}

class SimpleSlider extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    const {children, className} = this.props;

    return (
      <div className={clsx(className, styles.root)}>

        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;
