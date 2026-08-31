import { useId } from 'react';
import PropTypes from 'prop-types';

function PassportSearch({ value, onChange, shown, total, loading }) {
  const inputId = useId();

  return (
    <section className="card card--search search">
      <div className="search__container">
        <div className="search__field">
          <span className="search__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            id={inputId}
            className="control search__input"
            type="search"
            value={value}
            placeholder="Ad, soyad və ya ata adı ilə axtarın…"
            aria-label="Pasport axtarışı"
            onChange={(event) => onChange(event.target.value)}
          />

          {value && (
            <button
              className="search__clear-btn"
              type="button"
              onClick={() => onChange('')}
              title="Axtarışı təmizlə"
              aria-label="Axtarışı təmizlə"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {!loading && (
          <div className="search__status">
            <span className="search__pill">
              {value.trim() ? (
                <>
                  <span className="search__pill-highlight">{shown}</span> / {total} qeyd tapıldı
                </>
              ) : (
                <>Cəmi {total} qeyd</>
              )}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

PassportSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  shown: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

PassportSearch.defaultProps = {
  shown: 0,
  total: 0,
  loading: false,
};

export default PassportSearch;

