import React from 'react';
import { useRouteMatch } from 'react-router-dom';

function ListPage(props) {
  const match = useRouteMatch();

  return <div>Product Listing Page</div>;
}

export default ListPage;
