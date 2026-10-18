import React from 'react';

export default function StudioNavbar(props: any) {
  return (
    <div>
      {/* Top Brand Notification & Live Preview Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px',
          backgroundColor: '#051410',
          borderBottom: '1px solid rgba(213, 168, 100, 0.25)',
          fontSize: '12px',
          color: '#e5e7eb',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px' }}>🟢</span>
            <span style={{ color: '#d5a864', fontWeight: 700 }}>JIC CMS Connected</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>·</span>
            <span style={{ color: '#9ca3af', fontSize: '11px' }}>Dataset: production (fxrpr0tm)</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '8px',
              backgroundColor: '#071914',
              border: '1px solid rgba(213, 168, 100, 0.5)',
              color: '#d5a864',
              fontWeight: 700,
              fontSize: '11.5px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <span>Lihat Website Live</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>
      </div>

      {/* Render Default Sanity Navbar */}
      {props.renderDefault(props)}
    </div>
  );
}
