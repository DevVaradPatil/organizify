import Modal from '@/components/Modal'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Organizify | Your Personal Task Organizer',
  description: 'Organizify: Your Ultimate Personal Task Manager. Streamline your life with our intuitive task management platform. Organize tasks, set priorities, and boost productivity effortlessly. Try Organizify today for a more organized tomorrow! Developed by Varad Patil',
  image: 'https://cloud.appwrite.io/v1/storage/buckets/64f4194cd176c24c1d5a/files/64fd8caa0dc3f8a6970b/view?project=64f4165fc92e110bea14&mode=admin', // Replace with the URL of an image to represent your website
  url: 'https://organizify-devvaradpatil.vercel.app/', // Replace with the URL of your website
  author: 'Varad Patil', // Replace with the author's name
  date: '2023-09-10', // Replace with the publication date
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
