const MONTHS_AZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr',
];

const SHORT_MONTHS_AZ = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn',
  'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek',
];

const AVATAR_GRADIENTS = [
  { bg: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)', fg: '#ffffff' },
  { bg: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)', fg: '#ffffff' },
];

/** Ad və ya ID əsasında zövqlü qradiyent rəngi təyin edir */
export function getAvatarStyle(person) {
  const seed = `${person.name || ''} ${person.surname || ''} ${person.id || ''}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

/** Ad və soyadın ilk hərflərindən inisial. */
export function initials(person) {
  const first = String(person.name || '').trim().charAt(0);
  const last = String(person.surname || '').trim().charAt(0);
  return (first + last).toUpperCase() || '—';
}

/** ISO `YYYY-MM-DD` → `12 Mar 1990`; tanınmayan dəyəri olduğu kimi qaytarır. */
export function formatBirthdate(iso, short = true) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!match) return iso || '—';
  const [, year, month, day] = match;
  const list = short ? SHORT_MONTHS_AZ : MONTHS_AZ;
  const name = list[Number(month) - 1];
  return name ? `${Number(day)} ${name} ${year}` : iso;
}

