import { filterPersons } from './filterPersons';

const people = [
  { id: '1', name: 'Əli', surname: 'Məmmədov', fathername: 'Vəli', birthdate: '1990-01-01', gender: 'kişi' },
  { id: '2', name: 'Aygün', surname: 'Həsənova', fathername: 'Rəşad', birthdate: '1995-05-20', gender: 'qadın' },
];

describe('filterPersons', () => {
  it('boş axtarış zamanı bütün siyahını qaytarır', () => {
    expect(filterPersons(people, '   ')).toHaveLength(2);
  });

  it('istənilən sahədə uyğunluğu tapır', () => {
    expect(filterPersons(people, 'həsənova')).toEqual([people[1]]);
    expect(filterPersons(people, '1990')).toEqual([people[0]]);
  });

  it('böyük/kiçik hərfə həssas deyil', () => {
    expect(filterPersons(people, 'ƏLİ')).toEqual([people[0]]);
  });

  it('uyğunluq olmadıqda boş massiv qaytarır', () => {
    expect(filterPersons(people, 'tapılmayan')).toEqual([]);
  });
});
