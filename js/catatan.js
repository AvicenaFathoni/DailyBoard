import { simpanData, ambilData } from "./storage.js";

let daftarCatatan = ambilData("daftarCatatan", []);

export function ambilDaftarCatatan() {
  return daftarCatatan;
}

//tambah
export function tambahCatatan(isi) {
  const catatanBaru = {
    id: Date.now(),
    isi: isi,
    tanggal: new Date().toLocaleDateString(),
  };

  daftarCatatan.push(catatanBaru);

  simpanData("daftarCatatan", daftarCatatan);

  return catatanBaru;
}

//hapus
export function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((catatan) => catatan.id !== id);

  simpanData("daftarCatatan", daftarCatatan);
}

//dblclick edit
export function editCatatan(id, isiBaru) {
  daftarCatatan = daftarCatatan.map((catatan) =>
    catatan.id === id
      ? {
          ...catatan,
          isi: isiBaru,
        }
      : catatan,
  );

  simpanData("daftarCatatan", daftarCatatan);
}

//validasi
export function validasiInputCatatan(value) {
  if (value === null || value.trim() === "") {
    alert("Catatan tidak boleh kosong!");

    return false;
  }

  return true;
}
