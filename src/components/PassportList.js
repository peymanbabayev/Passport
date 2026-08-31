import PropTypes from 'prop-types';

import PassportShow from './PassportShow';

function PassportList({ persons, query, loading, error, onEdit, onDelete }) {
  let content;

  if (loading) {
    content = (
      <div className="state state--loading" role="status">
        <div className="state__spinner" />
        <p className="state__title">Məlumatlar yüklənir…</p>
        <p className="state__desc">Zəhmət olmasa bir qədər gözləyin</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="state state--error" role="alert">
        <div className="state__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <strong className="state__title">Məlumatları yükləmək mümkün olmadı</strong>
        <p className="state__desc">İnternet bağlantınızı yoxlayın və ya səhifəni yeniləyin.</p>
      </div>
    );
  } else if (persons.length === 0) {
    content = (
      <div className="state state--empty">
        <div className="state__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <strong className="state__title">
          {query && query.trim() ? 'Uyğun pasport tapılmadı' : 'Hələlik heç bir pasport qeydiyyatı yoxdur'}
        </strong>
        <p className="state__desc">
          {query && query.trim()
            ? 'Axtarış sözünü dəyişərək yenidən yoxlayın.'
            : 'Yuxarıdakı formadan istifadə edərək yeni pasport qeydiyyatı əlavə edin.'}
        </p>
      </div>
    );
  } else {
    content = (
      <ul className="list__items">
        {persons.map((person) => (
          <PassportShow key={person.id} person={person} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    );
  }

  return (
    <section className="list">
      <div className="list__head">
        <div className="list__head-title-wrap">
          <h2 className="list__title">Qeydiyyatdakı Pasportlar</h2>
          {!loading && !error && (
            <span className="list__count-pill">{persons.length} qeyd</span>
          )}
        </div>
      </div>
      {content}
    </section>
  );
}

PassportList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  query: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

PassportList.defaultProps = {
  query: '',
  loading: false,
  error: null,
};

export default PassportList;

