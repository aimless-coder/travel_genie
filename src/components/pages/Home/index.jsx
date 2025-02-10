import Features from './comp/Features'
import Header from './comp/Header'
import Hero from './comp/Hero'
import About from './comp/About'
import Footer from './comp/Footer'

function Home() {
  return (
    <>
    <div className='px-2 md:px-8'>
        <Header />
        <Hero />
        <Features />
        <About />
    </div>
        <Footer />
    
    </>
  )
}

export default Home