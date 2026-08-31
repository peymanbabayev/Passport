import { useState } from 'react';
import PropTypes from 'prop-types';

import PassportForm from './PassportForm';
import { initials, formatBirthdate, getAvatarStyle } from '../utils/personDisplay';

const patronymic = (person) => {
  if (!person.fathername) return '';
  const suffix = person.gender === 'kişi' ? ' oğlu' : person.gender === 'qadın' ? ' qızı' : '';
  return `${person.fathername}${suffix}`;
};

function PassportShow({ person, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleEdit = async (data) => {
    await onEdit(person.id, data);
    setEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setActionError(null);
    try {
      await onDelete(person.id);
    } catch (err) {
      setActionError('Silmək mümkün olmadı. Yenidən cəhd edin.');
      setDeleting(false);
      setConfirming(false);
    }
  };

  const avatarStyle = getAvatarStyle(person);

  if (editing) {
    return (
      <li className="person-item person-item--editing">
        <div className="person-edit-header">
          <div className="person-edit-header__icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <h3 className="person-edit-title">Məlumatları redaktə et</h3>
        </div>
        <PassportForm
          initialValues={person}
          submitLabel="Yadda saxla"
          onSubmit={handleEdit}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  const fullName = `${person.name || ''} ${person.surname || ''}`.trim() || 'Adsız qeyd';
  const fatherText = patronymic(person);
  const birthdateText = formatBirthdate(person.birthdate, false);

  return (
    <li className="person-item">
      <div
        className="avatar"
        style={{
          background: avatarStyle.bg,
          color: avatarStyle.fg,
        }}
        aria-hidden="true"
      >
        {initials(person)}
      </div>

      <div className="person__body">
        <div className="person__header-row">
          <h3 className="person__name">{fullName}</h3>
          {person.gender && (
            <span className={`badge-gender badge-gender--${person.gender}`}>
              {person.gender === 'kişi' ? '👨 Kişi' : '👩 Qadın'}
            </span>
          )}
        </div>

        <div className="person__chips">
          {fatherText && (
            <div className="chip chip--father" title="Ata adı">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <span>{fatherText}</span>
            </div>
          )}

          {person.birthdate && (
            <div className="chip chip--date" title="Doğum tarixi">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{birthdateText}</span>
            </div>
          )}
        </div>

        {actionError && (
          <p className="person__error" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{actionError}</span>
          </p>
        )}
      </div>

      {confirming ? (
        <div className="person__confirm">
          <span className="person__confirm-text">Silinsin?</span>
          <button
            className="btn btn--sm btn--ghost"
            type="button"
            onClick={() => setConfirming(false)}
            disabled={deleting}
          >
            İmtina
          </button>
          <button
            className="btn btn--sm btn--danger-solid"
            type="button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Silinir…' : 'Bəli, Sil'}
          </button>
        </div>
      ) : (
        <div className="person__actions">
          <button
            className="action-btn action-btn--edit"
            type="button"
            title="Məlumatı redaktə et"
            aria-label="Redaktə et"
            onClick={() => setEditing(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Redaktə</span>
          </button>

          <button
            className="action-btn action-btn--delete"
            type="button"
            title="Qeydiyyatı sil"
            aria-label="Sil"
            onClick={() => setConfirming(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            <span>Sil</span>
          </button>
        </div>
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

