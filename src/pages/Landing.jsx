import { useNavigate } from 'react-router-dom'
import { BookOpen, GraduationCap, Search, ShieldCheck, Globe, ArrowRight, Book, Library, HelpCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import Select from '../components/ui/Select'
import logo from '../assets/logo.png'

const Landing = () => {
  const navigate = useNavigate()
  const { t, language, setLanguage } = useLanguage()

  const features = [
    {
      icon: Search,
      title: t('landing.features.search'),
      desc: t('landing.features.searchDesc')
    },
    {
      icon: Book,
      title: t('landing.features.manage'),
      desc: t('landing.features.manageDesc')
    },
    {
      icon: Globe,
      title: t('landing.features.access'),
      desc: t('landing.features.accessDesc')
    }
  ]

  return (
    <div className="min-h-screen bg-bg-main selection:bg-primary/20 relative">

      {/* Floating Header Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <div className="w-24 sm:w-32">
          <Select
            options={[
              { id: 'pt', name: 'PT' },
              { id: 'en', name: 'EN' },
              { id: 'es', name: 'ES' },
              { id: 'fr', name: 'FR' },
              { id: 'de', name: 'DE' },
              { id: 'nl', name: 'NL' }
            ]}
            value={language}
            onChange={setLanguage}
            triggerClassName="!h-[42px] !px-4 !rounded-xl"
          />
        </div>
        <Link to="/docs" className="h-[42px] w-[42px] flex items-center justify-center bg-bg-surface rounded-xl border border-border/40 text-text-muted hover:text-primary hover:border-primary/20 transition-all group" title={t('navbar.docs')}>
          <HelpCircle size={18} className="transition-transform" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] animate-fade-in">
              <Library size={14} /> {t('landing.badge')}
            </div>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-text-main tracking-tight leading-[1.1]">
              {t('landing.title')}
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-medium max-w-2xl mx-auto leading-relaxed">
              {t('landing.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/catalogo')}
              className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-primary/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              {t('landing.exploreBtn')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-bg-surface border border-border/50 text-text-main rounded-2xl font-bold transition-all hover:bg-white hover:border-primary/30"
            >
              {t('navbar.login')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-bg-surface border border-border/40 p-8 rounded-[2.5rem] space-y-4 hover:shadow-2xl hover:shadow-primary/5 transition-all group hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-text-main pt-2">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-bg-surface border border-border/40 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex-grow space-y-6 relative z-10">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
              {t('landing.aboutTitle')}
            </h2>
            <p className="text-lg text-text-muted leading-relaxed font-medium">
              {t('landing.aboutDesc')}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">100+</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Anos de História</span>
              </div>
              <div className="w-px h-10 bg-border/50" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">10k+</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Livros no Acervo</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[400px] shrink-0 relative group">
            <img
              src={logo}
              alt="School Logo"
              className="w-full h-full object-contain relative z-10 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="p-12 bg-primary/5 rounded-[3rem] border border-primary/10">
          <h2 className="text-3xl font-bold text-text-main tracking-tight italic">
            “Um quarto sem livros é como um corpo sem alma.”
          </h2>
        </div>
        <p className="mt-12 text-sm font-bold text-text-muted uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Agrupamento de Escolas Tomás Cabreira
        </p>
      </footer>
    </div>
  )
}

export default Landing
