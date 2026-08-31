import { PERSON_FIELDS } from '../constants/person';

/**
 * Axtarış mətninə görə şəxsləri süzgəcdən keçirir (bütün sahələrdə,
 * böyük/kiçik hərfə həssas olmadan). Boş mətn bütün siyahını qaytarır.
 *
 * @param {import('../constants/person').Person[]} persons
 * @param {string} query
 * @returns {import('../constants/person').Person[]}
 */
const normalize = (value) => String(value ?? '').toLocaleLowerCase('az');

export function filterPersons(persons, query) {
  const term = normalize(query.trim());
  if (!term) return persons;

  return persons.filter((person) =>
    PERSON_FIELDS.some((field) => normalize(person[field]).includes(term)),
  );
}
