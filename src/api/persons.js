import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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

function sortByNewest(a, b) {
  const toMillis = (value) => (value && typeof value.toMillis === 'function' ? value.toMillis() : 0);
  return toMillis(b.createdAt) - toMillis(a.createdAt);
}

/**
 * @returns {Promise<import('../constants/person').Person[]>}
 */
export async function listPersons() {
  const snapshot = await getDocs(personsCollection);
  return snapshot.docs
    .map((snap) => ({ id: snap.id, ...snap.data() }))
    .sort(sortByNewest);
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
  await updateDoc(doc(db, COLLECTION, id), toPayload(data));
}

export async function deletePerson(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}
