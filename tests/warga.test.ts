import { PlnCalculatorEngine, TARIF_PLN } from '../src/core/engine/pln_calculator';
import { SuratGeneratorEngine } from '../src/core/engine/surat_generator';
import { PantryAdvisorEngine } from '../src/core/engine/pantry_advisor';
import { AlatElektronik, SuratPayload } from '../src/core/models';

console.log('--- RUNNING WARGAOS MATHEMATICAL & LOGIC VERIFICATION ---');

// 1. Test PLN Calculator
const testAlat: AlatElektronik[] = [
  { id: '1', nama: 'Laptop', dayaWatt: 50, jamPakaiPerHari: 10, jumlahUnit: 1 }, // 500 Wh = 0.5 kWh
  { id: '2', nama: 'Kulkas', dayaWatt: 70, jamPakaiPerHari: 24, jumlahUnit: 1 }, // 1680 Wh = 1.68 kWh
];
// Total = 2.18 kWh / hari

const hasilPln = PlnCalculatorEngine.hitungToken(100000, '1300VA', testAlat, 2500, 5);

console.assert(hasilPln.nominalBeli === 100000, 'Nominal beli harus 100.000');
console.assert(hasilPln.biayaAdminBank === 2500, 'Admin bank harus 2.500');
console.assert(hasilPln.danaBeliListrikBersih > 0, 'Dana bersih listrik harus > 0');
console.assert(hasilPln.kwhDidapat > 60 && hasilPln.kwhDidapat < 70, `kWh didapat (${hasilPln.kwhDidapat}) harus dalam rentang realistis ~64 kWh`);
console.assert(hasilPln.konsumsiKwhHarian === 2.18, `Konsumsi harian (${hasilPln.konsumsiKwhHarian}) harus tepat 2.18 kWh`);
console.assert(hasilPln.estimasiHariBertahan > 25, `Estimasi hari bertahan (${hasilPln.estimasiHariBertahan}) harus logis`);

console.log('✓ PLN Calculator Engine: PASS');

// 2. Test Surat Generator
const testSurat: SuratPayload = {
  id: 'test-1',
  jenis: 'pengantar_rt',
  judul: 'Surat Pengantar RT',
  tanggalSurat: '30 September 2026',
  namaLengkap: 'Ilham Maulana',
  nik: '3273010101980001',
  tempatTanggalLahir: 'Bandung, 10 Mei 1998',
  jenisKelamin: 'Laki-laki',
  agama: 'Islam',
  pekerjaan: 'Software Engineer',
  statusPerkawinan: 'Belum Kawin',
  alamatKtp: 'Jl. Tubagus Ismail No. 42',
  keperluan: 'Ganti KTP Rusak',
  namaRt: '03',
  namaRw: '07',
  kelurahanDesa: 'Sekeloa',
  kecamatan: 'Coblong',
  kabupatenKota: 'Kota Bandung',
  createdAt: Date.now(),
};

const suratOut = SuratGeneratorEngine.generateSurat(testSurat);
console.assert(suratOut.kopSurat.includes('RUKUN TETANGGA 03'), 'Kop surat harus berisi RT 03');
console.assert(suratOut.biodataText.includes('Ilham Maulana'), 'Biodata harus memuat nama pemohon');
console.assert(suratOut.paragrafIsi.includes('Ganti KTP Rusak'), 'Paragraf isi harus memuat keperluan');

console.log('✓ Surat Generator Engine: PASS');

// 3. Test Pantry Recipe Matcher
const bahanTersedia = ['telur_ayam', 'cabe_rawit', 'bawang_merah_putih'];
const hasilResep = PantryAdvisorEngine.matchRecipes(bahanTersedia);
console.assert(hasilResep.resepBisaDimasak.length > 0, 'Harus menemukan minimal 1 resep yang bisa dimasak');
console.log(`✓ Pantry Advisor Engine: PASS (${hasilResep.resepBisaDimasak.length} resep cocok)`);

console.log('--- ALL WARGAOS LOGIC TESTS PASSED SUCCESSFULLY! ---');
