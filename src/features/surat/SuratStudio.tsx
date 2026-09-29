import React, { useState } from 'react';
import { Printer, ShieldCheck } from 'lucide-react';
import type { JenisSurat, SuratPayload } from '../../core/models';
import { SuratGeneratorEngine } from '../../core/engine/surat_generator';
import { A4PrinterService } from '../../services/print/a4_printer';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';

interface SuratStudioProps {
  daftarSurat: SuratPayload[];
  profilDefault: SuratPayload;
  onSaveSurat: (surat: SuratPayload) => void;
  onDeleteSurat: (id: string) => void;
}

export const SuratStudio: React.FC<SuratStudioProps> = ({
  profilDefault,
  onSaveSurat,
}) => {
  const [activeJenis, setActiveJenis] = useState<JenisSurat>('pengantar_rt');
  const [form, setForm] = useState<SuratPayload>({
    ...profilDefault,
    id: `surat-${Date.now()}`,
    jenis: 'pengantar_rt',
    judul: 'Surat Pengantar RT / RW',
    tanggalSurat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    keperluan: 'Pengurusan KTP-el Baru di Disdukcapil',
    namaUsaha: 'Warung Barokah Digital',
    jenisUsaha: 'Perdagangan & Jasa Fotokopi',
    alamatUsaha: 'Jl. Tubagus Ismail No. 42',
    namaPemberiKuasa: profilDefault.namaLengkap,
    namaPenerimaKuasa: 'Siti Rahmawati',
    nikPenerimaKuasa: '3273015502990002',
    kuasaUntuk: 'Mengambil BPKB Sepeda Motor Honda Vario No. Polisi D 1234 ABC di Kantor Leasing FIF Finance.',
    namaPemilikKos: 'Ibu Hj. Aminah',
    nomorKamar: 'Kamar 04 (Lantai 2)',
    biayaSewaPerBulan: 850000,
    durasiBulan: 6,
    fasilitasKos: 'Listrik token mandiri, kasur busa, lemari 2 pintu, WiFi 50 Mbps, kamar mandi dalam',
    createdAt: Date.now(),
  });

  const handleJenisChange = (jenis: JenisSurat) => {
    setActiveJenis(jenis);
    let judul = 'Surat Pengantar RT / RW';
    let keperluan = form.keperluan;

    if (jenis === 'sku') {
      judul = 'Surat Keterangan Usaha (SKU)';
      keperluan = 'Syarat Pengajuan KUR / Pembukaan Rekening Bank Usaha';
    } else if (jenis === 'kuasa') {
      judul = 'Surat Kuasa Pengurusan Dokumen';
    } else if (jenis === 'sewa_kos') {
      judul = 'Surat Perjanjian Sewa Kamar Kos';
    }

    setForm(prev => ({
      ...prev,
      jenis,
      judul,
      keperluan,
    }));
  };

  const handlePrint = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSurat(form);
    A4PrinterService.printSurat(form);
  };

  const previewData = SuratGeneratorEngine.generateSurat(form);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Generator Berkas & Surat Resmi Indonesia
          </h2>
          <Badge variant="emerald">Format Standar Nasional</Badge>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Cetak langsung surat kependudukan formal yang diakui RT, RW, Kelurahan, Perbankan, dan Pemilik Kos.
        </p>
      </div>

      {/* Jenis Surat Selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { id: 'pengantar_rt', label: 'Surat Pengantar RT/RW' },
          { id: 'sku', label: 'Surat Keterangan Usaha (SKU)' },
          { id: 'kuasa', label: 'Surat Kuasa Resmi' },
          { id: 'sewa_kos', label: 'Surat Perjanjian Sewa Kos' },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleJenisChange(item.id as JenisSurat)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              background: activeJenis === item.id ? 'var(--accent-emerald)' : 'var(--surface-card)',
              color: activeJenis === item.id ? '#042f2e' : 'var(--text-secondary)',
              border: activeJenis === item.id ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 460px) 1fr', gap: '20px' }}>
        {/* Input Form Panel */}
        <form
          onSubmit={handlePrint}
          className="card-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '720px', overflowY: 'auto' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-emerald-hover)', textTransform: 'uppercase' }}>
              Isian Formulir Dokumen
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
              100% Privat Lokal
            </div>
          </div>

          {/* Pemohon Identitas */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
              Nama Lengkap Pemohon (Sesuai KTP) *
            </label>
            <input
              type="text"
              required
              value={form.namaLengkap}
              onChange={e => setForm({ ...form, namaLengkap: e.target.value })}
              style={{
                width: '100%',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                NIK (16 Digit) *
              </label>
              <input
                type="text"
                required
                maxLength={16}
                value={form.nik}
                onChange={e => setForm({ ...form, nik: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                Tempat / Tgl Lahir
              </label>
              <input
                type="text"
                value={form.tempatTanggalLahir}
                onChange={e => setForm({ ...form, tempatTanggalLahir: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                Jenis Kelamin
              </label>
              <select
                value={form.jenisKelamin}
                onChange={e => setForm({ ...form, jenisKelamin: e.target.value as 'Laki-laki' | 'Perempuan' })}
                style={{
                  width: '100%',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                }}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                Pekerjaan
              </label>
              <input
                type="text"
                value={form.pekerjaan}
                onChange={e => setForm({ ...form, pekerjaan: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
              Alamat Lengkap KTP
            </label>
            <input
              type="text"
              value={form.alamatKtp}
              onChange={e => setForm({ ...form, alamatKtp: e.target.value })}
              style={{
                width: '100%',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
              }}
            />
          </div>

          {/* Conditional Fields: Pengantar RT */}
          {activeJenis === 'pengantar_rt' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  Keperluan Pembuatan Surat Pengantar *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.keperluan}
                  onChange={e => setForm({ ...form, keperluan: e.target.value })}
                  placeholder="Contoh: Mengurus KTP-el baru, perpanjang paspor, surat nikah..."
                  style={{
                    width: '100%',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Ketua RT
                  </label>
                  <input
                    type="text"
                    value={form.namaRt}
                    onChange={e => setForm({ ...form, namaRt: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Ketua RW
                  </label>
                  <input
                    type="text"
                    value={form.namaRw}
                    onChange={e => setForm({ ...form, namaRw: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Conditional Fields: SKU */}
          {activeJenis === 'sku' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  Nama Usaha *
                </label>
                <input
                  type="text"
                  required
                  value={form.namaUsaha}
                  onChange={e => setForm({ ...form, namaUsaha: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Bidang / Jenis Usaha
                  </label>
                  <input
                    type="text"
                    value={form.jenisUsaha}
                    onChange={e => setForm({ ...form, jenisUsaha: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Alamat Tempat Usaha
                  </label>
                  <input
                    type="text"
                    value={form.alamatUsaha}
                    onChange={e => setForm({ ...form, alamatUsaha: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Conditional Fields: Surat Kuasa */}
          {activeJenis === 'kuasa' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Nama Penerima Kuasa *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.namaPenerimaKuasa}
                    onChange={e => setForm({ ...form, namaPenerimaKuasa: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    NIK Penerima Kuasa *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nikPenerimaKuasa}
                    onChange={e => setForm({ ...form, nikPenerimaKuasa: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  Wewenang & Keperluan Kuasa *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.kuasaUntuk}
                  onChange={e => setForm({ ...form, kuasaUntuk: e.target.value })}
                  placeholder="Sebutkan hal yang dikuasakan secara rinci..."
                  style={{
                    width: '100%',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    resize: 'none',
                  }}
                />
              </div>
            </>
          )}

          {/* Conditional Fields: Sewa Kos */}
          {activeJenis === 'sewa_kos' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Nama Pemilik Kos / Pengelola
                  </label>
                  <input
                    type="text"
                    required
                    value={form.namaPemilikKos}
                    onChange={e => setForm({ ...form, namaPemilikKos: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    Nomor Kamar Kos
                  </label>
                  <input
                    type="text"
                    value={form.nomorKamar}
                    onChange={e => setForm({ ...form, nomorKamar: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  Biaya Sewa per Bulan (Rp)
                </label>
                <input
                  type="number"
                  value={form.biayaSewaPerBulan}
                  onChange={e => setForm({ ...form, biayaSewaPerBulan: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                  }}
                />
              </div>
            </>
          )}

          <div style={{ marginTop: '8px' }}>
            <Button variant="primary" size="lg" icon={<Printer size={16} />} type="submit" style={{ width: '100%' }}>
              Cetak Dokumen Resmi (Format A4 / PDF)
            </Button>
          </div>
        </form>

        {/* Live Preview Panel */}
        <div
          className="card-panel"
          style={{
            background: '#ffffff',
            color: '#111827',
            padding: '28px 32px',
            fontFamily: '"Times New Roman", Times, serif',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            maxHeight: '720px',
            overflowY: 'auto',
          }}
        >
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', lineHeight: '1.3', whiteSpace: 'pre-line' }}>
            {previewData.kopSurat}
          </div>
          <div style={{ borderTop: '2px solid #000', borderBottom: '1px solid #000', height: '3px', margin: '12px 0 16px 0' }} />

          {form.jenis === 'pengantar_rt' && (
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px', textDecoration: 'underline' }}>
              SURAT PENGANTAR
            </div>
          )}
          {previewData.nomor && (
            <div style={{ textAlign: 'center', fontSize: '12px', marginBottom: '16px' }}>
              Nomor: {previewData.nomor}
            </div>
          )}

          <p style={{ textAlign: 'justify', fontSize: '13px', lineHeight: '1.5', margin: '10px 0' }}>
            {previewData.paragrafPembuka}
          </p>

          <pre style={{ fontFamily: 'inherit', fontSize: '12.5px', whiteSpace: 'pre-wrap', lineHeight: '1.4', margin: '10px 0 10px 15px' }}>
            {previewData.biodataText}
          </pre>

          <p style={{ textAlign: 'justify', fontSize: '13px', lineHeight: '1.5', margin: '10px 0', whiteSpace: 'pre-line' }}>
            {previewData.paragrafIsi}
          </p>

          <p style={{ textAlign: 'justify', fontSize: '13px', lineHeight: '1.5', margin: '10px 0' }}>
            {previewData.paragrafPenutup}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', textAlign: 'center', fontSize: '13px' }}>
            <div style={{ width: '200px', whiteSpace: 'pre-line' }}>
              {previewData.tandaTangan.kiriJudul}
              <div style={{ marginTop: '55px', fontWeight: 'bold', textDecoration: 'underline' }}>
                {previewData.tandaTangan.kiriNama}
              </div>
            </div>
            <div style={{ width: '200px', whiteSpace: 'pre-line' }}>
              {previewData.tandaTangan.kananJudul}
              {previewData.tandaTangan.adaMaterai && (
                <div style={{ width: '80px', height: '40px', border: '1px dashed #777', margin: '8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#555', fontFamily: 'sans-serif' }}>
                  MATERAI 10k
                </div>
              )}
              <div style={{ marginTop: previewData.tandaTangan.adaMaterai ? '10px' : '55px', fontWeight: 'bold', textDecoration: 'underline' }}>
                {previewData.tandaTangan.kananNama}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
