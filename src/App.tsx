import { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Zap,
  Compass,
  UtensilsCrossed,
  ShieldAlert,
  UserCheck,
  Sparkles,
  Lock
} from 'lucide-react';
import type { SuratPayload } from './core/models';
import { BirokrasiNavigator } from './features/birokrasi/BirokrasiNavigator';
import { PusatDarurat } from './features/darurat/PusatDarurat';
import { PantriNusantara } from './features/pantri/PantriNusantara';
import { PlnSimulator } from './features/pln/PlnSimulator';
import { SuratStudio } from './features/surat/SuratStudio';
import { WargaVaultService } from './services/storage/vault';
import type { WargaVaultState } from './services/storage/vault';
import './shared/theme/tokens.css';

export function App() {
  const [vault, setVault] = useState<WargaVaultState>(() => WargaVaultService.load());
  const [activeTab, setActiveTab] = useState<'surat' | 'pln' | 'birokrasi' | 'pantri' | 'darurat' | 'profil'>('surat');

  useEffect(() => {
    WargaVaultService.save(vault);
  }, [vault]);

  // Handlers
  const handleSaveSurat = useCallback((surat: SuratPayload) => {
    setVault(prev => ({
      ...prev,
      daftarSurat: [surat, ...prev.daftarSurat.filter(s => s.id !== surat.id)],
    }));
  }, []);

  const handleDeleteSurat = useCallback((id: string) => {
    setVault(prev => ({
      ...prev,
      daftarSurat: prev.daftarSurat.filter(s => s.id !== id),
    }));
  }, []);

  const handleSavePln = useCallback((daya: any, nominal: number, daftarAlat: any) => {
    setVault(prev => ({
      ...prev,
      pln: { ...prev.pln, daya, nominalBeli: nominal, daftarAlat },
    }));
  }, []);

  const handleSaveBahanKulkas = useCallback((bahanIds: string[]) => {
    setVault(prev => ({ ...prev, bahanKulkasTerpilih: bahanIds }));
  }, []);

  const handleUpdateProfil = useCallback((field: keyof WargaVaultState['profil'], val: string) => {
    setVault(prev => ({
      ...prev,
      profil: { ...prev.profil, [field]: val },
    }));
  }, []);

  const defaultSuratPayload: SuratPayload = {
    id: `surat-${Date.now()}`,
    jenis: 'pengantar_rt',
    judul: 'Surat Pengantar RT / RW',
    tanggalSurat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    namaLengkap: vault.profil.namaLengkap,
    nik: vault.profil.nik,
    tempatTanggalLahir: vault.profil.tempatTanggalLahir,
    jenisKelamin: vault.profil.jenisKelamin,
    agama: vault.profil.agama,
    pekerjaan: vault.profil.pekerjaan,
    statusPerkawinan: vault.profil.statusPerkawinan,
    alamatKtp: vault.profil.alamatKtp,
    alamatDomisili: vault.profil.alamatDomisili,
    keperluan: 'Pengurusan KTP-el Baru di Kantor Kelurahan / Disdukcapil',
    namaRt: vault.profil.namaRt,
    namaRw: vault.profil.namaRw,
    kelurahanDesa: vault.profil.kelurahanDesa,
    kecamatan: vault.profil.kecamatan,
    kabupatenKota: vault.profil.kabupatenKota,
    createdAt: Date.now(),
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--surface-canvas)' }}>
      {/* Docked Left Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--surface-panel)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '18px 14px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Logo / Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 6px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                WargaOS
              </div>
              <div style={{ fontSize: '10px', color: 'var(--accent-emerald-hover)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Solusi Harian Nusantara
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('surat')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'surat' ? 'var(--surface-overlay)' : 'transparent',
                color: activeTab === 'surat' ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === 'surat' ? '1px solid var(--border-medium)' : '1px solid transparent',
                fontSize: '13px',
                fontWeight: activeTab === 'surat' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <FileText size={16} color={activeTab === 'surat' ? 'var(--accent-emerald-hover)' : 'currentColor'} />
              Generator Surat Resmi
            </button>

            <button
              onClick={() => setActiveTab('pln')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'pln' ? 'var(--surface-overlay)' : 'transparent',
                color: activeTab === 'pln' ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === 'pln' ? '1px solid var(--border-medium)' : '1px solid transparent',
                fontSize: '13px',
                fontWeight: activeTab === 'pln' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Zap size={16} color={activeTab === 'pln' ? 'var(--accent-gold)' : 'currentColor'} />
              Simulator Token Listrik
            </button>

            <button
              onClick={() => setActiveTab('birokrasi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'birokrasi' ? 'var(--surface-overlay)' : 'transparent',
                color: activeTab === 'birokrasi' ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === 'birokrasi' ? '1px solid var(--border-medium)' : '1px solid transparent',
                fontSize: '13px',
                fontWeight: activeTab === 'birokrasi' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Compass size={16} color={activeTab === 'birokrasi' ? 'var(--accent-emerald-hover)' : 'currentColor'} />
              Birokrasi & Anti-Pungli
            </button>

            <button
              onClick={() => setActiveTab('pantri')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'pantri' ? 'var(--surface-overlay)' : 'transparent',
                color: activeTab === 'pantri' ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === 'pantri' ? '1px solid var(--border-medium)' : '1px solid transparent',
                fontSize: '13px',
                fontWeight: activeTab === 'pantri' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <UtensilsCrossed size={16} color={activeTab === 'pantri' ? 'var(--accent-cyan)' : 'currentColor'} />
              Pantri Tropis & Resep Sisa
            </button>

            <button
              onClick={() => setActiveTab('darurat')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'darurat' ? 'var(--surface-overlay)' : 'transparent',
                color: activeTab === 'darurat' ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === 'darurat' ? '1px solid var(--border-medium)' : '1px solid transparent',
                fontSize: '13px',
                fontWeight: activeTab === 'darurat' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <ShieldAlert size={16} color={activeTab === 'darurat' ? 'var(--danger)' : 'currentColor'} />
              Darurat & P3K Rumah
            </button>

            <button
              onClick={() => setActiveTab('profil')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'profil' ? 'var(--surface-overlay)' : 'transparent',
                color: activeTab === 'profil' ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === 'profil' ? '1px solid var(--border-medium)' : '1px solid transparent',
                fontSize: '13px',
                fontWeight: activeTab === 'profil' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                marginTop: '10px',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '12px',
              }}
            >
              <UserCheck size={16} color={activeTab === 'profil' ? 'var(--accent-emerald-hover)' : 'currentColor'} />
              Profil Warga Tersimpan
            </button>
          </nav>
        </div>

        {/* Footer info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--accent-emerald-hover)', fontWeight: 600 }}>
            <Lock size={12} />
            <span>LOKAL ENCLAVE: 100% OFFLINE</span>
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-dim)' }}>
            Data NIK & identitas tersimpan di peramban pribadi, zero-cloud.
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, height: '100%', overflowY: 'auto', padding: '24px 30px' }}>
        {activeTab === 'surat' && (
          <SuratStudio
            daftarSurat={vault.daftarSurat}
            profilDefault={defaultSuratPayload}
            onSaveSurat={handleSaveSurat}
            onDeleteSurat={handleDeleteSurat}
          />
        )}

        {activeTab === 'pln' && (
          <PlnSimulator
            initialDaya={vault.pln.daya}
            initialNominal={vault.pln.nominalBeli}
            initialAlat={vault.pln.daftarAlat}
            onSavePlnState={handleSavePln}
          />
        )}

        {activeTab === 'birokrasi' && <BirokrasiNavigator />}

        {activeTab === 'pantri' && (
          <PantriNusantara
            initialBahanTerpilih={vault.bahanKulkasTerpilih}
            onSaveBahan={handleSaveBahanKulkas}
          />
        )}

        {activeTab === 'darurat' && <PusatDarurat />}

        {activeTab === 'profil' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '650px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Profil Identitas Warga Tersimpan
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Data ini otomatis mengisi formulir surat resmi agar Anda tidak perlu mengetik ulang berulang kali.
              </p>
            </div>

            <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Nama Lengkap (Sesuai KTP):
                </label>
                <input
                  type="text"
                  value={vault.profil.namaLengkap}
                  onChange={e => handleUpdateProfil('namaLengkap', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    NIK:
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={vault.profil.nik}
                    onChange={e => handleUpdateProfil('nik', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Tempat, Tgl Lahir:
                  </label>
                  <input
                    type="text"
                    value={vault.profil.tempatTanggalLahir}
                    onChange={e => handleUpdateProfil('tempatTanggalLahir', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Alamat Lengkap KTP:
                </label>
                <input
                  type="text"
                  value={vault.profil.alamatKtp}
                  onChange={e => handleUpdateProfil('alamatKtp', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Ketua RT:
                  </label>
                  <input
                    type="text"
                    value={vault.profil.namaRt}
                    onChange={e => handleUpdateProfil('namaRt', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Ketua RW:
                  </label>
                  <input
                    type="text"
                    value={vault.profil.namaRw}
                    onChange={e => handleUpdateProfil('namaRw', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kelurahan / Desa:
                  </label>
                  <input
                    type="text"
                    value={vault.profil.kelurahanDesa}
                    onChange={e => handleUpdateProfil('kelurahanDesa', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kecamatan:
                  </label>
                  <input
                    type="text"
                    value={vault.profil.kecamatan}
                    onChange={e => handleUpdateProfil('kecamatan', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kota / Kabupaten:
                  </label>
                  <input
                    type="text"
                    value={vault.profil.kabupatenKota}
                    onChange={e => handleUpdateProfil('kabupatenKota', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
