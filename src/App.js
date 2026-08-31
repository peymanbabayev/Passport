import { useMemo, useState } from 'react';

import PassportCreator from './components/PassportCreator';
import PassportSearch from './components/PassportSearch';
import PassportList from './components/PassportList';
import { usePersons } from './hooks/usePersons';
import { filterPersons } from './utils/filterPersons';

function App() {
  const { persons, loading, error, addPerson, editPerson, removePerson } = usePersons();
  const [query, setQuery] = useState('');

  const visiblePersons = useMemo(() => filterPersons(persons, query), [persons, query]);

  return (
    <main className="container is-fluid app">
      <h1 className="title is-2">Pasport reyestri</h1>

      <PassportCreator onCreate={addPerson} />
      <PassportSearch value={query} onChange={setQuery} />
      <PassportList
        persons={visiblePersons}
        loading={loading}
        error={error}
        onEdit={editPerson}
        onDelete={removePerson}
      />
    </main>
  );
}

export default App;
