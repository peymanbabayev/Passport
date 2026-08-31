import { useCallback, useEffect, useState } from 'react';

import * as personsApi from '../api/persons';

/**
 * `persons` kolleksiyası üçün məlumatların yüklənməsi və CRUD əməliyyatlarını
 * idarə edən hook. Hər mutasiyadan sonra siyahını yenidən yükləyir.
 */
export function usePersons() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPersons(await personsApi.listPersons());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addPerson = useCallback(
    async (data) => {
      await personsApi.createPerson(data);
      await refresh();
    },
    [refresh],
  );

  const editPerson = useCallback(
    async (id, data) => {
      await personsApi.updatePerson(id, data);
      await refresh();
    },
    [refresh],
  );

  const removePerson = useCallback(
    async (id) => {
      await personsApi.deletePerson(id);
      await refresh();
    },
    [refresh],
  );

  return { persons, loading, error, refresh, addPerson, editPerson, removePerson };
}
