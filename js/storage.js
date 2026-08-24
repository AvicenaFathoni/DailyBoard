export function simpanData(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
}

export function ambilData(key, dataDefault = []) {
  const data = localStorage.getItem(key);


if (!data) {
  return dataDefault;
}

return JSON.parse(data);
}