import React from 'react';

export default function StudioNavbar(props: any) {
  return (
    <>
      <style>{`
        /* 1. Turn Sanity's real Navbar into JIC Dark Emerald (#071914) */
        header[data-ui="Navbar"],
        [data-ui="Navbar"],
        [data-testid="studio-navbar"] {
          background-color: #071914 !important;
          background: #071914 !important;
          border-bottom: 1px solid rgba(213, 168, 100, 0.35) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
        }

        /* 2. Brand title, search button, and icons in Navbar */
        [data-ui="Navbar"] button,
        [data-ui="Navbar"] a,
        [data-ui="Navbar"] span,
        [data-ui="Navbar"] p,
        [data-ui="Navbar"] svg {
          color: #ffffff !important;
          fill: currentColor !important;
        }

        /* 3. Search & Workspace button hover */
        [data-ui="Navbar"] button:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* 4. Active Tool Tabs in Navbar (Beranda & Panduan, Structure, Releases) */
        [data-ui="Navbar"] button[data-selected="true"],
        [data-ui="Navbar"] button[aria-selected="true"],
        [data-ui="Navbar"] [data-selected="true"] {
          background-color: rgba(213, 168, 100, 0.18) !important;
          border: 1px solid rgba(213, 168, 100, 0.4) !important;
          border-radius: 8px !important;
        }

        [data-ui="Navbar"] button[data-selected="true"] span,
        [data-ui="Navbar"] button[aria-selected="true"] span,
        [data-ui="Navbar"] [data-selected="true"] span {
          color: #d5a864 !important;
          font-weight: 700 !important;
        }

        /* 5. Publish button high contrast */
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
        }

        button[data-testid*="publish"]:hover,
        button[data-testid*="Publish"]:hover,
        [data-ui="Button"][data-tone="positive"]:hover {
          background-color: #047857 !important;
        }
      `}</style>

      {/* Render Single Seamless Sanity Navbar */}
      {props.renderDefault(props)}
    </>
  );
}
