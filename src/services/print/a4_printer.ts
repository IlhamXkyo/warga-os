import { SuratGeneratorEngine } from '../../core/engine/surat_generator';
import type { SuratPayload } from '../../core/models';

export class A4PrinterService {
  /**
   * Render and trigger print for an official Indonesian administrative document.
   */
  static printSurat(payload: SuratPayload): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up terblokir di peramban. Izinkan pop-up agar dokumen dapat dicetak.');
      return;
    }

    const { kopSurat, nomor, paragrafPembuka, biodataText, paragrafIsi, paragrafPenutup, tandaTangan } =
      SuratGeneratorEngine.generateSurat(payload);

    const biodataHtml = biodataText
      .split('\n')
      .map(line => {
        if (!line.trim()) return '<div style="height: 8px;"></div>';
        const parts = line.split(':');
        if (parts.length >= 2) {
          const label = parts[0].trim();
          const value = parts.slice(1).join(':').trim();
          return `
            <div style="display: flex; margin-bottom: 4px; font-size: 13.5px; line-height: 1.4;">
              <span style="width: 190px; color: #111827; font-weight: 500;">${label}</span>
              <span style="margin-right: 8px;">:</span>
              <span style="flex: 1; color: #000000; font-weight: 600;">${value}</span>
            </div>
          `;
        }
        return `<div style="font-weight: 700; margin-top: 8px; margin-bottom: 4px; font-size: 13.5px;">${line}</div>`;
      })
      .join('');

    const isiHtml = paragrafIsi
      .split('\n')
      .map(p => p.trim() ? `<p style="margin: 8px 0; text-align: justify; line-height: 1.5; font-size: 13.5px;">${p}</p>` : '')
      .join('');

    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>${payload.judul} - ${payload.namaLengkap}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 25mm 25mm 20mm 30mm; /* Standar naskah dinas kearsipan */
          }
          body {
            font-family: "Times New Roman", Times, serif;
            color: #000000;
            background: #ffffff;
            margin: 0;
            padding: 20px;
            font-size: 14px;
            line-height: 1.5;
          }
          .no-print {
            display: flex;
            gap: 10px;
            margin-bottom: 25px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .kop {
            text-align: center;
            font-weight: bold;
            font-size: 15px;
            text-transform: uppercase;
            line-height: 1.3;
            margin-bottom: 8px;
            white-space: pre-line;
          }
          .kop-divider {
            border-top: 2px solid #000000;
            border-bottom: 1px solid #000000;
            height: 3px;
            margin-bottom: 18px;
          }
          .judul-surat {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .nomor-surat {
            text-align: center;
            font-size: 13px;
            margin-bottom: 20px;
          }
          .pembuka {
            text-align: justify;
            margin-bottom: 12px;
            font-size: 13.5px;
          }
          .penutup {
            text-align: justify;
            margin-top: 14px;
            margin-bottom: 30px;
            font-size: 13.5px;
          }
          .ttd-container {
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
            margin-top: 20px;
          }
          .ttd-box {
            width: 250px;
            text-align: center;
            font-size: 13.5px;
            white-space: pre-line;
          }
          .materai-box {
            width: 100px;
            height: 55px;
            border: 1px dashed #666666;
            margin: 12px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #555555;
            font-family: sans-serif;
          }
          .nama-pejabat {
            font-weight: bold;
            text-decoration: underline;
            margin-top: 65px;
          }
          @media print {
            .no-print { display: none !important; }
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button onclick="window.print()" style="background: #047857; color: white; border: none; padding: 10px 22px; font-weight: 700; border-radius: 6px; cursor: pointer;">
            Cetak / Simpan PDF (A4)
          </button>
          <button onclick="window.close()" style="background: #e5e7eb; color: #1f2937; border: none; padding: 10px 16px; font-weight: 600; border-radius: 6px; cursor: pointer;">
            Tutup
          </button>
        </div>

        <div class="kop">${kopSurat}</div>
        <div class="kop-divider"></div>

        ${payload.jenis === 'pengantar_rt' ? '<div class="judul-surat">SURAT PENGANTAR</div>' : ''}
        ${nomor ? `<div class="nomor-surat">Nomor: ${nomor}</div>` : ''}

        <div class="pembuka">${paragrafPembuka}</div>

        <div style="margin-left: 20px; margin-bottom: 12px;">
          ${biodataHtml}
        </div>

        <div>${isiHtml}</div>

        <div class="penutup">${paragrafPenutup}</div>

        <div class="ttd-container">
          <div class="ttd-box">
            ${tandaTangan.kiriJudul}
            <div class="nama-pejabat">${tandaTangan.kiriNama}</div>
          </div>
          <div class="ttd-box">
            ${tandaTangan.kananJudul}
            ${tandaTangan.adaMaterai ? '<div class="materai-box">MATERAI<br>Rp 10.000</div>' : ''}
            <div class="nama-pejabat" style="${tandaTangan.adaMaterai ? 'margin-top: 15px;' : ''}">${tandaTangan.kananNama}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
