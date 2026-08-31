import { useEffect, useMemo, useState } from 'react';

import PassportCreator from './components/PassportCreator';
import PassportSearch from './components/PassportSearch';
import PassportList from './components/PassportList';
import { usePersons } from './hooks/usePersons';
import { filterPersons } from './utils/filterPersons';

function getInitialTheme() {
  const saved = localStorage.getItem('passport_theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function App() {
  const { persons, loading, error, addPerson, editPerson, removePerson } = usePersons();
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('passport_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const visiblePersons = useMemo(() => filterPersons(persons, query), [persons, query]);

  const stats = useMemo(() => {
    const total = persons.length;
    const men = persons.filter((p) => p.gender === 'kişi').length;
    const women = persons.filter((p) => p.gender === 'qadın').length;
    return { total, men, women };
  }, [persons]);

  return (
    <div className="app-container" data-theme={theme}>
      <div className="ambient-glow" aria-hidden="true" />

      <div className="page-wrapper">
        <header className="site-head">
          <div className="site-head__top">
            <div className="site-head__brand">
              <div className="brand-mark" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3.5" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 17c1.5-2.2 8.5-2.2 10 0" />
                </svg>
              </div>
              <div className="site-head__text">
                <div className="site-head__title-row">
                  <h1>Pasport Reyestri</h1>
                  {!loading && (
                    <span className="stats-badge">
                      <span className="stats-badge__dot" />
                      Canlı Reyestr
                    </span>
                  )}
                </div>
                <p>Şəxsiyyət və pasport məlumatlarının mərkəzləşdirilmiş vahid idarəetmə və axtarış paneli</p>
              </div>
            </div>

            <div className="site-head__actions">
              <button
                className="theme-toggle"
                type="button"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'İşıqlı rejimə keç' : 'Tünd rejimə keç'}
                aria-label={theme === 'dark' ? 'İşıqlı rejimə keç' : 'Tünd rejimə keç'}
              >
                {theme === 'dark' ? (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    <span>İşıqlı rejim</span>
                  </>
                ) : (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    <span>Tünd rejim</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Statistika Kartları */}
        {!loading && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--total" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-card__info">
                <span className="stat-card__label">Cəmi Qeydiyyat</span>
                <strong className="stat-card__value">{stats.total} pasport</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--men" aria-hidden="true">
                👨
              </div>
              <div className="stat-card__info">
                <span className="stat-card__label">Kişi Pasportları</span>
                <strong className="stat-card__value">{stats.men} şəxs</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--women" aria-hidden="true">
                👩
              </div>
              <div className="stat-card__info">
                <span className="stat-card__label">Qadın Pasportları</span>
                <strong className="stat-card__value">{stats.women} şəxs</strong>
              </div>
            </div>
          </div>
        )}

        {/* 2 Sütunlu Web / Desktop Dashboard Layout */}
        <div className="app-grid">
          <aside className="app-grid__sidebar">
            <div className="sticky-panel">
              <PassportCreator onCreate={addPerson} />
            </div>
          </aside>

          <main className="app-grid__main">
            <PassportSearch
              value={query}
              onChange={setQuery}
              shown={visiblePersons.length}
              total={persons.length}
              loading={loading}
            />

            <PassportList
              persons={visiblePersons}
              query={query}
              loading={loading}
              error={error}
              onEdit={editPerson}
              onDelete={removePerson}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

