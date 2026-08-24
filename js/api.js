//quotes
export async function ambilKutipan() {
  const response = await fetch(
    "https://motivational-spark-api.vercel.app/api/quotes/random"
  );

  if (!response.ok) {
    throw new Error(
      "Gagal mengambil quotes."
    );
  }

  const data =
    await response.json();

  return data;
}

//cuaca
export async function ambilCuaca(
  latitude,
  longitude
) {
  const apiKey =
    "7c6fe36992b86db662abe52cf983a52c";

  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${latitude}` +
    `&lon=${longitude}` +
    `&units=metric` +
    `&lang=id` +
    `&appid=${apiKey}`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Gagal mengambil data cuaca."
    );
  }

  return await response.json();
}