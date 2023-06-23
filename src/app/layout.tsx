import './globals.css'

export const metadata = {
  title: 'Github finder',
  description: 'Github finder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-950">{children}</body>
    </html>
  )
}
