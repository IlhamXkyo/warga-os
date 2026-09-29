import type { SuratPayload } from '../models';

export class SuratGeneratorEngine {
  /**
   * Menghasilkan teks redaksi formal sesuai kaidah tata naskah dinas kependudukan Indonesia.
   */
  static generateSurat(payload: SuratPayload): {
    kopSurat: string;
    nomor: string;
    paragrafPembuka: string;
    biodataText: string;
    paragrafIsi: string;
    paragrafPenutup: string;
    tandaTangan: {
      kiriJudul: string;
      kiriNama: string;
      kananJudul: string;
      kananNama: string;
      adaMaterai?: boolean;
    };
  } {
    const tanggalStr = payload.tanggalSurat || new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    switch (payload.jenis) {
      case 'pengantar_rt':
        return {
          kopSurat: `RUKUN TETANGGA ${payload.namaRt || '01'} / RUKUN WARGA ${payload.namaRw || '02'}\nKELURAHAN/DESA ${payload.kelurahanDesa || 'SUKAMAJU'}, KECAMATAN ${payload.kecamatan || 'COBLONG'}\nKABUPATEN/KOTA ${payload.kabupatenKota || 'BANDUNG'}`,
          nomor: payload.nomorSurat || `SP/RT${payload.namaRt || '01'}/RW${payload.namaRw || '02'}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
          paragrafPembuka: 'Yang bertanda tangan di bawah ini, Pengurus RT dan RW setempat, dengan ini menerangkan bahwa:',
          biodataText: `Nama Lengkap       : ${payload.namaLengkap}
NIK                : ${payload.nik}
Tempat/Tgl Lahir   : ${payload.tempatTanggalLahir}
Jenis Kelamin      : ${payload.jenisKelamin}
Agama              : ${payload.agama}
Pekerjaan          : ${payload.pekerjaan}
Alamat KTP         : ${payload.alamatKtp}
Alamat Domisili    : ${payload.alamatDomisili || payload.alamatKtp}`,
          paragrafIsi: `Orang tersebut di atas adalah benar-benar warga yang bertempat tinggal di lingkungan kami dan berkelakuan baik.\nSurat pengantar ini diberikan untuk keperluan: ${payload.keperluan}.`,
          paragrafPenutup: 'Demikian surat pengantar ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.',
          tandaTangan: {
            kiriJudul: 'Mengetahui,\nKetua RW',
            kiriNama: payload.namaRw || '(....................)',
            kananJudul: `${payload.kabupatenKota || 'Bandung'}, ${tanggalStr}\nKetua RT`,
            kananNama: payload.namaRt || '(....................)',
          }
        };

      case 'sku':
        return {
          kopSurat: `PEMERINTAH KABUPATEN/KOTA ${payload.kabupatenKota || 'BANDUNG'}\nKECAMATAN ${payload.kecamatan || 'COBLONG'} - KELURAHAN ${payload.kelurahanDesa || 'SUKAMAJU'}`,
          nomor: payload.nomorSurat || `503/SKU/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
          paragrafPembuka: 'Kepala Kelurahan/Desa menerangkan dengan sesungguhnya bahwa:',
          biodataText: `Nama Pemilik Usaha : ${payload.namaLengkap}
NIK                : ${payload.nik}
Tempat/Tgl Lahir   : ${payload.tempatTanggalLahir}
Pekerjaan          : ${payload.pekerjaan}
Alamat KTP         : ${payload.alamatKtp}
Nama Usaha         : ${payload.namaUsaha || 'Toko Barokah'}
Bidang / Jenis     : ${payload.jenisUsaha || 'Perdagangan & Jasa'}
Alamat Tempat Usaha: ${payload.alamatUsaha || payload.alamatKtp}`,
          paragrafIsi: `Berdasarkan keterangan yang bersangkutan dan pemeriksaan lapangan, nama tersebut di atas benar-benar memiliki dan menjalankan kegiatan usaha sebagaimana tercantum.\nSurat Keterangan Usaha ini diterbitkan untuk keperluan: ${payload.keperluan}.`,
          paragrafPenutup: 'Demikian Surat Keterangan Usaha ini diberikan kepada yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya.',
          tandaTangan: {
            kiriJudul: 'Pemilik Usaha',
            kiriNama: payload.namaLengkap,
            kananJudul: `${payload.kabupatenKota || 'Bandung'}, ${tanggalStr}\nKepala Kelurahan / Desa`,
            kananNama: '(....................)',
          }
        };

      case 'kuasa':
        return {
          kopSurat: 'SURAT KUASA',
          nomor: payload.nomorSurat || '',
          paragrafPembuka: 'Saya yang bertanda tangan di bawah ini (selaku Pemberi Kuasa):',
          biodataText: `Nama Lengkap       : ${payload.namaLengkap}
NIK                : ${payload.nik}
Alamat KTP         : ${payload.alamatKtp}

Dengan ini memberikan kuasa penuh kepada:

Nama Penerima Kuasa: ${payload.namaPenerimaKuasa || '....................'}
NIK Penerima Kuasa : ${payload.nikPenerimaKuasa || '....................'}`,
          paragrafIsi: `UNTUK DAN ATAS NAMA PEMBERI KUASA:\n${payload.kuasaUntuk || payload.keperluan}\n\nPenerima kuasa berhak menandatangani dokumen yang sah dan mengambil tindakan hukum yang diperlukan sehubungan dengan pelimpahan kuasa ini.`,
          paragrafPenutup: 'Surat kuasa ini dibuat dengan sadar, tanpa paksaan dari pihak mana pun, dan dapat dipergunakan sesuai batas wewenang yang diberikan.',
          tandaTangan: {
            kiriJudul: 'Penerima Kuasa',
            kiriNama: payload.namaPenerimaKuasa || '....................',
            kananJudul: `${payload.kabupatenKota || 'Bandung'}, ${tanggalStr}\nPemberi Kuasa`,
            kananNama: payload.namaLengkap,
            adaMaterai: true,
          }
        };

      case 'sewa_kos':
      default:
        return {
          kopSurat: 'SURAT PERJANJIAN SEWA MENYEWA KAMAR KOS / TEMPAT TINGGAL',
          nomor: payload.nomorSurat || `SPK/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
          paragrafPembuka: 'Pada hari ini telah disepakati perjanjian sewa menyewa antara:',
          biodataText: `PIHAK PERTAMA (Pemilik Kos):
Nama               : ${payload.namaPemilikKos || '....................'}
Alamat             : ${payload.alamatKtp}

PIHAK KEDUA (Penyewa):
Nama Penyewa       : ${payload.namaLengkap}
NIK                : ${payload.nik}
Pekerjaan          : ${payload.pekerjaan}
No. HP / WA        : (Tertera pada data penyewa)`,
          paragrafIsi: `KEDUA BELAH PIHAK MENYEPAKATI KETENTUAN BERIKUT:\n1. Pihak Pertama menyewakan Kamar Kos No: ${payload.nomorKamar || '01'} kepada Pihak Kedua.\n2. Biaya sewa disepakati sebesar Rp ${(payload.biayaSewaPerBulan || 850000).toLocaleString('id-ID')} per bulan, dibayar setiap tanggal awal periode.\n3. Fasilitas yang diterima: ${payload.fasilitasKos || 'Listrik token mandiri, kasur, lemari, WiFi, kamar mandi dalam'}.\n4. Pihak Kedua wajib menjaga kebersihan, ketertiban lingkungan, dan tidak membawa barang terlarang.\n5. Pihak Kedua dilarang memindahtangankan sewa kepada pihak lain tanpa persetujuan tertulis Pihak Pertama.`,
          paragrafPenutup: 'Demikian surat perjanjian ini dibuat rangkap dua bermaterai cukup dan memiliki kekuatan hukum yang sama bagi kedua belah pihak.',
          tandaTangan: {
            kiriJudul: 'Pihak Kedua (Penyewa)',
            kiriNama: payload.namaLengkap,
            kananJudul: `${payload.kabupatenKota || 'Bandung'}, ${tanggalStr}\nPihak Pertama (Pemilik Kos)`,
            kananNama: payload.namaPemilikKos || '....................',
            adaMaterai: true,
          }
        };
    }
  }
}
