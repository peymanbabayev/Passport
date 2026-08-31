import { useId, useState } from 'react';
import PropTypes from 'prop-types';

import { EMPTY_PERSON, GENDER_OPTIONS } from '../constants/person';

const TEXT_FIELDS = [
  {
    name: 'name',
    label: 'Ad',
    type: 'text',
    placeholder: 'Məsələn: Əli',
    autoComplete: 'given-name',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: 'surname',
    label: 'Soyad',
    type: 'text',
    placeholder: 'Məsələn: Məmmədov',
    autoComplete: 'family-name',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: 'fathername',
    label: 'Ata adı',
    type: 'text',
    placeholder: 'Məsələn: Vəli',
    autoComplete: 'off',
    wide: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: 'birthdate',
    label: 'Doğum tarixi',
    type: 'date',
    placeholder: 'GG.AA.İİİİ',
    autoComplete: 'off',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

function validate(values) {
  const errors = {};

  ['name', 'surname', 'fathername'].forEach((field) => {
    if (!values[field] || !values[field].trim()) {
      errors[field] = 'Bu sahə mütləqdir';
    }
  });

  if (!values.birthdate) {
    errors.birthdate = 'Bu sahə mütləqdir';
  } else if (values.birthdate > todayIso()) {
    errors.birthdate = 'Doğum tarixi gələcəkdə ola bilməz';
  }

  if (!values.gender) {
    errors.gender = 'Cins seçin';
  }

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

  const handleGenderSelect = (val) => {
    setValues((prev) => ({ ...prev, gender: val }));
    setErrors((prev) => ({ ...prev, gender: undefined }));
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
      setFormError('Yadda saxlamaq mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {TEXT_FIELDS.map(({ name, label, type, placeholder, autoComplete, wide, icon }) => {
        const id = `${fieldId}-${name}`;
        const hasError = Boolean(errors[name]);
        return (
          <div className={wide ? 'field field--wide' : 'field'} key={name}>
            <label htmlFor={id} className="field__label">
              <span className="field__label-icon">{icon}</span>
              <span>{label}</span>
            </label>
            <div className="input-wrap">
              <input
                id={id}
                className={`control ${hasError ? 'control--error' : ''}`}
                type={type}
                name={name}
                value={values[name]}
                placeholder={placeholder}
                autoComplete={autoComplete}
                max={type === 'date' ? todayIso() : undefined}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${id}-error` : undefined}
                onChange={handleChange}
              />
            </div>
            {hasError && (
              <p className="field-error" id={`${id}-error`} role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors[name]}</span>
              </p>
            )}
          </div>
        );
      })}

      <div className="field">
        <label htmlFor={`${fieldId}-gender`} className="field__label">
          <span className="field__label-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </span>
          <span>Cins</span>
        </label>

        {/* Cinsiyyət seçimi üçün həm vizual çiplər həm də select dəstəyi */}
        <div className="gender-segmented-control" role="group" aria-label="Cinsiyyət seçimi">
          {GENDER_OPTIONS.map((option) => {
            const isSelected = values.gender === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`gender-chip ${isSelected ? 'gender-chip--active' : ''}`}
                onClick={() => handleGenderSelect(option.value)}
              >
                <span className="gender-chip__icon">
                  {option.value === 'kişi' ? '👨' : '👩'}
                </span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {errors.gender && (
          <p className="field-error" id={`${fieldId}-gender-error`} role="alert">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errors.gender}</span>
          </p>
        )}
      </div>

      {formError && (
        <div className="form-error" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      <div className="form-actions">
        <button className="btn btn--primary" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              <span>Gözləyin…</span>
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>{submitLabel}</span>
            </>
          )}
        </button>

        {onCancel && (
          <button className="btn btn--ghost" type="button" onClick={onCancel} disabled={submitting}>
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

