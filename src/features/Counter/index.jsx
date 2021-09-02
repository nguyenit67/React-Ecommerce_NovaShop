import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      Counter: {counter}
      <div>
        <button onClick={() => dispatch(increase())}>Increase</button>
        <button onClick={() => dispatch(decrease())}>Decrease</button>
      </div>
    </div>
  );
}

export default CounterFeature;
