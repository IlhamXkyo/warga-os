import type { KontakDarurat } from '../models';

export const KONTAK_DARURAT_NASIONAL: KontakDarurat[] = [
  { nama: 'Layanan Darurat Terpadu (Semua Kejadian)', nomor: '112', deskripsi: 'Panggilan darurat bebas pulsa nasional (Mirip 911), langsung terhubung ke BPBD & pos komando daerah.', bebasPulsa: true },
  { nama: 'Kepolisian RI (Patroli & Kejahatan)', nomor: '110', deskripsi: 'Pelaporan tindak kriminal, kecelakaan lalu lintas, dan gangguan keamanan 24 jam.', bebasPulsa: true },
  { nama: 'Pemadam Kebakaran & Penyelamatan', nomor: '113', deskripsi: 'Kebakaran, evakuasi sarang tawon, ular masuk rumah, dan penyelamatan darurat.', bebasPulsa: true },
  { nama: 'Ambulans & Gawat Darurat Medis', nomor: '118 / 119', deskripsi: 'Evakuasi medis cepat, serangan jantung, kecelakaan fatal, rujukan IGD.', bebasPulsa: true },
  { nama: 'BASARNAS (Pencarian & Bencana)', nomor: '115', deskripsi: 'Pencarian orang hilang di alam bebas, bencana banjir bandang, evakuasi runtuhan.', bebasPulsa: true },
  { nama: 'PLN Pengaduan Gangguan & Korsleting', nomor: '123', deskripsi: 'Tiang listrik meledak, kabel putus di jalan, korsleting berbahaya (Kode area + 123).', bebasPulsa: false },
];

export interface PanduanP3K {
  kejadian: string;
  tingkatBahaya: 'KRITIS' | 'TINGGI' | 'SEDANG';
  langkahTindakan: string[];
  pantanganKeras: string[];
}

export const PANDUAN_P3K_DARURAT: PanduanP3K[] = [
  {
    kejadian: 'Tabung Gas LPG (3kg/12kg) Mendesis atau Bau Gas Menyengat',
    tingkatBahaya: 'KRITIS',
    langkahTindakan: [
      'Segera cabut regulator dari mulut tabung gas.',
      'Buka semua pintu dan jendela selebar-lebarnya agar sirkulasi udara mengalir deras.',
      'Bawa tabung gas keluar ruangan ke tempat terbuka (teras/halaman).',
      'Jika api kecil menyala di mulut tabung, jangan panik: basahi handuk/karung goni tebal dengan air, lalu tutupkan rapat secara mantap ke kepala tabung untuk memutus oksigen.'
    ],
    pantanganKeras: [
      'DILARANG menyalakan atau mematikan saklar lampu dan colokan listrik apa pun (percikan api kecil di dalam saklar bisa memicu ledakan seketika).',
      'DILARANG menyalakan korek api atau merokok.',
      'DILARANG menyalakan exhaust fan atau kipas angin saat gas masih pekat berkumpul.'
    ]
  },
  {
    kejadian: 'Korsleting Listrik & Bau Hangus di Dalam Rumah / Kamar Kos',
    tingkatBahaya: 'KRITIS',
    langkahTindakan: [
      'Lari segera ke meteran listrik PLN di depan rumah, turunkan tuas MCB utama ke posisi OFF.',
      'Cabut steker alat yang mengeluarkan asap jika masih aman dijangkau dengan tangan terlindung kain kering.',
      'Gunakan kain basah diperas (tidak menetes) atau pasir untuk memadamkan percikan api kecil.'
    ],
    pantanganKeras: [
      'DILARANG menyiramkan air langsung ke instalasi listrik yang arusnya belum dimatikan dari MCB utama (bisa tersetrum fatal).',
      'DILARANG menyentuh kabel yang terkelupas dengan tangan telanjang basah.'
    ]
  },
  {
    kejadian: 'Gigitan Ular Berbisa (Kobra / Belang / Tanah / Hijau Ekor Merah)',
    tingkatBahaya: 'KRITIS',
    langkahTindakan: [
      'IMOBILISASI TOTAL (Protokol Resmi WHO): Pasang bidai kayu atau papan di sepanjang lengan/kaki yang digigit, lalu balut dengan kain elastis agar bagian tubuh tersebut tidak bergerak sama sekali (seperti membebat tulang patah). Bisa ular menyebar lewat getah bening yang dipicu oleh gerakan otot.',
      'Posisikan korban dalam keadaan tenang dan istirahat berbaring.',
      'Foto ular dari jarak aman jika memungkinkan untuk identifikasi serum antivenom (SABU).',
      'Segera bawa ke IGD Rumah Sakit Umum Daerah (RSUD) terdekat yang memiliki stok SABU.'
    ],
    pantanganKeras: [
      'DILARANG menyayat atau melukai luka gigitan dengan silet/pisau.',
      'DILARANG menghisap darah dari luka gigitan dengan mulut.',
      'DILARANG mengikat kencang dengan tali/tourniquet (dapat menyebabkan pembusukan jaringan dan amputasi).',
      'DILARANG menempelkan batu es, minyak rem, atau ramuan herbal ke atas luka.'
    ]
  }
];
