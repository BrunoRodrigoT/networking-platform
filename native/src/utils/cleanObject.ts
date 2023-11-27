export default function cleanObject<T>(obj: T): T {
  const cleanObject = { ...obj };
  for (const key in cleanObject) {
    if (cleanObject[key] === "" || cleanObject[key] === null) {
      delete cleanObject[key];
    }
  }
  return cleanObject;
}
