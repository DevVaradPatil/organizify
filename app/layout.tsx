import Modal from '@/components/Modal'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Organizify | Your Personal Task Organizer',
  description: 'Developed by Varad Patil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className='bg-[#F5F6F8]'>
        {children}
        <Modal/>
        </body>
    </html>
    </ClerkProvider>
  )
}
