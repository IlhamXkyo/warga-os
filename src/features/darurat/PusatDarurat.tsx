import React, { useState } from 'react';
import { PhoneCall, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';
import { KONTAK_DARURAT_NASIONAL, PANDUAN_P3K_DARURAT } from '../../core/engine/emergency_contacts';
import { Badge } from '../../shared/ui/Badge';

export const PusatDarurat: React.FC = () => {
  const [selectedKejadian, setSelectedKejadian] = useState<number>(0);

  const activeP3k = PANDUAN_P3K_DARURAT[selectedKejadian];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Pusat Tanggap Darurat & P3K Rumah Tangga
          </h2>
          <Badge variant="danger">Siaga 24 Jam</Badge>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Nomor hotline resmi instansi negara dan protokol keselamatan darurat kebocoran gas, korsleting, dan gigitan hewan berbisa.
        </p>
      </div>

      {/* Grid Kontak Darurat Nasional */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <PhoneCall size={18} color="var(--danger)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Nomor Panggilan Darurat Nasional</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {KONTAK_DARURAT_NASIONAL.map(kontak => (
            <div
              key={kontak.nomor}
              className="card-panel"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {kontak.nama}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {kontak.deskripsi}
                </div>
                {kontak.bebasPulsa && (
                  <span style={{ fontSize: '10px', color: 'var(--accent-emerald-hover)', fontWeight: 600 }}>
                    Bebas Pulsa
                  </span>
                )}
              </div>
              <a
                href={`tel:${kontak.nomor.split('/')[0].trim()}`}
                style={{
                  background: 'var(--danger)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 10px rgba(239, 68, 68, 0.3)',
                }}
              >
                {kontak.nomor}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Protokol P3K & Kejadian Kritis */}
      <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertOctagon size={18} color="var(--accent-gold)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Panduan Tindakan Kritis Saat Terjadi Bahaya</h3>
        </div>

        {/* Tab Kejadian */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {PANDUAN_P3K_DARURAT.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedKejadian(idx)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                background: selectedKejadian === idx ? 'var(--danger)' : 'var(--surface-panel)',
                color: selectedKejadian === idx ? '#ffffff' : 'var(--text-secondary)',
                border: selectedKejadian === idx ? '1px solid var(--danger)' : '1px solid var(--border-subtle)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {p.kejadian.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Detail Tindakan */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px', background: 'var(--surface-panel)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
          {/* Langkah Yang WAJIB Dilakukan */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald-hover)', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>
              <CheckCircle2 size={16} /> Langkah Yang WAJIB Dilakukan Segera:
            </div>
            <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {activeP3k.langkahTindakan.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Pantangan Keras */}
          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--danger)', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>
              <XCircle size={16} /> PANTANGAN KERAS (Bahaya Fatal):
            </div>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {activeP3k.pantanganKeras.map((ban, i) => (
                <li key={i} style={{ color: '#fca5a5' }}>{ban}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
