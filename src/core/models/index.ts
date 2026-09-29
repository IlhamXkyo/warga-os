/**
 * Domain models for WargaOS (Sistem Operasi Keseharian Warga Indonesia).
 */

export type JenisSurat =
  | 'pengantar_rt'
  | 'domisili'
  | 'sku'
  | 'belum_menikah'
  | 'kuasa'
  | 'sewa_kos';

export interface SuratPayload {
  id: string;
  jenis: JenisSurat;
  judul: string;
  nomorSurat?: string;
  tanggalSurat: string;
  // Identitas Pemohon
  namaLengkap: string;
  nik: string;
  tempatTanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  agama: string;
  pekerjaan: string;
  statusPerkawinan: 'Belum Kawin' | 'Kawin' | 'Cerai Hidup' | 'Cerai Mati';
  alamatKtp: string;
  alamatDomisili?: string;
  keperluan: string;
  // Detail Tambahan Khusus
  namaUsaha?: string;
  jenisUsaha?: string;
  alamatUsaha?: string;
  namaPemberiKuasa?: string;
  namaPenerimaKuasa?: string;
  nikPenerimaKuasa?: string;
  kuasaUntuk?: string;
  // Sewa Kos
  namaPemilikKos?: string;
  nomorKamar?: string;
  biayaSewaPerBulan?: number;
  durasiBulan?: number;
  fasilitasKos?: string;
  // Pejabat Setempat
  namaRt?: string;
  namaRw?: string;
  kelurahanDesa?: string;
  kecamatan?: string;
  kabupatenKota?: string;
  createdAt: number;
}

export type DayaPLN = '450VA' | '900VA_SUBSIDI' | '900VA_NON' | '1300VA' | '2200VA' | '3500VA';

export interface AlatElektronik {
  id: string;
  nama: string;
  dayaWatt: number;
  jamPakaiPerHari: number;
  jumlahUnit: number;
}

export interface HasilKalkulasiPLN {
  nominalBeli: number;
  daya: DayaPLN;
  tarifPerKwh: number;
  biayaAdminBank: number;
  pajakPpjPersen: number;
  biayaPpj: number;
  biayaPpn: number;
  danaBeliListrikBersih: number;
  kwhDidapat: number;
  konsumsiKwhHarian: number;
  biayaListrikHarian: number;
  estimasiHariBertahan: number;
}

export interface PanduanBirokrasi {
  id: string;
  kategori: 'kependudukan' | 'kendaraan' | 'kesehatan' | 'ketenagakerjaan' | 'paspor';
  judul: string;
  deskripsi: string;
  biayaResmi: string;
  waktuProses: string;
  alurSingkat: string[];
  syaratDokumen: string[];
  tipsPenting: string;
  bebasPungli: boolean;
}

export interface BahanPangan {
  id: string;
  nama: string;
  kategori: 'sayur' | 'bumbu' | 'protein' | 'pokok';
  tempatSimpan: 'Suhu Ruang' | 'Kulkas (Chiller)' | 'Freezer';
  masaSimpanHari: number;
  tipsSimpan: string;
  tandaBasi: string;
}

export interface ResepNusantara {
  id: string;
  nama: string;
  waktuMenit: number;
  tingkatHemat: 'Super Hemat' | 'Sedang';
  bahanWajib: string[];
  langkahMasak: string[];
}

export interface KontakDarurat {
  nama: string;
  nomor: string;
  deskripsi: string;
  bebasPulsa: boolean;
}
