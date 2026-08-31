import { useCallback, useEffect, useState } from 'react';

import * as personsApi from '../api/persons';

/**
 * `persons` kolleksiyası üçün real-time və optimistik CRUD hook.
 * Səhifədə reload/flicker yaratmır və tam sürətli (0ms UI gecikməsi) işləyir.
 */
export function usePersons() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = personsApi.subscribePersons(
      (data) => {
        setPersons(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Firestore bağlantı xətası:', err);
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const addPerson = useCallback(async (data) => {
    return await personsApi.createPerson(data);
  }, []);

  const editPerson = useCallback(async (id, data) => {
    // Optimistik lokal yeniləmə - dərhal görünür
    setPersons((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
    try {
      await personsApi.updatePerson(id, data);
    } catch (err) {
      console.error('Redaktə xətası:', err);
      const fresh = await personsApi.listPersons();
      setPersons(fresh);
      throw err;
    }
  }, []);

  const removePerson = useCallback(async (id) => {
    // Optimistik lokal silmə - dərhal siyahıdan çıxarılır (0 gecikmə)
    setPersons((prev) => prev.filter((item) => item.id !== id));
    try {
      await personsApi.deletePerson(id);
    } catch (err) {
      console.error('Silinmə xətası:', err);
      const fresh = await personsApi.listPersons();
      setPersons(fresh);
      throw err;
    }
  }, []);

  return { persons, loading, error, addPerson, editPerson, removePerson };
}

