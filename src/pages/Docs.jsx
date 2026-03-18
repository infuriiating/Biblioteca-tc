import { ShieldAlert, BookOpen, Bot, Key, ShieldCheck, ExternalLink, GraduationCap, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Select from '../components/ui/Select'

const DocSection = ({ icon: Icon, title, children }) => (
  <div className="bg-bg-surface border border-border/50 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
          <Icon size={28} />
        </div>
      </div>
      <div className="space-y-4 flex-grow">
        <h2 className="text-2xl font-black text-text-main">{title}</h2>
        <div className="text-text-muted space-y-4 leading-relaxed font-medium">
          {children}
        </div>
      </div>
    </div>
  </div>
)

const Docs = () => {
  const { t, language, setLanguage } = useLanguage()

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'nl', name: 'Nederlands' }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4">
      {/* Header */}
      <div className="space-y-4 mt-4 relative">
        <div className="absolute right-0 top-0 flex items-center gap-3 z-10 w-48">
           <Select 
             options={languages.map(l => ({ id: l.code, name: l.name }))}
             value={language}
             onChange={(val) => setLanguage(val)}
           />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
          <BookOpen size={16} /> {t('docs.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight pr-40">{t('docs.title')}</h1>
        <p className="text-text-muted text-lg font-medium max-w-2xl">
          {t('docs.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <DocSection icon={GraduationCap} title={t('docs.roles.title')}>
          <p>{t('docs.roles.desc')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-text-main">{t('docs.roles.student')}</strong>: {t('docs.roles.studentDesc')}</li>
            <li><strong className="text-text-main">{t('docs.roles.admin')}</strong>: {t('docs.roles.adminDesc')}</li>
          </ul>
        </DocSection>

        <DocSection icon={BookOpen} title={t('docs.borrow.title')}>
          <p>{t('docs.borrow.desc')}</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>{t('docs.borrow.step1')}</li>
            <li>{t('docs.borrow.step2')}</li>
            <li>{t('docs.borrow.step3')}</li>
          </ol>
          <p className="text-sm bg-orange-500/10 text-orange-500 p-4 rounded-xl border border-orange-500/20 mt-4">
            <strong>{t('docs.borrow.note')}</strong>
          </p>
        </DocSection>

        <DocSection icon={Key} title={t('docs.pin.title')}>
          <p>{t('docs.pin.desc')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('docs.pin.step1')}</li>
            <li>{t('docs.pin.step2')}</li>
            <li><strong>{t('docs.pin.step3')}</strong></li>
          </ul>
        </DocSection>

        <DocSection icon={Bot} title={t('docs.ai.title')}>
          <p>{t('docs.ai.desc')}</p>
          <ul className="list-disc pl-5 space-y-3 mt-4">
            <li className="bg-bg-main p-4 rounded-xl border border-border/50">
              <strong className="text-text-main text-base inline-flex items-center gap-2 block mb-1"> {t('docs.ai.item1')}</strong>
              {t('docs.ai.item1Desc')}
            </li>
            <li className="bg-bg-main p-4 rounded-xl border border-border/50 opacity-60">
              <strong className="text-text-main text-base inline-flex items-center gap-2 block mb-1"> {t('docs.ai.item2')}</strong>
              {t('docs.ai.item2Desc')}
            </li>
            <li className="bg-bg-main p-4 rounded-xl border border-border/50 opacity-60">
              <strong className="text-text-main text-base inline-flex items-center gap-2 block mb-1"> {t('docs.ai.item3')}</strong>
              {t('docs.ai.item3Desc')}
            </li>
          </ul>
        </DocSection>

        <DocSection icon={ShieldCheck} title={t('docs.adminPortal.title')}>
          <p>{t('docs.adminPortal.desc')}</p>
          <p className="mt-2">{t('docs.adminPortal.desc2')}</p>
          <ol className="list-decimal pl-5 space-y-2 mt-4">
            <li>{t('docs.adminPortal.step1')}</li>
            <li>{t('docs.adminPortal.step2')}</li>
            <li>{t('docs.adminPortal.step3')}</li>
          </ol>
        </DocSection>
      </div>
    </div>
  )
}

export default Docs
