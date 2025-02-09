import Features from './comp/Features'
import Header from './comp/Header'
import Hero from './comp/Hero'

function Home() {
  return (
    <div className='px-2 mb-20 mb:px-8'>
        <Header />
        <Hero />
        <Features />
    </div>
  )
}

export default Home