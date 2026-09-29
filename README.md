# WargaOS 🇮🇩

> **Super-App Solusi Masalah Nyata Sehari-hari Warga & Anak Kos Indonesia.**  
> *Generator Surat Resmi Standar A4, Simulator Token Listrik PLN, Navigator Hak Birokrasi Anti-Pungli, Pantri Tropis Anti-Basi, & Pusat Tanggap Darurat Rumah Tangga.*

---

## 1. Latar Belakang & Masalah Riil Sehari-hari

Sebagian besar aplikasi teknologi fokus pada ranah korporat atau finansial, padahal jutaan warga, keluarga muda, perantau, dan anak kos di Indonesia menghadapi gesekan birokrasi dan rumah tangga yang sangat nyata setiap harinya:
1. **Kebingungan Administrasi Kependudukan**: Setiap kali membutuhkan Surat Pengantar RT/RW, Surat Keterangan Usaha (SKU) untuk pinjaman KUR, atau Surat Kuasa, warga bingung mencari format baku resmi yang tidak ditolak kelurahan.
2. **Misteri Token Listrik PLN**: Sering kaget token listrik berbunyi alarm *tit-tit-tit* di malam hari tanpa tahu berapa sisa hari ketahanan daya dari alat-alat yang menyala (laptop, kulkas mini, rice cooker, kipas).
3. **Pungli & Labirin Birokrasi**: Banyak warga tidak mengetahui bahwa penggantian KTP-el rusak/hilang, pembuatan KK baru, dan akta kependudukan dijamin **100% GRATIS (Rp 0)** oleh UU No. 24 Tahun 2013.
4. **Pangan Pasar Tropis Cepat Busuk**: Iklim Indonesia yang lembab membuat cabai rawit, tempe, tahu, dan bumbu dapur cepat berlendir atau berjamur di kulkas jika salah teknik penyimpanan.
5. **Kepanikan Tanggap Darurat**: Saat tabung gas LPG 3kg mendesis atau terjadi korsleting listrik, warga sering salah langkah fatal karena tidak tersedianya panduan aksi cepat yang teruji.

**WargaOS** dibangun untuk menyelesaikan masalah-masalah harian ini secara elegan, 100% offline, bebas iklan, dan tanpa memungut biaya sepeser pun.

---

## 2. Fitur Unggulan

### 📝 A. Generator Berkas & Surat Resmi (Siap Cetak A4 / PDF)
* **Surat Pengantar RT / RW**: Format tata naskah dinas baku kelurahan, lengkap dengan nomor surat otomatis dan blok tanda tangan Ketua RT/RW.
* **Surat Keterangan Usaha (SKU)**: Dokumen verifikasi usaha UMKM untuk syarat pembukaan rekening usaha dan pengajuan modal.
* **Surat Kuasa Resmi**: Dilengkapi dengan kotak penanda posisi materai tempel Rp 10.000 dan penegasan batas wewenang.
* **Surat Perjanjian Sewa Kamar Kos / Rumah**: Melindungi penyewa dan pemilik kos dengan 5 klausul hukum baku hak dan kewajiban.
* *Cetak 1-Klik*: Langsung terhubung ke dialog cetak A4 atau *Save as PDF* peramban dengan margin kearsipan standar (3-4 cm).

### ⚡ B. Simulator Token Listrik & Profil Beban PLN
* **Kalkulasi Akurat Tarif ESDM 2026**: Rincian potongan biaya admin bank (Rp 2.500) dan Pajak Penerangan Jalan (PPJ daerah 3-10%) untuk golongan 450 VA s.d. 3.500 VA.
* **Pemberitahuan KWh Bersih**: Menghitung jumlah kWh murni yang masuk ke meteran.
* **Inventaris Beban Elektronik**: Masukkan watt dan durasi jam alat harian (laptop, kulkas, magic jar, kipas angin, lampu) untuk mengetahui **berapa hari token akan bertahan** sebelum alarm berbunyi.

### 🏛️ C. Navigator Hak Birokrasi & Anti-Pungli
* Panduan resmi, alur lapangan, dan checklist berkas anti-ditolak untuk:
  * Ganti KTP-el Rusak atau Hilang (**GRATIS Rp 0**).
  * Pecah KK Baru setelah Menikah (**GRATIS Rp 0**).
  * Perpanjangan SIM A & SIM C (Biaya PNBP Resmi PP 76/2020).
  * Pencairan Saldo Jaminan Hari Tua (JHT) BPJS Ketenagakerjaan 100%.

### 🍳 D. Pantri Nusantara & Anti-Limbah Dapur
* **Katalog Masa Simpan Iklim Tropis**: Cara simpan cabai tahan 30 hari tanpa busuk, teknik merawat tahu pasar agar tidak berlendir, dan penyimpanan bumbu pawon.
* **Pencocok Resep Sisa Kulkas**: Centang bahan yang ada di kulkas kos/rumah -> sistem otomatis menyajikan resep masakan nusantara sat-set super hemat (Orak-Arik Telur Sayur, Orek Tempe Pedas Manis, Tumis Kangkung Belacan).

### 🚨 E. Pusat Panggilan Darurat & P3K
* Kontak darurat satu pintu nasional: **112** (Layanan Terpadu Bebas Pulsa), **110** (Polisi), **113** (Pemadam & Evakuasi Satwa), **118/119** (Ambulans Medis), **123** (PLN).
* Protokol pertolongan pertama:
  * Tabung gas LPG 3kg mendesis pekat (pantangan menyalakan saklar listrik).
  * Korsleting listrik & bau kabel hangus.
  * Protokol resmi WHO penanganan gigitan ular berbisa Indonesia (imobilisasi total tanpa sayatan/tourniquet).

---

## 3. Privasi & Keamanan (Local Enclave)

* **100% Offline-Ready**: Tidak ada server backend eksternal, tidak ada analitik pihak ketiga, dan tidak ada pelacak.
* **Penyimpanan Lokal**: NIK, nama lengkap, dan data kependudukan hanya tersimpan di `localStorage` peramban komputer Anda sendiri.

---

## 4. Cara Menjalankan

### Cara Cepat (Windows):
Cukup klik ganda berkas `launch.bat` di direktori proyek.

### Cara Manual (Terminal / Command Prompt):
```bash
# Masuk ke direktori
cd warga-os

# Jalankan server lokal
npm run dev
```
Buka peramban di: `http://localhost:5173`

Untuk melakukan kompilasi build produksi:
```bash
npm run build
```

---

## 5. Lisensi

Didistribusikan di bawah lisensi MIT. Didedikasikan untuk kemudahan hidup seluruh warga Indonesia.
