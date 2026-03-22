import { BookOpen, Key, Clock, Bot, AlertCircle, MessageSquare } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const DocSection = ({ icon: Icon, title, children }) => (
  <div className="bg-bg-surface border border-border/50 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
          <Icon size={28} />
        </div>
      </div>
      <div className="space-y-4 flex-grow">
        <h2 className="text-2xl font-black text-text-main tracking-tight uppercase">{title}</h2>
        <div className="text-text-muted text-lg leading-relaxed font-medium">
          {children}
        </div>
      </div>
    </div>
  </div>
)

const Docs = () => {
  const { t } = useLanguage()

  const sections = [
    { id: 'borrow', icon: BookOpen },
    { id: 'pin', icon: Key },
    { id: 'duration', icon: Clock },
    { id: 'ai', icon: Bot },
    { id: 'fine', icon: AlertCircle },
    { id: 'feedback', icon: MessageSquare }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
          <BookOpen size={16} /> {t('docs.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">{t('docs.title')}</h1>
        <p className="text-text-muted text-lg font-medium max-w-2xl">
          {t('docs.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <DocSection 
            key={section.id} 
            icon={section.icon} 
            title={t(`docs.${section.id}.title`)}
          >
            <p>{t(`docs.${section.id}.desc`)}</p>
          </DocSection>
        ))}
      </div>
    </div>
  )
}

export default Docs
