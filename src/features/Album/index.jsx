import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
  const albumList = [
    {
      id: 1,
    },
  ];

  return (
    <div>
      <AlbumList albumList={albumList} />
    </div>
  );
}

export default AlbumFeature;
