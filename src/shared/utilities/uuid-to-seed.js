export default function uuidToSeed(uuid) {
  return uuid.split("-").map((str) => parseInt(str, 16));
}
