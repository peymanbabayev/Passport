/**
 * @typedef {Object} Person
 * @property {string} id         Firestore sənəd ID-si
 * @property {string} name       Ad
 * @property {string} surname    Soyad
 * @property {string} fathername Ata adı
 * @property {string} birthdate  Doğum tarixi (ISO `YYYY-MM-DD`)
 * @property {'kişi' | 'qadın'} gender Cins
 */

export const GENDER_OPTIONS = [
  { value: 'kişi', label: 'Kişi' },
  { value: 'qadın', label: 'Qadın' },
];

export const PERSON_FIELDS = ['name', 'surname', 'fathername', 'birthdate', 'gender'];

export const EMPTY_PERSON = {
  name: '',
  surname: '',
  fathername: '',
  birthdate: '',
  gender: '',
};
