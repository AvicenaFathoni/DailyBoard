import { simpanData, ambilData } from "./storage.js";

let daftarTugas = ambilData("daftarTugas", [
  { id: 1, nama: "Belajar JavaScript", selesai: false },
  { id: 2, nama: "Belajar CSS", selesai: false },
  { id: 3, nama: "Belajar GameDev", selesai: false },
]);

//nentuin id tugas baru
let nextId =
  daftarTugas.length > 0
    ? Math.max(...daftarTugas.map((tugas) => tugas.id)) + 1
    : 1;

//ambil data
export function ambilDaftarTugas() {
  return daftarTugas;
}

//tambah
export function tambahTugas(namaTugas) {
  const tugasBaru = {
    id: nextId++,
    nama: namaTugas,
    selesai: false,
  };

  daftarTugas.push(tugasBaru);

  simpanData("daftarTugas", daftarTugas);

  return tugasBaru;
}

//hapus
export function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((tugas) => tugas.id !== id);

  simpanData("daftarTugas", daftarTugas);
}

//toggle selesai
export function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((tugas) =>
    tugas.id === id
      ? {
          ...tugas,
          selesai: !tugas.selesai,
        }
      : tugas,
  );

  simpanData("daftarTugas", daftarTugas);
}

//edit
export function editTugas(id, namaBaru) {
  daftarTugas = daftarTugas.map((tugas) =>
    tugas.id === id ? { ...tugas, nama: namaBaru } : tugas,
  );
  simpanData("daftarTugas", daftarTugas);
}

//validasi
export function validasiInputTugas(value) {
  if (value === null || value.trim() === "") {
    alert("Nama tugas tidak boleh kosong!");
    return false;
  }
  if (value.length > 100) {
    alert("Nama tugas tidak boleh lebih dari 100 karakter!");
    return false;
  }
  return true;
}

//filter
export function cariTugas(kataKunci) {
  return daftarTugas.filter((tugas) =>
    tugas.nama.toLowerCase().includes(kataKunci.toLowerCase()),
  );
}

//dragdrop
export function pindahUrutanIdTugas(idDrag, idTarget) {
  const indexDrag = daftarTugas.findIndex((tugas) => tugas.id === idDrag);

  const indexTarget = daftarTugas.findIndex((tugas) => tugas.id === idTarget);

  if (indexDrag === -1 || indexTarget === -1) {
    return;
  }

  const [tugasPindah] = daftarTugas.splice(indexDrag, 1);

  daftarTugas.splice(indexTarget, 0, tugasPindah);

  simpanData("daftarTugas", daftarTugas);
}
