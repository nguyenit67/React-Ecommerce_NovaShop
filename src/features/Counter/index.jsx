import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 32,
    padding: '0 30px',
  },
});

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const classes = useStyles();
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      Counter: {counter}
      <div>
        <button className={classes.root} onClick={() => dispatch(increase())}>
          Increase
        </button>
        <button className={classes.root} onClick={() => dispatch(decrease())}>
          Decrease
        </button>
      </div>
    </div>
  );
}

export default CounterFeature;
