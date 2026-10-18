import React from 'react';

export default function StudioLogo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '4px 6px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/images/logo-jic-dark-navbar.png"
          alt="Jogja Investor Club"
          style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Jogja Investor
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              color: '#d5a864',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            CLUB
          </span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              color: '#071914',
              backgroundColor: '#d5a864',
              padding: '1px 5px',
              borderRadius: '3px',
              letterSpacing: '0.05em',
            }}
          >
            STUDIO
          </span>
        </div>
      </div>
    </div>
  );
}
