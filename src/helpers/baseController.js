import Dexie from 'dexie'

export default function baseController (dbName) {
  return new Dexie(dbName, {
    autoOpen: true
  }).version(1)
}
