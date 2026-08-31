import { useState } from 'react';
import PropTypes from 'prop-types';

import PassportForm from './PassportForm';
import { GENDER_OPTIONS } from '../constants/person';

const genderLabel = (value) =>
  GENDER_OPTIONS.find((option) => option.value === value)?.label ?? value ?? '—';

function PassportShow({ person, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleEdit = async (data) => {
    await onEdit(person.id, data);
    setEditing(false);
  };

  const handleDelete = async () => {
    const fullName = `${person.name} ${person.surname}`.trim();
    if (!window.confirm(`${fullName} silinsin?`)) return;

    setDeleting(true);
    setActionError(null);
    try {
      await onDelete(person.id);
    } catch (err) {
      setActionError('Silmək mümkün olmadı.');
      setDeleting(false);
    }
  };

  if (editing) {
    return (
      <li className="list-container list-container--editing">
        <PassportForm
          initialValues={person}
          submitLabel="Yadda saxla"
          onSubmit={handleEdit}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  const rows = [
    ['Ad', person.name],
    ['Soyad', person.surname],
    ['Ata adı', person.fathername],
    ['Doğum tarixi', person.birthdate],
    ['Cins', genderLabel(person.gender)],
  ];

  return (
    <li className="list-container">
      <div className="image">
        <img
          alt={`${person.name} ${person.surname} üçün avatar`}
          src={`https://picsum.photos/seed/${encodeURIComponent(person.id)}/200/150`}
          width={200}
          height={150}
          loading="lazy"
        />
      </div>

      <dl className="data-container">
        {rows.map(([label, value]) => (
          <div className="data-box" key={label}>
            <dt>{label}:</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>

      <div className="edit-delete">
        <button
          className="button is-small is-warning"
          type="button"
          onClick={() => setEditing(true)}
        >
          Redaktə et
        </button>
        <button
          className="button is-small is-danger"
          type="button"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Silinir…' : 'Sil'}
        </button>
      </div>

      {actionError && (
        <p className="notification is-danger is-light" role="alert">
          {actionError}
        </p>
      )}
    </li>
  );
}

PassportShow.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    surname: PropTypes.string,
    fathername: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PassportShow;
