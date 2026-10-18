import React from 'react';

export default function StudioNavbar(props: any) {
  return (
    <div>
      {/* Global CSS injection for maximum button text contrast & clarity */}
      <style>{`
        /* Sanity Studio Action Bar: Publish Button Ultra-Clear Contrast */
        button[data-testid*="publish"],
        button[data-testid*="Publish"],
        button[aria-label*="Publish"],
        button[aria-label*="publish"],
        [data-ui="Button"][data-tone="positive"] {
          background-color: #059669 !important;
          color: #ffffff !important;
          border: 1px solid #047857 !important;
        }

        button[data-testid*="publish"] *,
        button[data-testid*="Publish"] *,
        button[aria-label*="Publish"] *,
        button[aria-label*="publish"] *,
        [data-ui="Button"][data-tone="positive"] * {
          color: #ffffff !important;
          fill: #ffffff !important;
          stroke: #ffffff !important;
          opacity: 1 !important;
          font-weight: 700 !important;
          letter-spacing: 0.01em !important;
        }

        button[data-testid*="publish"]:hover,
        button[data-testid*="Publish"]:hover,
        [data-ui="Button"][data-tone="positive"]:hover {
          background-color: #047857 !important;
        }

        /* Primary Buttons (Gold) */
        [data-ui="Button"][data-tone="primary"] {
          background-color: #d5a864 !important;
          color: #071914 !important;
        }
        [data-ui="Button"][data-tone="primary"] * {
          color: #071914 !important;
          font-weight: 700 !important;
        }
        [data-ui="Button"][data-tone="primary"]:hover {
          background-color: #e2b772 !important;
        }

        /* Default action buttons in footer */
        [data-testid="pane-footer"] button {
          font-weight: 600 !important;
        }
      `}</style>

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
