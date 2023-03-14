import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };
  return (
    <input
      name="filter"
      value={filter}
      onChange={handleFilter}
      placeholder="Filter contact"
    />
  );
};

export default Filter;
