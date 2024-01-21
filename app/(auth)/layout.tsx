import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <>
    <main className="grow">

      <PageIllustration />

      {children}

    </main>

    <Footer />
  </>
  )
}
