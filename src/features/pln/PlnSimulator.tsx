import React, { useState, useMemo } from 'react';
import { Zap, AlertCircle, Plus, Trash2, Clock, BatteryCharging } from 'lucide-react';
import type { AlatElektronik, DayaPLN } from '../../core/models';
import { PlnCalculatorEngine, TARIF_PLN } from '../../core/engine/pln_calculator';
import { Badge } from '../../shared/ui/Badge';

interface PlnSimulatorProps {
  initialDaya: DayaPLN;
  initialNominal: number;
  initialAlat: AlatElektronik[];
  onSavePlnState: (daya: DayaPLN, nominal: number, alat: AlatElektronik[]) => void;
}

export const PlnSimulator: React.FC<PlnSimulatorProps> = ({
  initialDaya,
  initialNominal,
  initialAlat,
  onSavePlnState,
}) => {
  const [daya, setDaya] = useState<DayaPLN>(initialDaya);
  const [nominal, setNominal] = useState<number>(initialNominal);
  const [adminBank, setAdminBank] = useState<number>(2500);
  const [ppjPersen, setPpjPersen] = useState<number>(5);
  const [daftarAlat, setDaftarAlat] = useState<AlatElektronik[]>(initialAlat);

  const hasil = useMemo(() => {
    return PlnCalculatorEngine.hitungToken(nominal, daya, daftarAlat, adminBank, ppjPersen);
  }, [nominal, daya, daftarAlat, adminBank, ppjPersen]);

  const handleAlatChange = (id: string, field: keyof AlatElektronik, val: number | string) => {
    const updated = daftarAlat.map(a => (a.id === id ? { ...a, [field]: val } : a));
    setDaftarAlat(updated);
    onSavePlnState(daya, nominal, updated);
  };

  const handleAddAlat = () => {
    const baru: AlatElektronik = {
      id: `alat-${Date.now()}`,
      nama: 'Alat Baru (AC / Dispenser / Setrika)',
      dayaWatt: 100,
      jamPakaiPerHari: 4,
      jumlahUnit: 1,
    };
    const updated = [...daftarAlat, baru];
    setDaftarAlat(updated);
    onSavePlnState(daya, nominal, updated);
  };

  const handleRemoveAlat = (id: string) => {
    if (daftarAlat.length <= 1) return;
    const updated = daftarAlat.filter(a => a.id !== id);
    setDaftarAlat(updated);
    onSavePlnState(daya, nominal, updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Kalkulator & Simulator Beban Listrik PLN Nusantara
          </h2>
          <Badge variant="gold">Tarif Resmi ESDM 2026</Badge>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Bongkar misteri potongan admin & pajak PPJ token listrik, serta ketahui persis kapan meteran akan bunyi 'tit-tit-tit'.
        </p>
      </div>

      {/* Main KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {/* Token kWh Bersih */}
        <div className="card-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Energi kWh Bersih
            </span>
            <Zap size={16} color="var(--accent-gold)" />
          </div>
          <div className="num" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-gold)' }}>
            {hasil.kwhDidapat} <span style={{ fontSize: '14px', fontWeight: 600 }}>kWh</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Dari pembelian nominal Rp {nominal.toLocaleString('id-ID')}
          </div>
        </div>

        {/* Estimasi Hari Bertahan */}
        <div className="card-panel" style={{ border: '1px solid var(--accent-emerald)', background: 'var(--surface-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-emerald-hover)', textTransform: 'uppercase' }}>
              Estimasi Bertahan
            </span>
            <BatteryCharging size={16} color="var(--accent-emerald)" />
          </div>
          <div className="num" style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
            ~{hasil.estimasiHariBertahan} <span style={{ fontSize: '14px', fontWeight: 600 }}>Hari</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Berdasarkan profil {daftarAlat.length} alat kos/rumah tangga Anda.
          </div>
        </div>

        {/* Konsumsi Harian */}
        <div className="card-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Konsumsi Harian
            </span>
            <Clock size={16} color="var(--accent-cyan)" />
          </div>
          <div className="num" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {hasil.konsumsiKwhHarian} <span style={{ fontSize: '14px', fontWeight: 600 }}>kWh/hari</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Biaya setara ~Rp {hasil.biayaListrikHarian.toLocaleString('id-ID')}/hari
          </div>
        </div>

        {/* Potongan Bersih */}
        <div className="card-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Rincian Potongan
            </span>
            <AlertCircle size={16} color="var(--text-dim)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '12px', marginTop: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Admin Bank:</span>
              <span className="num">Rp {hasil.biayaAdminBank.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Pajak PPJ ({hasil.pajakPpjPersen}%):</span>
              <span className="num">Rp {hasil.biayaPpj.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontWeight: 700, borderTop: '1px solid var(--border-subtle)', paddingTop: '4px' }}>
              <span>Listrik Murni:</span>
              <span className="num" style={{ color: 'var(--accent-emerald-hover)' }}>Rp {hasil.danaBeliListrikBersih.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '20px' }}>
        {/* Kontrol Pembelian Token */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            Pengaturan Meteran & Pembelian
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Golongan Daya Listrik PLN:
            </label>
            <select
              value={daya}
              onChange={e => {
                const newD = e.target.value as DayaPLN;
                setDaya(newD);
                onSavePlnState(newD, nominal, daftarAlat);
              }}
              style={{
                width: '100%',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
              }}
            >
              {Object.entries(TARIF_PLN).map(([k, val]) => (
                <option key={k} value={k}>
                  {val.nama} (Rp {val.tarifPerKwh.toLocaleString('id-ID')}/kWh)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Nominal Pembelian Token (Rp):
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
              {[20000, 50000, 100000, 200000, 500000, 1000000].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setNominal(n);
                    onSavePlnState(daya, n, daftarAlat);
                  }}
                  style={{
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    background: nominal === n ? 'var(--accent-gold)' : 'var(--surface-overlay)',
                    color: nominal === n ? '#451a03' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '11px',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  {(n / 1000).toLocaleString('id-ID')} rb
                </button>
              ))}
            </div>
            <input
              type="number"
              value={nominal}
              onChange={e => {
                const n = Number(e.target.value);
                setNominal(n);
                onSavePlnState(daya, n, daftarAlat);
              }}
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
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Admin Bank (Rp):
              </label>
              <input
                type="number"
                value={adminBank}
                onChange={e => setAdminBank(Number(e.target.value))}
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
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Pajak PPJ Daerah (%):
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={ppjPersen}
                onChange={e => setPpjPersen(Number(e.target.value))}
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
        </div>

        {/* Profil Peralatan Elektronik */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Inventaris Beban Alat Elektronik</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sesuaikan watt dan jam pemakaian untuk estimasi presisi.</p>
            </div>
            <button
              type="button"
              onClick={handleAddAlat}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-emerald-hover)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Plus size={14} /> Tambah Alat
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '450px', overflowY: 'auto' }}>
            {daftarAlat.map(alat => {
              const kwhHarianAlat = (alat.dayaWatt * alat.jamPakaiPerHari * alat.jumlahUnit) / 1000;

              return (
                <div
                  key={alat.id}
                  style={{
                    background: 'var(--surface-panel)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={alat.nama}
                      onChange={e => handleAlatChange(alat.id, 'nama', e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '13px',
                        flex: 1,
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="num" style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>
                        ~{kwhHarianAlat.toFixed(2)} kWh/hari
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAlat(alat.id)}
                        disabled={daftarAlat.length <= 1}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: daftarAlat.length <= 1 ? 'var(--text-dim)' : 'var(--danger)',
                          cursor: daftarAlat.length <= 1 ? 'not-allowed' : 'pointer',
                          padding: '2px',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '8px', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Daya: {alat.dayaWatt} Watt</span>
                      <input
                        type="range"
                        min="5"
                        max="1500"
                        step="5"
                        value={alat.dayaWatt}
                        onChange={e => handleAlatChange(alat.id, 'dayaWatt', Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Pakai: {alat.jamPakaiPerHari} Jam/hari</span>
                      <input
                        type="range"
                        min="1"
                        max="24"
                        value={alat.jamPakaiPerHari}
                        onChange={e => handleAlatChange(alat.id, 'jamPakaiPerHari', Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Jumlah Unit: {alat.jumlahUnit}x</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={alat.jumlahUnit}
                        onChange={e => handleAlatChange(alat.id, 'jumlahUnit', Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
