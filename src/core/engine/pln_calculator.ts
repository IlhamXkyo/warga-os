import type { AlatElektronik, DayaPLN, HasilKalkulasiPLN } from '../models';

export const TARIF_PLN: Record<DayaPLN, { nama: string; tarifPerKwh: number }> = {
  '450VA': { nama: 'R-1 450 VA (Subsidi)', tarifPerKwh: 415 },
  '900VA_SUBSIDI': { nama: 'R-1 900 VA (Subsidi)', tarifPerKwh: 605 },
  '900VA_NON': { nama: 'R-1 900 VA (Non-Subsidi RTM)', tarifPerKwh: 1352 },
  '1300VA': { nama: 'R-1 1.300 VA (Standar Kos/Rumah)', tarifPerKwh: 1444.70 },
  '2200VA': { nama: 'R-1 2.200 VA', tarifPerKwh: 1444.70 },
  '3500VA': { nama: 'R-2 3.500 VA', tarifPerKwh: 1699.53 },
};

export const ALAT_DEFAULT: AlatElektronik[] = [
  { id: '1', nama: 'Laptop / PC Kerja', dayaWatt: 65, jamPakaiPerHari: 10, jumlahUnit: 1 },
  { id: '2', nama: 'Kulkas 1 Pintu / Mini Bar', dayaWatt: 70, jamPakaiPerHari: 24, jumlahUnit: 1 },
  { id: '3', nama: 'Kipas Angin Stand', dayaWatt: 45, jamPakaiPerHari: 12, jumlahUnit: 1 },
  { id: '4', nama: 'Rice Cooker (Memasak + Hangat)', dayaWatt: 350, jamPakaiPerHari: 2, jumlahUnit: 1 },
  { id: '5', nama: 'Lampu LED Kamar & Teras', dayaWatt: 12, jamPakaiPerHari: 10, jumlahUnit: 3 },
  { id: '6', nama: 'Charger HP & Aksesoris', dayaWatt: 20, jamPakaiPerHari: 4, jumlahUnit: 2 },
];

export class PlnCalculatorEngine {
  /**
   * Hitung rincian pembelian token listrik dan estimasi ketahanan daya.
   */
  static hitungToken(
    nominalBeli: number,
    daya: DayaPLN,
    alatList: AlatElektronik[],
    biayaAdminBank: number = 2500,
    pajakPpjPersen: number = 5
  ): HasilKalkulasiPLN {
    const infoDaya = TARIF_PLN[daya] || TARIF_PLN['1300VA'];
    const tarifPerKwh = infoDaya.tarifPerKwh;

    // Nominal terpotong admin
    const danaSetelahAdmin = Math.max(0, nominalBeli - biayaAdminBank);

    // Pajak Penerangan Jalan (PPJ) dari dana setelah admin
    const ppjMultiplier = pajakPpjPersen / (100 + pajakPpjPersen);
    const biayaPpj = Math.round(danaSetelahAdmin * ppjMultiplier);
    const biayaPpn = 0; // Token rumah tangga bebas PPN

    // Dana bersih untuk energi
    const danaBeliListrikBersih = Math.max(0, danaSetelahAdmin - biayaPpj);

    // Total kWh bersih didapat
    const kwhDidapat = Number((danaBeliListrikBersih / tarifPerKwh).toFixed(2));

    // Konsumsi harian total dari daftar alat
    let totalWattJamHarian = 0;
    alatList.forEach(alat => {
      totalWattJamHarian += alat.dayaWatt * alat.jamPakaiPerHari * alat.jumlahUnit;
    });

    const konsumsiKwhHarian = Number((totalWattJamHarian / 1000).toFixed(2));
    const biayaListrikHarian = Math.round(konsumsiKwhHarian * tarifPerKwh);

    // Estimasi hari bertahan
    let estimasiHariBertahan = 999;
    if (konsumsiKwhHarian > 0) {
      estimasiHariBertahan = Number((kwhDidapat / konsumsiKwhHarian).toFixed(1));
    }

    return {
      nominalBeli,
      daya,
      tarifPerKwh,
      biayaAdminBank,
      pajakPpjPersen,
      biayaPpj,
      biayaPpn,
      danaBeliListrikBersih,
      kwhDidapat,
      konsumsiKwhHarian,
      biayaListrikHarian,
      estimasiHariBertahan,
    };
  }
}
