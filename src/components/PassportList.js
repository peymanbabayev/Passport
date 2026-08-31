import PropTypes from 'prop-types';

import PassportShow from './PassportShow';

function PassportList({ persons, loading, error, onEdit, onDelete }) {
  if (loading) {
    return (
      <p className="notification" role="status">
        Yüklənir…
      </p>
    );
  }

  if (error) {
    return (
      <p className="notification is-danger" role="alert">
        Məlumatları yükləmək mümkün olmadı.
      </p>
    );
  }

  if (persons.length === 0) {
    return <p className="notification">Uyğun pasport tapılmadı.</p>;
  }

  return (
    <ul className="lists">
      {persons.map((person) => (
        <PassportShow key={person.id} person={person} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

PassportList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

PassportList.defaultProps = {
  loading: false,
  error: null,
};

export default PassportList;
