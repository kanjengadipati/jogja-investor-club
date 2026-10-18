export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
        Inject CSS overrides so ALL Sanity Studio pages (document editor,
        list views, form panels) share the same cream background as the
        custom StudioWelcome dashboard (#faf8f4).

        Sanity Studio v3 uses CSS custom properties for theming the pane
        content areas. We target the known Sanity UI data-ui selectors and
        the internal CSS variables for the light scheme.
      */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            /* ── Content pane background ──────────────────────────────────── */

            /* Main workspace / document editor area */
            [data-ui="PaneContent"],
            [data-ui="DocumentPane"],
            [data-ui="FormBuilder"],
            [data-ui="DocumentForm"],
            [data-ui="ScrollContainer"] > div,
            [data-ui="PaneDivider"],
            [data-ui="Pane"],
            [data-ui="RootFlex"] {
              background-color: #faf8f4 !important;
            }

            /* List pane (sidebar content area with document items) */
            [data-ui="PaneContent"] > div,
            [data-ui="MenuItem"],
            [data-ui="CommandList"],
            [data-ui="CommandListItem"] {
              background-color: #faf8f4 !important;
            }

            /* Right-hand document editor panels */
            [data-ui="PortableTextEditor"],
            [data-ui="FormField"],
            [data-testid="document-panel-scroller"] {
              background-color: #faf8f4 !important;
            }

            /* Sanity UI layer-based vars (light scheme) */
            :root {
              --card-bg-color: #faf8f4 !important;
              --card-2-bg-color: #f3efe7 !important;
              --card-3-bg-color: #ede8de !important;
            }

            /* Target Sanity's internal theme layer selectors */
            [data-sanity-studio] {
              background-color: #faf8f4 !important;
            }

            /* Workaround: catch all major content bg selectors */
            .sanity-studio [class*="PaneContent"],
            .sanity-studio [class*="DocumentPane"],
            .sanity-studio [class*="RootFlex"] {
              background-color: #faf8f4 !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}
