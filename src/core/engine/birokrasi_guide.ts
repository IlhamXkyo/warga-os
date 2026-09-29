import type { PanduanBirokrasi } from '../models';

export const PANDUAN_BIROKRASI: PanduanBirokrasi[] = [
  {
    id: 'ktp_rusak_hilang',
    kategori: 'kependudukan',
    judul: 'Ganti KTP-el Rusak atau Hilang',
    deskripsi: 'Prosedur resmi penerbitan ulang KTP fisik tanpa perlu rekam sidik jari/foto ulang.',
    biayaResmi: 'GRATIS (Rp 0 sesuai UU No. 24 Tahun 2013)',
    waktuProses: '1 s.d. 3 hari kerja (Tergantung ketersediaan blangko Dukcapil)',
    alurSingkat: [
      'Jika HILANG: Buat Surat Tanda Penerimaan Laporan Kehilangan (STPLK) di Polsek terdekat (Gratis).',
      'Jika RUSAK: Cukup bawa fisik KTP lama yang patah/terkelupas chip-nya (tidak perlu surat polisi).',
      'Datang langsung ke kantor Disdukcapil atau gerai Dukcapil di Mall Pelayanan Publik (MPP).',
      'Ambil antrean cetak ulang KTP (bawa fotokopi KK).',
      'KTP-el baru dicetak dan diserahkan langsung.'
    ],
    syaratDokumen: [
      'Surat Kehilangan dari Polsek (Khusus KTP hilang)',
      'Fisik KTP lama yang rusak (Khusus KTP rusak)',
      'Fotokopi Kartu Keluarga (KK terbaru ber-barcode)',
      'Surat Pengantar RT/RW (opsional, beberapa daerah sudah tidak mewajibkan)'
    ],
    tipsPenting: 'Jangan pernah gunakan jasa calo di luar kantor dinas! Layanan pencetakan ulang KTP-el dijamin UU 100% bebas biaya.',
    bebasPungli: true,
  },
  {
    id: 'pecah_kk_baru',
    kategori: 'kependudukan',
    judul: 'Pecah Kartu Keluarga (KK Baru Menikah / Mandiri)',
    deskripsi: 'Pemisahan diri dari KK orang tua setelah menikah atau mandiri satu rumah.',
    biayaResmi: 'GRATIS (Rp 0)',
    waktuProses: '1 s.d. 2 hari kerja (Kini diterbitkan dalam format PDF kertas HVS A4 ber-barcode)',
    alurSingkat: [
      'Minta Surat Pengantar Pembuatan KK Baru dari Ketua RT dan RW.',
      'Bawa berkas ke Kantor Kelurahan untuk verifikasi data kependudukan.',
      'Kelurahan memproses berkas ke Disdukcapil (atau bisa online via aplikasi Dukcapil kota masing-masing).',
      'KK baru ber-barcode digital diterbitkan dan dikirimkan via email/WhatsApp resmi Dukcapil.'
    ],
    syaratDokumen: [
      'Buku Nikah / Akta Perkawinan (asli dan fotokopi)',
      'Kartu Keluarga asli lama dari kedua belah pihak',
      'Fotokopi KTP suami dan istri',
      'Surat Pengantar RT/RW'
    ],
    tipsPenting: 'KK masa kini dicetak mandiri di kertas HVS putih A4 80 gram dengan barcode TTE, tidak lagi menggunakan kertas biru tebal.',
    bebasPungli: true,
  },
  {
    id: 'perpanjang_sim',
    kategori: 'kendaraan',
    judul: 'Perpanjangan SIM A dan SIM C (Satpas / SIM Keliling)',
    deskripsi: 'Perpanjangan SIM sebelum masa berlaku habis (patokan tanggal kedaluwarsa sekarang adalah tanggal cetak, bukan tanggal lahir).',
    biayaResmi: 'SIM A: Rp 80.000 | SIM C: Rp 75.000 (Sesuai PP No. 76/2020)',
    waktuProses: '30 s.d. 60 menit di lokasi',
    alurSingkat: [
      'Lakukan registrasi online (aplikasi Digital Korlantas POLRI) atau datang pagi ke SIM Keliling.',
      'Pemeriksaan tes kesehatan dokter di lokasi (biaya ~Rp 25.000 - 35.000).',
      'Pemeriksaan tes psikologi di lokasi (biaya ~Rp 37.500 - 60.000).',
      'Verifikasi berkas, foto wajah, rekam sidik jari, dan tanda tangan digital.',
      'Tunggu SIM dicetak (5-10 menit).'
    ],
    syaratDokumen: [
      'SIM lama yang masih berlaku (wajib belum lewat dari tanggal kedaluwarsa!)',
      'Fotokopi KTP sebanyak 2 lembar',
      'Surat keterangan sehat dokter & hasil tes psikologi',
      'BPJS Kesehatan aktif (mulai diberlakukan bertahap)'
    ],
    tipsPenting: 'Jangan sampai telat 1 hari pun! Jika lewat dari tanggal masa berlaku, SIM dianggap mati dan wajib mengikuti ujian teori + praktik SIM baru.',
    bebasPungli: false,
  },
  {
    id: 'klaim_bpjs_jht',
    kategori: 'ketenagakerjaan',
    judul: 'Klaim Jaminan Hari Tua (JHT) BPJS Ketenagakerjaan 100%',
    deskripsi: 'Pencairan saldo tabungan kerja bagi pekerja yang mengundurkan diri (resign), habis kontrak, atau PHK.',
    biayaResmi: 'GRATIS (Rp 0 - Tanpa potongan calo)',
    waktuProses: '1 s.d. 3 hari kerja langsung ditransfer ke rekening bank pribadi',
    alurSingkat: [
      'Pastikan status kepesertaan di aplikasi JMO atau Lapak Asik sudah "Non-Aktif" (dinonaktifkan oleh HRD perusahaan lama).',
      'Buka situs resmi Lapak Asik (lapakasik.bpjsketenagakerjaan.go.id) atau aplikasi JMO (jika saldo < Rp 10 juta).',
      'Isi data diri, unggah foto KTP, Kartu Peserta BPJSTK, dan Surat Paklaring (pengalaman kerja).',
      'Ikuti wawancara video call singkat dengan petugas resmi BPJSTK.',
      'Dana JHT masuk ke rekening bank dalam 1x24 jam setelah verifikasi disetujui.'
    ],
    syaratDokumen: [
      'Kartu Peserta BPJS Ketenagakerjaan (KPJ fisik / digital di JMO)',
      'KTP elektronik asli',
      'Buku tabungan bank atas nama sendiri yang masih aktif',
      'Surat Pengunduran Diri / Paklaring dari perusahaan lama',
      'NPWP asli (wajib jika saldo di atas Rp 50 juta)'
    ],
    tipsPenting: 'Saldo JHT di bawah Rp 10 juta bisa cair instan dalam hitungan menit lewat menu JHT di aplikasi JMO tanpa perlu wawancara video call!',
    bebasPungli: true,
  }
];
