import PropTypes from 'prop-types';

import PassportForm from './PassportForm';

function PassportCreator({ onCreate }) {
  return (
    <section className="card card--creator">
      <div className="card__header">
        <div className="card__header-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>
        <div>
          <h2 className="card__title">Yeni pasport əlavə et</h2>
          <p className="card__subtitle">Yeni şəxs və pasport məlumatlarını daxil edin</p>
        </div>
      </div>
      <PassportForm submitLabel="Əlavə et" resetOnSuccess onSubmit={onCreate} />
    </section>
  );
}

PassportCreator.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default PassportCreator;

