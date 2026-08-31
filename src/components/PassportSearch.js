import { useId } from 'react';
import PropTypes from 'prop-types';

function PassportSearch({ value, onChange }) {
  const inputId = useId();

  return (
    <section className="list-header">
      <h2 className="title is-4">Pasport axtarışı</h2>
      <div className="search field">
        <label className="label" htmlFor={inputId}>
          Axtarış
        </label>
        <input
          id={inputId}
          className="input"
          type="search"
          value={value}
          placeholder="Ad, soyad, ata adı…"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </section>
  );
}

PassportSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PassportSearch;
