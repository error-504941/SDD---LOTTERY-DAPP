import React from 'react';

import classes from './SimpleCard.module.css';

const SimpleCard = (props) => {
  return (

          <div className={`${classes.card} ${props.className ?props.className : ''}`} data-label={props.title}>
            <h3 className={classes['card__header']}>
              {props.title}
            </h3>
            {props.children}
        </div>
  );
};

export default SimpleCard;
