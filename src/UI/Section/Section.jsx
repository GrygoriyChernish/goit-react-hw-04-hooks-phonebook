import PropTypes from 'prop-types';
import s from './Section.module.css';

function Section({ children }) {
  return <section className={s.Section}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
