import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

ProductDescription.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductDescription({ product }) {
  const safeDescription = DOMPurify.sanitize(product.description);

  return <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>;
}

export default ProductDescription;
