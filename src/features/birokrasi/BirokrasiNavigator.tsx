import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck, Clock, DollarSign } from 'lucide-react';
import { PANDUAN_BIROKRASI } from '../../core/engine/birokrasi_guide';
import { Badge } from '../../shared/ui/Badge';

export const BirokrasiNavigator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(PANDUAN_BIROKRASI[0].id);
  const [checkedSyarat, setCheckedSyarat] = useState<Record<string, boolean>>({});

  const activePanduan = PANDUAN_BIROKRASI.find(p => p.id === selectedId) || PANDUAN_BIROKRASI[0];

  const toggleSyarat = (key: string) => {
    setCheckedSyarat(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Navigator Birokrasi & Hak Warga Bebas Pungli
          </h2>
          <Badge variant="emerald">Undang-Undang Resmi RI</Badge>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Panduan langkah pasti, biaya resmi hukum (Rp 0), dan checklist dokumen anti-ditolak di kantor kelurahan/dinas.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '20px' }}>
        {/* Menu Daftar Panduan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {PANDUAN_BIROKRASI.map(item => {
            const isSelected = item.id === selectedId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--surface-overlay)' : 'var(--surface-card)',
                  border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'var(--transition-spring)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.judul}
                  </span>
                  {item.bebasPungli && <Badge variant="emerald" size="sm">Rp 0</Badge>}
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineClamp: 2 }}>
                  {item.deskripsi}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detail Panduan & Checklist */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Header Panduan */}
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {activePanduan.judul}
              </h3>
              {activePanduan.bebasPungli && (
                <span style={{ fontSize: '11px', color: 'var(--accent-emerald-hover)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Bebas Pungli
                </span>
              )}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{activePanduan.deskripsi}</p>
          </div>

          {/* Quick Metrics (Biaya & Waktu) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--surface-panel)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                <DollarSign size={13} color="var(--accent-emerald)" /> Biaya Resmi
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-emerald-hover)', marginTop: '4px' }}>
                {activePanduan.biayaResmi}
              </div>
            </div>

            <div style={{ background: 'var(--surface-panel)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                <Clock size={13} color="var(--accent-cyan)" /> Estimasi Waktu Proses
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px' }}>
                {activePanduan.waktuProses}
              </div>
            </div>
          </div>

          {/* Checklist Syarat Dokumen */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Checklist Berkas Wajib Dibawa (Centang Sebelum Berangkat):
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activePanduan.syaratDokumen.map((syarat, idx) => {
                const key = `${activePanduan.id}_${idx}`;
                const isChecked = !!checkedSyarat[key];

                return (
                  <div
                    key={key}
                    onClick={() => toggleSyarat(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'var(--surface-input)',
                      border: isChecked ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    {isChecked ? (
                      <CheckSquare size={16} color="var(--accent-emerald)" />
                    ) : (
                      <Square size={16} color="var(--text-dim)" />
                    )}
                    <span
                      style={{
                        fontSize: '13px',
                        color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                        textDecoration: isChecked ? 'line-through' : 'none',
                      }}
                    >
                      {syarat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alur Langkah */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Alur Pelaksanaan Lapangan:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activePanduan.alurSingkat.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: '1.5' }}>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--surface-overlay)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--accent-emerald-hover)',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Anti-Pungli */}
          <div
            style={{
              background: 'var(--surface-panel)',
              borderLeft: '4px solid var(--accent-emerald)',
              padding: '12px 14px',
              borderRadius: '4px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: '1.5',
            }}
          >
            <strong style={{ color: 'var(--accent-emerald-hover)' }}>Tips Penting Petugas:</strong> {activePanduan.tipsPenting}
          </div>
        </div>
      </div>
    </div>
  );
};
