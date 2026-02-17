import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
