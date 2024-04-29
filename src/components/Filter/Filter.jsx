import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';
import { selectFilter } from 'reduxPhoneBook/selectors';
import { setFilter } from 'reduxPhoneBook/phoneBookSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const handleFilterChange = event => dispatch(setFilter(event.target.value));
  return (
    <input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={handleFilterChange}
      className={css.filterInput}
    />
  );
};