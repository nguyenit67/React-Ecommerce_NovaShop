import SearchForm from './SearchForm';

export default function SearchBar() {
  const handleSearchFormSubmit = (values) => {
    console.log(values);
  };

  return <SearchForm onSubmit={handleSearchFormSubmit} />;
}
