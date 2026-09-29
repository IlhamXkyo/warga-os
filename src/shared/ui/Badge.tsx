import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'gold' | 'danger' | 'cyan' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => {
  const getStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'emerald':
        return {
          background: 'var(--accent-emerald-glow)',
          color: 'var(--accent-emerald-hover)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'gold':
        return {
          background: 'var(--accent-gold-glow)',
          color: 'var(--accent-gold)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        };
      case 'danger':
        return {
          background: 'var(--danger-bg)',
          color: 'var(--danger)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      case 'cyan':
        return {
          background: 'rgba(6, 182, 212, 0.12)',
          color: '#22d3ee',
          border: '1px solid rgba(6, 182, 212, 0.3)',
        };
      case 'default':
      default:
        return {
          background: 'var(--surface-overlay)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-medium)',
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        borderRadius: 'var(--radius-full)',
        padding: size === 'sm' ? '2px 7px' : '3px 10px',
        fontSize: size === 'sm' ? '10px' : '11px',
        ...getStyles(),
      }}
    >
      {children}
    </span>
  );
};
