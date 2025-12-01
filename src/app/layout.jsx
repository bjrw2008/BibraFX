import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BibraFX - Premium Forex Trading Education',
  description: 'Master forex trading with premium educational materials, expert strategies, and comprehensive resources. Transform your trading journey with BibraFX.',
  keywords: 'forex trading, technical analysis, risk management, trading education, forex strategies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN for Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1" style={{ paddingTop: '76px' }}>
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Bootstrap JS */}
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" 
          crossOrigin="anonymous"
          async
        ></script>
      </body>
    </html>
  );
}