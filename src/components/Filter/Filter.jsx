import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <label className={s.Label}>
      Find contacts by name
      <input
        className={s.Input}
        type="text"
        value={filter}
        onChange={onChange}
        placeholder="What are you looking for?"
      />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
