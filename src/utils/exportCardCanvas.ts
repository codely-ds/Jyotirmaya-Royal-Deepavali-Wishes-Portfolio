import { CardThemeConfig, MotifType } from '../data/diwaliData';

export interface ExportCardOptions {
  recipient: string;
  sender: string;
  message: string;
  sanskritHeader: string;
  showSanskrit: boolean;
  theme: CardThemeConfig;
  motif: MotifType;
  serialCode: string;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export function downloadGreetingCardPng(options: ExportCardOptions): void {
  const {
    recipient,
    sender,
    message,
    sanskritHeader,
    showSanskrit,
    theme,
    serialCode,
  } = options;

  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 1520;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, theme.canvasStops[0]);
  bgGrad.addColorStop(0.55, theme.canvasStops[1]);
  bgGrad.addColorStop(1, theme.canvasStops[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Warm Radial Center Aura
  const auraGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.42,
    30,
    width / 2,
    height * 0.42,
    560
  );
  auraGrad.addColorStop(0, theme.isLight ? 'rgba(255, 183, 3, 0.20)' : 'rgba(255, 183, 3, 0.14)');
  auraGrad.addColorStop(0.6, theme.isLight ? 'rgba(230, 57, 70, 0.06)' : 'rgba(230, 57, 70, 0.05)');
  auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = auraGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Double Hairline Zari Borders
  ctx.strokeStyle = theme.borderPrimary;
  ctx.lineWidth = 4;
  ctx.strokeRect(54, 54, width - 108, height - 108);

  ctx.strokeStyle = theme.borderSecondary;
  ctx.lineWidth = 1.8;
  ctx.strokeRect(74, 74, width - 148, height - 148);

  // 4. Ornamental Corner Medallions
  const corners = [
    [74, 74],
    [width - 74, 74],
    [74, height - 74],
    [width - 74, height - 74],
  ];
  corners.forEach(([cx, cy]) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = theme.borderPrimary;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, Math.PI * 2);
    ctx.strokeStyle = theme.borderPrimary;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  });

  ctx.textAlign = 'center';

  // 5. Top Auspicious Sanskrit Invocation
  if (showSanskrit && sanskritHeader) {
    ctx.fillStyle = theme.accentColor;
    ctx.font = '600 28px "Noto Serif Devanagari", "Cormorant Garamond", Georgia, serif';
    ctx.fillText(sanskritHeader, width / 2, 155);
  }

  // Sub-banner
  ctx.fillStyle = theme.textSecondary;
  ctx.font = '500 19px "JetBrains Mono", monospace';
  ctx.fillText('✦ SHUBH DEEPAVALI • FESTIVAL OF SACRED LIGHTS ✦', width / 2, 202);

  // 6. Central Symbolic Diya / Mandala Emblem on Canvas
  const centerX = width / 2;
  const emblemY = 325;

  // Outer Halo Circle
  ctx.beginPath();
  ctx.arc(centerX, emblemY, 68, 0, Math.PI * 2);
  ctx.strokeStyle = theme.borderPrimary;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Diya Flame Shape
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(centerX, emblemY - 46);
  ctx.quadraticCurveTo(centerX - 24, emblemY - 12, centerX, emblemY + 6);
  ctx.quadraticCurveTo(centerX + 24, emblemY - 12, centerX, emblemY - 46);
  ctx.fillStyle = '#FFB703';
  ctx.fill();

  // Diya Bowl Shape
  ctx.beginPath();
  ctx.moveTo(centerX - 42, emblemY + 12);
  ctx.quadraticCurveTo(centerX, emblemY + 46, centerX + 42, emblemY + 12);
  ctx.quadraticCurveTo(centerX, emblemY + 22, centerX - 42, emblemY + 12);
  ctx.fillStyle = theme.borderPrimary;
  ctx.fill();
  ctx.restore();

  // 7. Main Royal Title
  ctx.fillStyle = theme.accentColor;
  ctx.font = '700 66px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Shubh Deepavali', width / 2, 475);

  // Ornamental Divider Line
  ctx.beginPath();
  ctx.moveTo(width / 2 - 180, 508);
  ctx.lineTo(width / 2 + 180, 508);
  ctx.strokeStyle = theme.borderPrimary;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 8. Recipient Salutation
  ctx.fillStyle = theme.textSecondary;
  ctx.font = 'italic 600 34px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`Dearest ${recipient || 'Loved Ones'},`, width / 2, 585);

  // 9. Wrapped Poetic Blessing Body
  ctx.fillStyle = theme.textPrimary;
  ctx.font = '500 36px "Cormorant Garamond", Georgia, serif';
  const wrappedLines = wrapCanvasText(
    ctx,
    `“${message.trim()}”`,
    width - 280
  );

  let currentY = 675;
  const lineHeight = 54;
  wrappedLines.slice(0, 8).forEach((line) => {
    ctx.fillText(line, width / 2, currentY);
    currentY += lineHeight;
  });

  // 10. Sender Signature Block at Bottom
  const footerY = 1220;
  ctx.fillStyle = theme.textSecondary;
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WITH WARMEST BLESSINGS & GOLDEN LIGHT', width / 2, footerY);

  ctx.fillStyle = theme.accentColor;
  ctx.font = '700 44px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(sender || 'With Love & Respect', width / 2, footerY + 62);

  // Bottom Metadata Stamp
  ctx.fillStyle = theme.textSecondary;
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText(
    `JYOTIRMAYA ROYAL PATRIKA • VIKRAM SAMVAT 2082–2083 • ${serialCode}`,
    width / 2,
    height - 108
  );

  // Trigger PNG Download
  const safeName = (recipient || 'Loved-Ones')
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Shubh-Deepavali-${safeName || 'Blessing'}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
