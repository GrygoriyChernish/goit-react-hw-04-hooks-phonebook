import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleChange(event) {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  }

  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <form className={s.Form} onSubmit={handleSubmit}>
      <label className={s.Label}>
        Name{' '}
        <input
          className={s.Input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Sidr Sidorov"
        />
      </label>
      <label className={s.Label}>
        Number{' '}
        <input
          className={s.Input}
          type="phone"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="777-77-77"
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
