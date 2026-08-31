import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase';
import { PERSON_FIELDS } from '../constants/person';

const COLLECTION = 'persons';

const personsCollection = collection(db, COLLECTION);

/** Yalnız icazə verilən sahələri saxlayır (createdAt kimi metadata-nı kənarlaşdırır). */
function toPayload(data) {
  return PERSON_FIELDS.reduce((payload, field) => {
    payload[field] = data[field] ?? '';
    return payload;
  }, {});
}

function getMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();
  return 0;
}

function sortByNewest(a, b) {
  // Əgər sənəd yenicə əlavə edilibsə və createdAt hələ serverdən gəlməyibsə, onu ən yeni (MAX_SAFE_INTEGER) kimi ən yuxarıda saxlayırıq
  const aTime = a.createdAt ? getMillis(a.createdAt) : Number.MAX_SAFE_INTEGER;
  const bTime = b.createdAt ? getMillis(b.createdAt) : Number.MAX_SAFE_INTEGER;
  return bTime - aTime;
}

/** Firestore sənədini təhlükəsiz parse edir və `id` sahəsini həmişə Firestore doc id-si edir */
function parseDoc(snap) {
  const data = snap.data() || {};
  const isPending = snap.metadata && snap.metadata.hasPendingWrites;
  return {
    ...data,
    id: snap.id,
    createdAt: data.createdAt || (isPending ? new Date() : null),
  };
}


/**
 * @returns {Promise<import('../constants/person').Person[]>}
 */
export async function listPersons() {
  const snapshot = await getDocs(personsCollection);
  return snapshot.docs
    .map(parseDoc)
    .sort(sortByNewest);
}

/**
 * Real-time (canlı) dinləyici. Hər dəyişiklikdə dərhal işə düşür və 0ms gecikmə ilə UI-ı yeniləyir.
 */
export function subscribePersons(onNext, onError) {
  return onSnapshot(
    personsCollection,
    (snapshot) => {
      const list = snapshot.docs
        .map(parseDoc)
        .sort(sortByNewest);
      onNext(list);
    },
    (err) => {
      if (onError) onError(err);
    },
  );
}

/**
 * @returns {Promise<string>} yaradılan sənədin ID-si
 */
export async function createPerson(data) {
  const ref = await addDoc(personsCollection, {
    ...toPayload(data),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePerson(id, data) {
  if (!id) throw new Error('Yeniləmək üçün sənəd ID-si tapılmadı');
  await updateDoc(doc(db, COLLECTION, String(id)), toPayload(data));
}

export async function deletePerson(id) {
  if (!id) throw new Error('Silmək üçün sənəd ID-si tapılmadı');
  await deleteDoc(doc(db, COLLECTION, String(id)));
}

