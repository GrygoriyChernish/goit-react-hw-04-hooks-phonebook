import PropTypes, { shape } from 'prop-types';
import s from './ContactList.module.css';
import IconButton from '../../UI/IconButton/IconButton';
import { ReactComponent as RemoveIcon } from '../../icons/trash.svg';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.List}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={s.Item} key={id}>
            <p>
              {name}: {number}
            </p>
            <IconButton
              onClick={() => onDeleteContact(id)}
              aria-label="Удалить контакт"
            >
              <RemoveIcon width="25" height="25" />
            </IconButton>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};

export default ContactList;
