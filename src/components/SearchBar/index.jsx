import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import SearchForm from './SearchForm';

export default function SearchBar() {
  const history = useHistory();

  const handleSearchFormSubmit = (values) => {
    const { search } = values;

    history.push({
      pathname: '/products',
      search: queryString.stringify(search ? { name_contains: search } : {}),
    });
  };

  return (
    <div className="search-bar">
      <SearchForm onSubmit={handleSearchFormSubmit} />
    </div>
  );
}
