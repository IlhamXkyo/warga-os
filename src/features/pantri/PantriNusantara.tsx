import React, { useState, useMemo } from 'react';
import { Check, ChefHat, BookOpen } from 'lucide-react';
import { KATALOG_PANGAN, PantryAdvisorEngine } from '../../core/engine/pantry_advisor';
import { Badge } from '../../shared/ui/Badge';

interface PantriNusantaraProps {
  initialBahanTerpilih: string[];
  onSaveBahan: (bahanIds: string[]) => void;
}

export const PantriNusantara: React.FC<PantriNusantaraProps> = ({
  initialBahanTerpilih,
  onSaveBahan,
}) => {
  const [bahanTerpilih, setBahanTerpilih] = useState<string[]>(initialBahanTerpilih);

  const toggleBahan = (id: string) => {
    const updated = bahanTerpilih.includes(id)
      ? bahanTerpilih.filter(b => b !== id)
      : [...bahanTerpilih, id];
    setBahanTerpilih(updated);
    onSaveBahan(updated);
  };

  const { resepBisaDimasak, resepKurangBahan } = useMemo(() => {
    return PantryAdvisorEngine.matchRecipes(bahanTerpilih);
  }, [bahanTerpilih]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Pantri Nusantara & Asisten Dapur Anti-Basi
          </h2>
          <Badge variant="emerald">Zero-Waste Dapur Tropis</Badge>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Katalog masa simpan bahan pasar tradisional di iklim lembab dan pencocok menu masakan sat-set dari sisa kulkas.
        </p>
      </div>

      {/* Sisa Kulkas Recipe Matcher */}
      <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChefHat size={18} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Ada Bahan Apa Saja di Kulkas / Kos Saat Ini?</h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Terpilih: <strong>{bahanTerpilih.length} bahan</strong>
          </span>
        </div>

        {/* Checkbox Chips Bahan */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {KATALOG_PANGAN.map(bahan => {
            const isSelected = bahanTerpilih.includes(bahan.id);

            return (
              <button
                key={bahan.id}
                type="button"
                onClick={() => toggleBahan(bahan.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: isSelected ? 'var(--accent-emerald)' : 'var(--surface-overlay)',
                  color: isSelected ? '#042f2e' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'var(--transition-spring)',
                }}
              >
                {isSelected && <Check size={13} />}
                {bahan.nama}
              </button>
            );
          })}
        </div>

        {/* Matched Recipes Results */}
        <div style={{ marginTop: '10px' }}>
          {resepBisaDimasak.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {resepBisaDimasak.map(resep => (
                <div
                  key={resep.id}
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-emerald-hover)' }}>
                      {resep.nama}
                    </h4>
                    <Badge variant="emerald" size="sm">Siap Masak</Badge>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Waktu: ~{resep.waktuMenit} menit | {resep.tingkatHemat}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <ol style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {resep.langkahMasak.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '10px 0' }}>
              Pilih minimal telur, bawang, atau cabai untuk melihat rekomendasi masakan sisa kulkas.
            </div>
          )}

          {resepKurangBahan.length > 0 && resepBisaDimasak.length === 0 && (
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Hampir Bisa Dimasak (Kurang 1 Bahan):
              </span>
              {resepKurangBahan.slice(0, 2).map(({ resep, bahanKurang }) => (
                <div key={resep.id} style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  • <strong>{resep.nama}</strong> (Tinggal beli di warung: {bahanKurang.join(', ')})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Katalog Cara Simpan Bahan Tropis Anti-Basi */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <BookOpen size={18} color="var(--accent-gold)" />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Panduan Penyimpanan Bahan Pasar Tropis</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {KATALOG_PANGAN.map(item => (
            <div key={item.id} className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.nama}
                </h4>
                <Badge variant={item.tempatSimpan === 'Suhu Ruang' ? 'gold' : 'cyan'} size="sm">
                  {item.tempatSimpan}
                </Badge>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--accent-emerald-hover)', fontWeight: 600 }}>
                Daya Tahan: Hingga {item.masaSimpanHari} Hari
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong>Cara Simpan:</strong> {item.tipsSimpan}
              </div>

              <div style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
                <strong>Tanda Basi:</strong> {item.tandaBasi}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
