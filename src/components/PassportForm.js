import { useId, useState } from 'react';
import PropTypes from 'prop-types';

import { EMPTY_PERSON, GENDER_OPTIONS } from '../constants/person';

const TEXT_FIELDS = [
  { name: 'name', label: 'Ad', type: 'text', autoComplete: 'given-name' },
  { name: 'surname', label: 'Soyad', type: 'text', autoComplete: 'family-name' },
  { name: 'fathername', label: 'Ata adı', type: 'text', autoComplete: 'off' },
  { name: 'birthdate', label: 'Doğum tarixi', type: 'date', autoComplete: 'off' },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

function validate(values) {
  const errors = {};

  ['name', 'surname', 'fathername'].forEach((field) => {
    if (!values[field].trim()) errors[field] = 'Bu sahə mütləqdir';
  });

  if (!values.birthdate) {
    errors.birthdate = 'Bu sahə mütləqdir';
  } else if (values.birthdate > todayIso()) {
    errors.birthdate = 'Doğum tarixi gələcəkdə ola bilməz';
  }

  if (!values.gender) errors.gender = 'Cins seçin';

  return errors;
}

/**
 * Pasport yaratma və redaktə üçün ortaq form.
 */
function PassportForm({ initialValues, submitLabel, resetOnSuccess, onSubmit, onCancel }) {
  const fieldId = useId();
  const [values, setValues] = useState({ ...EMPTY_PERSON, ...initialValues });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        surname: values.surname.trim(),
        fathername: values.fathername.trim(),
        birthdate: values.birthdate,
        gender: values.gender,
      });
      if (resetOnSuccess) setValues({ ...EMPTY_PERSON });
    } catch (err) {
      setFormError('Yadda saxlamaq mümkün olmadı. Bir azdan yenidən cəhd edin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="passport-form" onSubmit={handleSubmit} noValidate>
      {TEXT_FIELDS.map(({ name, label, type, autoComplete }) => {
        const id = `${fieldId}-${name}`;
        const hasError = Boolean(errors[name]);
        return (
          <div className="field" key={name}>
            <label className="label" htmlFor={id}>
              {label}
            </label>
            <input
              id={id}
              className="input"
              type={type}
              name={name}
              value={values[name]}
              autoComplete={autoComplete}
              max={type === 'date' ? todayIso() : undefined}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : undefined}
              onChange={handleChange}
            />
            {hasError && (
              <p className="field-error" id={`${id}-error`} role="alert">
                {errors[name]}
              </p>
            )}
          </div>
        );
      })}

      <div className="field">
        <label className="label" htmlFor={`${fieldId}-gender`}>
          Cins
        </label>
        <div className="select">
          <select
            id={`${fieldId}-gender`}
            name="gender"
            value={values.gender}
            aria-invalid={Boolean(errors.gender)}
            aria-describedby={errors.gender ? `${fieldId}-gender-error` : undefined}
            onChange={handleChange}
          >
            <option value="">Seçin…</option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.gender && (
          <p className="field-error" id={`${fieldId}-gender-error`} role="alert">
            {errors.gender}
          </p>
        )}
      </div>

      {formError && (
        <p className="notification is-danger is-light" role="alert">
          {formError}
        </p>
      )}

      <div className="form-actions">
        <button className="button is-link" type="submit" disabled={submitting}>
          {submitting ? 'Gözləyin…' : submitLabel}
        </button>
        {onCancel && (
          <button className="button" type="button" onClick={onCancel} disabled={submitting}>
            Ləğv et
          </button>
        )}
      </div>
    </form>
  );
}

PassportForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    fathername: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.string,
  }),
  submitLabel: PropTypes.string,
  resetOnSuccess: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

PassportForm.defaultProps = {
  initialValues: EMPTY_PERSON,
  submitLabel: 'Yadda saxla',
  resetOnSuccess: false,
  onCancel: undefined,
};

export default PassportForm;
