import type { BahanPangan, ResepNusantara } from '../models';

export const KATALOG_PANGAN: BahanPangan[] = [
  {
    id: 'cabe_rawit',
    nama: 'Cabai Rawit Merah / Hijau',
    kategori: 'sayur',
    tempatSimpan: 'Kulkas (Chiller)',
    masaSimpanHari: 30,
    tipsSimpan: 'Petik tangkainya (jangan dicuci dulu), lap hingga benar-benar kering, alas wadah kedap udara dengan tisu dapur, masukkan 1 siung bawang putih kupas sebagai anti-bakteri alami.',
    tandaBasi: 'Lembek berair, timbul bercak hitam jamur, dan berbau asam menyengat.',
  },
  {
    id: 'tahu_putih',
    nama: 'Tahu Putih / Kuning Pasar',
    kategori: 'protein',
    tempatSimpan: 'Kulkas (Chiller)',
    masaSimpanHari: 7,
    tipsSimpan: 'Cuci bersih lendir pasar, rebus tahu sebentar dalam air mendidih bergaram (1 menit), lalu rendam dalam wadah berisi air matang dingin di kulkas. Ganti air rendaman tiap 2 hari.',
    tandaBasi: 'Berlendir tebal, air rendaman keruh berbusa, dan berasa kecut/asam.',
  },
  {
    id: 'tempe',
    nama: 'Tempe Papan Tradisional',
    kategori: 'protein',
    tempatSimpan: 'Kulkas (Chiller)',
    masaSimpanHari: 4,
    tipsSimpan: 'Bungkus rapat dengan plastik cling wrap agar ragi tidak terus tumbuh. Atau kukus 5 menit sebelum disimpan di kulkas jika ingin bertahan hingga 8 hari.',
    tandaBasi: 'Bintik hitam berubah kecokelatan basah, bau amonia menyengat (tempe semangit), tekstur lembek.',
  },
  {
    id: 'kangkung_bayam',
    nama: 'Kangkung & Bayam',
    kategori: 'sayur',
    tempatSimpan: 'Kulkas (Chiller)',
    masaSimpanHari: 4,
    tipsSimpan: 'Jangan dicuci saat baru beli. Bungkus dengan kertas koran atau kertas cokelat kering, simpan di laci bawah kulkas.',
    tandaBasi: 'Daun menghitam, berlendir, batang lunak berbau busuk.',
  },
  {
    id: 'bawang_merah_putih',
    nama: 'Bawang Merah & Bawang Putih',
    kategori: 'bumbu',
    tempatSimpan: 'Suhu Ruang',
    masaSimpanHari: 45,
    tipsSimpan: 'Wajib ditaruh di wadah terbuka berventilasi (keranjang kawat/anyaman). Jauhkan dari tempat lembab dan jangan simpan berdekatan dengan kentang.',
    tandaBasi: 'Kering keriput kopong, bertunas tinggi, atau membusuk basah.',
  },
  {
    id: 'santan_kelapa',
    nama: 'Santan Peras Murni',
    kategori: 'pokok',
    tempatSimpan: 'Freezer',
    masaSimpanHari: 30,
    tipsSimpan: 'Rebus santan dengan sedikit garam dan daun pandan hingga matang. Dinginkan, lalu bekukan dalam cetakan es batu atau plastik per porsi masak.',
    tandaBasi: 'Minyak dan air terpisah kental berbusa, bau tengik dan rasa kecut.',
  },
  {
    id: 'telur_ayam',
    nama: 'Telur Ayam Negeri',
    kategori: 'protein',
    tempatSimpan: 'Suhu Ruang',
    masaSimpanHari: 21,
    tipsSimpan: 'Simpan dengan posisi bagian tumpul di atas agar kantung udara tidak tertekan. Jangan dicuci jika belum mau dimasak (lapisan kutikula pelindung bakteri akan rusak).',
    tandaBasi: 'Mengapung saat dimasukkan ke dalam gelas air penuh, kuning telur pecah berbau busuk saat dipecahkan.',
  }
];

export const RESEP_SISA_DAPUR: ResepNusantara[] = [
  {
    id: 'orak_arik_telur_sayur',
    nama: 'Orak-Arik Telur Campur Sayur Sat-Set',
    waktuMenit: 10,
    tingkatHemat: 'Super Hemat',
    bahanWajib: ['telur_ayam', 'bawang_merah_putih', 'cabe_rawit'],
    langkahMasak: [
      'Tumis irisan bawang dan cabai rawit hingga harum dengan sedikit minyak.',
      'Masukkan sayur apa saja yang tersisa di kulkas (kangkung/bayam/wortel/kol).',
      'Pecahkan 2 butir telur langsung ke wajan, orak-arik cepat.',
      'Bumbui dengan garam, lada bubuk, dan sedikit saus tiram. Angkat selagi hangat.'
    ]
  },
  {
    id: 'tempe_tahu_orek_pedas',
    nama: 'Orek Tempe Tahu Bumbu Pawon Pedas Manis',
    waktuMenit: 15,
    tingkatHemat: 'Super Hemat',
    bahanWajib: ['tempe', 'bawang_merah_putih', 'cabe_rawit'],
    langkahMasak: [
      'Potong tempe dan tahu dadu kecil, goreng setengah matang hingga berkulit.',
      'Tumis bawang merah, bawang putih, dan cabai rawit yang diiris serong.',
      'Tambahkan kecap manis 2 sdm, sedikit garam, dan 3 sdm air matang.',
      'Masukkan tempe dan tahu goreng, aduk cepat hingga kuah meresap dan mengental.'
    ]
  },
  {
    id: 'kangkung_belacan_warung',
    nama: 'Tumis Kangkung Belacan Ala Warung Tenda',
    waktuMenit: 8,
    tingkatHemat: 'Super Hemat',
    bahanWajib: ['kangkung_bayam', 'bawang_merah_putih', 'cabe_rawit'],
    langkahMasak: [
      'Ulek kasar cabai rawit, bawang, dan sedikit terasi bakar.',
      'Panaskan wajan dengan api besar, tumis bumbu ulek sampai bersin menyengat.',
      'Masukkan potongan kangkung yang sudah dicuci bersih.',
      'Beri sejumput garam dan penyedap, aduk cepat selama 2 menit agar kangkung tetap hijau renyah.'
    ]
  },
  {
    id: 'sup_tahu_telur_bening',
    nama: 'Sup Bening Tahu Telur Gurih',
    waktuMenit: 12,
    tingkatHemat: 'Super Hemat',
    bahanWajib: ['tahu_putih', 'telur_ayam', 'bawang_merah_putih'],
    langkahMasak: [
      'Didihkan 500ml air bersama tumisan bawang putih cincang.',
      'Masukkan potongan tahu putih yang sudah dipotong dadu.',
      'Kocok lepas 1 butir telur, tuang perlahan ke dalam kuah mendidih sambil diaduk memutar (efek bunga telur).',
      'Bumbui dengan garam, kaldu jamur, dan irisan daun bawang. Sajikan hangat.'
    ]
  }
];

export class PantryAdvisorEngine {
  /**
   * Cocokkan bahan yang tersedia di kulkas dengan resep nusantara yang mungkin dimasak.
   */
  static matchRecipes(availableIngredientIds: string[]): {
    resepBisaDimasak: ResepNusantara[];
    resepKurangBahan: { resep: ResepNusantara; bahanKurang: string[] }[];
  } {
    const setTersedia = new Set(availableIngredientIds);
    const resepBisaDimasak: ResepNusantara[] = [];
    const resepKurangBahan: { resep: ResepNusantara; bahanKurang: string[] }[] = [];

    RESEP_SISA_DAPUR.forEach(resep => {
      const kurang = resep.bahanWajib.filter(b => !setTersedia.has(b));
      if (kurang.length === 0) {
        resepBisaDimasak.push(resep);
      } else if (kurang.length <= 2) {
        const namaBahanKurang = kurang.map(kId => {
          const match = KATALOG_PANGAN.find(p => p.id === kId);
          return match ? match.nama : kId;
        });
        resepKurangBahan.push({ resep, bahanKurang: namaBahanKurang });
      }
    });

    return { resepBisaDimasak, resepKurangBahan };
  }
}
