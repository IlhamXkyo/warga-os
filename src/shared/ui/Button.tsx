import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  style,
  disabled,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--accent-emerald)',
          color: '#042f2e',
          fontWeight: 700,
          border: '1px solid var(--accent-emerald)',
          boxShadow: '0 2px 10px rgba(16, 185, 129, 0.25)',
        };
      case 'gold':
        return {
          background: 'var(--accent-gold)',
          color: '#451a03',
          fontWeight: 700,
          border: '1px solid var(--accent-gold)',
        };
      case 'secondary':
        return {
          background: 'var(--surface-overlay)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-medium)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent',
        };
      case 'danger':
        return {
          background: 'var(--danger-bg)',
          color: 'var(--danger)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '5px 10px', fontSize: '12px', borderRadius: 'var(--radius-sm)', gap: '6px' };
      case 'md':
        return { padding: '8px 14px', fontSize: '13px', borderRadius: 'var(--radius-sm)', gap: '8px' };
      case 'lg':
        return { padding: '11px 20px', fontSize: '14px', borderRadius: 'var(--radius-md)', gap: '10px' };
    }
  };

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
