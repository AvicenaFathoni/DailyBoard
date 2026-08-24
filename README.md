# DailyBoard

DailyBoard adalah dashboard yang membantu user dalam mencatat produktivitas harian dengan daftar tugas (to-do-list), quick notes, serta widget quotes random dan widget cuaca.

## Tugas

### Menambahkan tugas
Ketik nama tugas di dalam input field lalu tekan tombol "Tambah Tugas".\
Nama tugas tidak boleh kosong dan tidak boleh lebih dari 100 karakter.

### Menandakan tugas yang sudah selesai
Tugas secara default akan memiliki status Belum.\
Klik sebanyak 1 (satu) kali pada tugas yang ingin ditandai sebagai Selesai.\
Klik lagi untuk mengembalikannya menjadi status Belum.

### Mengedit tugas yang sudah ada
Klik sebanyak 2 (dua) kali pada tugas yang sudah ada dan ingin diedit.\
Nama tugas baru tidak boleh kosong dan tidak boleh lebih dari 100 karakter.

### Memfilter tugas berdasarkan statusnya (Semua/Selesai/Belum)
Klik tombol "Semua" untuk menampilkan semua tugas.\
Gunakan tombol "Selesai" atau "Belum" untuk memfilter tugas berdasarkan statusnya.

### Pencarian tugas
Ketik nama tugas yang ingin dicari di dalam input field pencarian tugas.\
Sistem secara otomatis akan menampilkan nama tugas yang sesuai dengan input.

### Hapus tugas
Klik tombol "Hapus" untuk menghapus tugas.\
Setiap tugas yang ditambahkan akan memiliki tombol "Hapus" tersendiri.

## Catatan/Notes
Ketik nama tugas di dalam input field lalu tekan tombol "Tambah Tugas".\
Nama tugas tidak boleh kosong dan tidak boleh lebih dari 100 karakter.

### Menambahkan catatan
Ketik catatan di dalam input field lalu tekan tombol "Tambah Catatan".\
Sistem secara otomatis akan menampilkan tanggal pembuatan catatan tersebut.

### Mengedit catatan yang sudah ada
Klik sebanyak 2 (dua) kali pada catatan yang ingin diedit.

### Menghapus catatan
Klik tombol "Hapus" untuk menghapus catatan.\
Setiap catatan yang ditambahkan akan memiliki tombol "Hapus" tersendiri.

## Widgets

#### Quotes Random
Sistem akan menampilkan kutipan-kutipan motivasional yang dapat direfresh oleh user untuk menampilkan kutipan lainnya dengan tombol yang disediakan.\
https://motivational-spark-api.vercel.app/api/quotes/random

#### Cuaca Berdasarkan Lokasi User
Sistem dapat menampilkan cuaca dari suatu kota atau wilayah tertentu dengan API openweathermap.\
https://api.openweathermap.org

API bawaan dari browser yakin Geolocation digunakan untuk mencari koordinat user (latitude, longitude) yang kemudian digunakan untuk mementukan kota atau wilayah secara otomatis.\
User harus menekan tombol "Gunakan Lokasi Saya" terlebih dahulu, lalu sistem akan meminta izin akses lokasi user.

Terdapat 3 jenis error yang diketahui:
1. _PERMISSION_DENIED_ ;
   Akses ditolak oleh user.
2. _POSITION_UNAVAILABLE_ ;
   Lokasi tidak tersedia. 
3. _TIMEOUT_ ;
   Request lokasi memakan waktu terlalu lama.

Error message default akan ditampilkan jika penyebab error bukan merupakan ketiganya,\
Yakni "Terjadi kesalahan saat mengambil lokasi."

## Dark Mode
User dapat memilih untuk menggunakan tema default (Light) atau tema gelap (Dark) dengan tombol matahari/bulan yang terdapat di pojok kanan atas halaman.
