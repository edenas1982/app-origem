import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Rocket, Calendar, ShieldCheck, Camera, Lightbulb, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudioPage() {
  const statusItems = [
    {
      status: "completed",
      title: "Montagem do Setup Técnico",
      description: "Setup físico pronto para operação: Sony ZV-E10, Sigma Optics e Iluminação Cênica profissional.",
      icon: <Camera className="w-6 h-6" />,
      label: "Finalizado"
    },
    {
      status: "in-progress",
      title: "Formalização Institucional e Redes Sociais",
      description: "Processo de estruturação jurídica (MEI) e criação de presença digital em andamento.",
      icon: <ShieldCheck className="w-6 h-6" />,
      label: "Em andamento"
    },
    {
      status: "priority",
      title: "Produção do Projeto ORIGEM",
      description: "Foco total na execução técnica do edital PNAB Santo Augusto como nossa primeira vitrine oficial.",
      icon: <Rocket className="w-6 h-6" />,
      label: "Prioridade"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-[#e94a86]/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-[#e94a86] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-widest">Voltar ao Projeto</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#e94a86] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Dossiê de Transparência</span>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-32 pb-12 md:pb-24 px-6 max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-24"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-[#e94a86]/30 bg-[#e94a86]/5 text-[#e94a86] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Honestidade Técnica & Transparência
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9]">
            STUDIO <span className="text-[#e94a86]">INSPIRAR</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
            Estamos em fase de estruturação. Nascemos do compromisso com a qualidade técnica e da transparência em cada etapa da nossa jornada audiovisual.
          </p>
        </motion.section>

        {/* Infrastructure & Sincronia */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-32"
        >
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#e94a86]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#e94a86]/10 flex items-center justify-center text-[#e94a86] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Infraestrutura de Entrada</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Possuímos um ecossistema técnico físico pronto para operação, focado em entregar um audiovisual moderno, limpo e profissional para a nossa realidade regional. Utilizamos tecnologia de ponta para projetos independentes.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#e94a86]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#e94a86]/10 flex items-center justify-center text-[#e94a86] mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Sincronia com a PNAB</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nosso nascimento coincidiu com o edital PNAB Santo Augusto. Decidimos priorizar a execução técnica do Projeto ORIGEM, focando nossa energia na entrega de excelência em vez de marketing digital prematuro.
            </p>
          </div>
        </motion.section>

        {/* Status Section */}
        <section className="mb-12 md:mb-32">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-8 md:mb-12 flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-[#e94a86]" />
            Status de Implantação
          </h2>
          
          <div className="space-y-8">
            {statusItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex gap-6 group"
              >
                {/* Connector Line */}
                {index !== statusItems.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-[1px] bg-white/10 group-hover:bg-[#e94a86]/30 transition-colors" />
                )}
                
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                  item.status === 'completed' ? 'bg-[#e94a86] border-[#e94a86] text-white' :
                  item.status === 'in-progress' ? 'bg-[#e94a86]/20 border-[#e94a86]/50 text-[#e94a86] animate-pulse' :
                  item.status === 'priority' ? 'bg-white/10 border-[#e94a86] text-[#e94a86] shadow-[0_0_15px_rgba(233,74,134,0.3)]' :
                  'bg-white/5 border-white/10 text-gray-600'
                }`}>
                  {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : item.icon}
                </div>
                
                <div className="pb-12">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#e94a86]/10 text-[#e94a86] text-[10px] font-bold uppercase tracking-widest border border-[#e94a86]/20">
                      {item.label}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foco na Entrega Técnica */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 rounded-[30px] md:rounded-[40px] bg-gradient-to-br from-[#e94a86]/20 to-transparent border border-[#e94a86]/30 text-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,74,134,0.1),transparent)] group-hover:scale-150 transition-transform duration-1000" />
          <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-6 relative z-10">
            "Não buscamos títulos, buscamos a <span className="text-[#e94a86]">excelência técnica</span>."
          </h2>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-bold relative z-10">
            Nossa vitrine está sendo construída agora.
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em]">
          Studio Inspirar © 2026 • Santo Augusto, RS
        </p>
      </footer>
    </div>
  );
}
