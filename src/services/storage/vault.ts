import type { AlatElektronik, DayaPLN, SuratPayload } from '../../core/models';
import { ALAT_DEFAULT } from '../../core/engine/pln_calculator';

export interface WargaVaultState {
  profil: {
    namaLengkap: string;
    nik: string;
    tempatTanggalLahir: string;
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    agama: string;
    pekerjaan: string;
    statusPerkawinan: 'Belum Kawin' | 'Kawin' | 'Cerai Hidup' | 'Cerai Mati';
    alamatKtp: string;
    alamatDomisili: string;
    namaRt: string;
    namaRw: string;
    kelurahanDesa: string;
    kecamatan: string;
    kabupatenKota: string;
  };
  pln: {
    daya: DayaPLN;
    nominalBeli: number;
    biayaAdmin: number;
    pajakPpj: number;
    daftarAlat: AlatElektronik[];
  };
  daftarSurat: SuratPayload[];
  bahanKulkasTerpilih: string[];
}

const STORAGE_KEY = 'warga_os_vault_v1';

export const DEFAULT_WARGA_VAULT: WargaVaultState = {
  profil: {
    namaLengkap: 'Ilham Maulana',
    nik: '3273010101980001',
    tempatTanggalLahir: 'Bandung, 10 Mei 1998',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Karyawan Swasta / Software Engineer',
    statusPerkawinan: 'Belum Kawin',
    alamatKtp: 'Jl. Tubagus Ismail No. 42 RT 03 / RW 07',
    alamatDomisili: 'Jl. Tubagus Ismail No. 42 RT 03 / RW 07',
    namaRt: '03 (Bpk. Mulyono)',
    namaRw: '07 (Bpk. Hendra)',
    kelurahanDesa: 'Sekeloa',
    kecamatan: 'Coblong',
    kabupatenKota: 'Kota Bandung',
  },
  pln: {
    daya: '1300VA',
    nominalBeli: 100000,
    biayaAdmin: 2500,
    pajakPpj: 5,
    daftarAlat: ALAT_DEFAULT,
  },
  daftarSurat: [
    {
      id: 'surat-demo-1',
      jenis: 'pengantar_rt',
      judul: 'Surat Pengantar Pembuatan KTP Baru',
      tanggalSurat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      namaLengkap: 'Ilham Maulana',
      nik: '3273010101980001',
      tempatTanggalLahir: 'Bandung, 10 Mei 1998',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pekerjaan: 'Karyawan Swasta / Software Engineer',
      statusPerkawinan: 'Belum Kawin',
      alamatKtp: 'Jl. Tubagus Ismail No. 42 RT 03 / RW 07',
      alamatDomisili: 'Jl. Tubagus Ismail No. 42 RT 03 / RW 07',
      keperluan: 'Permohonan Penggantian KTP-el Rusak ke Disdukcapil',
      namaRt: '03 (Bpk. Mulyono)',
      namaRw: '07 (Bpk. Hendra)',
      kelurahanDesa: 'Sekeloa',
      kecamatan: 'Coblong',
      kabupatenKota: 'Kota Bandung',
      createdAt: Date.now() - 86400000,
    }
  ],
  bahanKulkasTerpilih: ['telur_ayam', 'cabe_rawit', 'bawang_merah_putih'],
};

export class WargaVaultService {
  static load(): WargaVaultState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_WARGA_VAULT;
  }

  static save(state: WargaVaultState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore
    }
  }

  static reset(): WargaVaultState {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_WARGA_VAULT;
  }
}
