import {
  ambilDaftarTugas,
  tambahTugas,
  hapusTugas,
  toggleSelesai,
  editTugas,
  validasiInputTugas,
  cariTugas,
  pindahUrutanIdTugas,
} from "./tugas.js";

import {
  ambilDaftarCatatan,
  tambahCatatan,
  hapusCatatan,
  editCatatan,
  validasiInputCatatan,
} from "./catatan.js";

import { ambilKutipan, ambilCuaca } from "./api.js";

const app = document.getElementById("app");
const header = document.createElement("header");
header.className = "header-container";
app.appendChild(header);
const judul = document.createElement("h1");
judul.textContent = "Daily Board";
judul.className = "judul";
header.appendChild(judul);
const welcomeText = document.createElement("h3");
welcomeText.textContent = "Selamat datang di Daily Board!";
welcomeText.className = "welcome-text";
app.appendChild(welcomeText);

const buttonTema = document.createElement("button");
buttonTema.id = "toggle-tema";
buttonTema.textContent = "Ganti Tema";
header.appendChild(buttonTema);

const toggleTema = document.getElementById("toggle-tema");

toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modeAktif = document.body.classList.contains("dark-mode");
  localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
  }
});

//TUGAS
const tugasSection = document.createElement("section");
const judulSectionTugas = document.createElement("h3");
const catatanSection = document.createElement("section");
const judulSectionCatatan = document.createElement("h3");
const quotesSection = document.createElement("section");
const cuacaSection = document.createElement("section");
const status = document.createElement("p");

app.appendChild(tugasSection);
app.appendChild(catatanSection);
app.appendChild(quotesSection);
app.appendChild(cuacaSection);
quotesSection.appendChild(status);

tugasSection.appendChild(judulSectionTugas);
catatanSection.appendChild(judulSectionCatatan);

judulSectionTugas.textContent = "Tugas";
judulSectionCatatan.textContent = "Catatan";

const inputFieldTugas = document.createElement("input");
const inputPencarianTugas = document.createElement("input");
const buttonTambah = document.createElement("button");
const buttonSemua = document.createElement("button");
const buttonSelesai = document.createElement("button");
const buttonBelum = document.createElement("button");
const listTugas = document.createElement("article");

inputPencarianTugas.id = "cari-tugas";
inputPencarianTugas.type = "text";
inputPencarianTugas.placeholder = "Cari tugas...";
inputFieldTugas.id = "inputFieldTugas";
inputFieldTugas.type = "text";
inputFieldTugas.placeholder = "Nama tugas...";
buttonTambah.textContent = "Tambah Tugas";
buttonSemua.textContent = "Semua";
buttonSelesai.textContent = "Selesai";
buttonBelum.textContent = "Belum";

tugasSection.appendChild(inputPencarianTugas);
tugasSection.appendChild(inputFieldTugas);
tugasSection.appendChild(buttonTambah);
tugasSection.appendChild(buttonSemua);
tugasSection.appendChild(buttonSelesai);
tugasSection.appendChild(buttonBelum);
tugasSection.appendChild(listTugas);

inputFieldTugas.addEventListener("input", (e) => {
  console.log("Input:", e.target.value);
});

buttonTambah.addEventListener("click", () => {
  const valueInput = inputFieldTugas.value;

  if (validasiInputTugas(valueInput)) {
    tambahTugas(valueInput.trim());

    inputFieldTugas.value = "";
    inputFieldTugas.focus();

    renderTugas();
  }
});

buttonSemua.addEventListener("click", () => {
  renderTugas("semua");
});

buttonSelesai.addEventListener("click", () => {
  renderTugas("selesai");
});

buttonBelum.addEventListener("click", () => {
  renderTugas("belum");
});

function debounce(fn, delay = 300) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const cariTugasDebounced = debounce((kataKunci) => {
  const hasil = cariTugas(kataKunci);

  renderTugas("semua", hasil);
}, 300);

inputPencarianTugas.addEventListener("input", (e) => {
  cariTugasDebounced(e.target.value);
});

function aktifkanDragDrop() {
  const items = document.querySelectorAll(".tugas-item");

  items.forEach((item) => {
    item.setAttribute("draggable", true);

    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.dataset.id);

      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
  });

  const list = document.getElementById("daftar-tugas");

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();

    const idDrag = Number(e.dataTransfer.getData("text/plain"));

    const liTarget = e.target.closest(".tugas-item");

    if (!liTarget) {
      return;
    }

    const liTargetId = Number(liTarget.dataset.id);

    if (idDrag === liTargetId) {
      return;
    }

    pindahUrutanIdTugas(idDrag, liTargetId);

    renderTugas();
  });
}

function renderTugas(filter = "semua", data = ambilDaftarTugas()) {
  const list = document.createElement("ul");
  list.className = "daftar-tugas";
  list.id = "daftar-tugas";
  listTugas.innerHTML = "";
  listTugas.appendChild(list);

  const tugasTersaring = data.filter((tugas) => {
    if (filter === "selesai") return tugas.selesai;
    if (filter === "belum") return !tugas.selesai;
    return true;
  });

  tugasTersaring.forEach((tugas) => {
    const listItem = document.createElement("li");
    //buat dragdrop kasih class sma set id
    listItem.className = "tugas-item";
    listItem.dataset.id = tugas.id;
    listItem.textContent = tugas.nama;
    listItem.style.textDecoration = tugas.selesai ? "line-through" : "none";
    list.appendChild(listItem);

    listItem.addEventListener("click", () => {
      toggleSelesai(tugas.id);
      renderTugas();
    });

    listItem.addEventListener("dblclick", () => {
      const namaBaru = prompt("Edit nama tugas:", tugas.nama);

      if (validasiInputTugas(namaBaru)) {
        editTugas(tugas.id, namaBaru.trim());

        renderTugas();
      }
    });

    const buttonHapus = document.createElement("button");
    buttonHapus.className = "tombol-hapus";
    buttonHapus.textContent = "Hapus";
    listItem.appendChild(buttonHapus);

    buttonHapus.addEventListener("click", (e) => {
      e.stopPropagation();

      hapusTugas(tugas.id);

      renderTugas();
    });
  });
  aktifkanDragDrop();
}

renderTugas();

//CATATAN

const listCatatan = document.createElement("article");
const inputCatatan = document.createElement("textarea");
const buttonTambahCatatan = document.createElement("button");

inputCatatan.id = "inputFieldCatatan";
buttonTambahCatatan.textContent = "Tambah Catatan";

catatanSection.appendChild(inputCatatan);
catatanSection.appendChild(listCatatan);
catatanSection.appendChild(buttonTambahCatatan);

buttonTambahCatatan.addEventListener("click", () => {
  const isiCatatan = inputCatatan.value;
  if (validasiInputCatatan(isiCatatan)) {
    tambahCatatan(isiCatatan.trim());
    inputCatatan.value = "";
    inputCatatan.focus();

    renderCatatan();
  }
});

function renderCatatan() {
  listCatatan.innerHTML = "";

  const daftarCatatan = ambilDaftarCatatan();

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";

    const isi = document.createElement("p");
    isi.textContent = catatan.isi;

    const tanggal = document.createElement("small");
    tanggal.textContent = catatan.tanggal;

    div.appendChild(isi);
    div.appendChild(tanggal);

    //double click edit
    div.addEventListener("dblclick", () => {
      const isiBaru = prompt("Edit catatan:", catatan.isi);

      if (validasiInputCatatan(isiBaru)) {
        editCatatan(catatan.id, isiBaru.trim());

        renderCatatan();
      }
    });
    const buttonHapusCatatan = document.createElement("button");
    buttonHapusCatatan.className = "tombol-hapus";
    buttonHapusCatatan.textContent = "Hapus";
    buttonHapusCatatan.addEventListener("click", (e) => {
      e.stopPropagation();

      hapusCatatan(catatan.id);

      renderCatatan();
    });
    div.appendChild(buttonHapusCatatan);
    listCatatan.appendChild(div);
  });
}

renderCatatan();

//QUOTES
const widgetKutipan = document.createElement("div");
const wadahKutipan = document.createElement("div");
const judulWidgetKutipan = document.createElement("h3");
const buttonRefreshKutipan = document.createElement("button");

widgetKutipan.className = "widget-kutipan";
widgetKutipan.id = "kutipan-harian";
widgetKutipan.textContent = "MEMUAT...";
judulWidgetKutipan.textContent = "Quotes Random";
wadahKutipan.className = "header-kutipan";

buttonRefreshKutipan.id = "refresh-kutipan";
buttonRefreshKutipan.title = "Refresh Quotes";
buttonRefreshKutipan.setAttribute("aria-label", "Refresh Quotes");

wadahKutipan.appendChild(judulWidgetKutipan);
wadahKutipan.appendChild(buttonRefreshKutipan);

quotesSection.appendChild(wadahKutipan);
quotesSection.appendChild(widgetKutipan);
async function tampilkanKutipan() {
  try {
    widgetKutipan.textContent = "Memuat Quotes...";

    const data = await ambilKutipan();

    widgetKutipan.textContent = `"${data.quote}"`;
  } catch (error) {
    widgetKutipan.textContent = "Gagal mengambil quotes.";

    console.error("Error Quotes:", error);
  }
}

buttonRefreshKutipan.addEventListener("click", () => {
  tampilkanKutipan();
});

//WIDGET CUACA

const widgetCuaca = document.createElement("div");
const judulWidgetCuaca = document.createElement("h3");
const buttonLokasi = document.createElement("button");

widgetCuaca.id = "info-cuaca";
widgetCuaca.textContent = "Tekan tombol untuk mendeteksi lokasi anda.";
widgetCuaca.className = "widget-cuaca";

judulWidgetCuaca.textContent = "Widget Cuaca";
judulWidgetCuaca.className = "judul-widget-cuaca";

buttonLokasi.id = "button-lokasi";
buttonLokasi.textContent = "Gunakan Lokasi Saya";

cuacaSection.appendChild(judulWidgetCuaca);
cuacaSection.appendChild(buttonLokasi);
cuacaSection.appendChild(widgetCuaca);

async function tampilkanCuaca(latitude, longitude) {
  widgetCuaca.textContent = "Memuat cuaca...";

  try {
    const data = await ambilCuaca(latitude, longitude);

    widgetCuaca.innerHTML = `
      <div class="cuaca-info">
        <img
          src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
          alt="${data.weather[0].description}"
        >

        <div>
          <p class="nama-kota">
            ${data.name}
          </p>

          <p class="suhu">
            ${data.main.temp}°C
          </p>

          <p>
            ${data.weather[0].description}
          </p>
        </div>
      </div>
    `;
  } catch (error) {
    widgetCuaca.textContent = error.message;

    console.error("Error cuaca:", error);
  }
}

function ambilLokasi() {
  widgetCuaca.textContent = "Meminta izin untuk lokasi...";

  if (!navigator.geolocation) {
    widgetCuaca.textContent = "Browser tidak mendukung fitur lokasi.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Garis Lintang:", latitude);
      console.log("Garis Bujur", longitude);

      tampilkanCuaca(latitude, longitude);
    },

    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          widgetCuaca.textContent = "Akses lokasi ditolak oleh user.";
          break;

        case error.POSITION_UNAVAILABLE:
          widgetCuaca.textContent = "Lokasi tidak tersedia.";
          break;

        case error.TIMEOUT:
          widgetCuaca.textContent = "Permintaan lokasi terlalu lama.";
          break;

        default:
          widgetCuaca.textContent = "Terjadi kesalahan saat mengambil lokasi.";
      }

      console.error("Error Geolocation:", error);
    },
  );
}

buttonLokasi.addEventListener("click", () => {
  ambilLokasi();
});

async function muatSemuaWidget() {
  status.textContent = "Memuat data...";

  await tampilkanKutipan();

  status.textContent = "Data berhasil dimuat";
}

window.addEventListener("DOMContentLoaded", muatSemuaWidget);

const footer = document.getElementById("footer");
footer.className = "footer";
const footerText = document.createElement("p");
footerText.innerHTML =
  "© Daily Board - Avicena Fathoni Fawwaz 2026.";

footer.appendChild(footerText);
app.appendChild(footer);

tugasSection.className = "section-tugas";
catatanSection.className = "section-catatan";
quotesSection.className = "section-quotes";
cuacaSection.className = "section-cuaca";
judulSectionTugas.className = "judul-section";
judulSectionCatatan.className = "judul-section";
status.className = "teks-status";
inputFieldTugas.className = "input-teks";
buttonTambah.className = "tombol-utama";
buttonSemua.className =
  buttonSelesai.className =
  buttonBelum.className =
    "tombol-filter";
listTugas.className = "wadah-list";
listCatatan.className = "wadah-list";
inputCatatan.className = "input-teks-textarea";
buttonTambahCatatan.className = "tombol-utama";
judulWidgetCuaca.className = "judul-widget";
