import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import GithubActivity from './components/GithubActivity';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SideMenu from './components/SideMenu';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  return (
    <div className="relative">
      <ParticlesBackground />
      <CustomCursor />
      <Navbar />
      <SideMenu />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <GithubActivity />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
