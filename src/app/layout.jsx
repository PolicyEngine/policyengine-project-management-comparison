import './globals.css';

const SITE_URL = 'https://policyengine-project-management-comparison.vercel.app';
const TITLE = 'Project Management Comparison | PolicyEngine';
const DESCRIPTION = 'Comparison of project management, CRM, API, and engineering tooling options for PolicyEngine.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'PolicyEngine' }],
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport = {
  themeColor: '#2C7A7B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
