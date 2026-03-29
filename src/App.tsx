/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Play, Download, ArrowRight, Instagram, Youtube, Globe, ChevronLeft, ChevronRight, Plus, Handshake, Users, Clapperboard, Camera, Star, Heart, Zap } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import StudioPage from "./pages/StudioPage";

// Componente para forçar o scroll para o topo em cada navegação
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Carousel({ slides, currentIndex, onNext, onPrev }: { slides: { url: string; caption: string }[], currentIndex: number, onNext: () => void, onPrev: () => void }) {
  return (
    <div className="relative w-full h-full group overflow-hidden rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].url}
            alt={slides[currentIndex].caption}
            className="w-full h-full object-cover opacity-80 bg-zinc-900"
            referrerPolicy="no-referrer"
          />
          {/* Caption with fixed height container to prevent layout shifts */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center px-6 bg-black/60 backdrop-blur-md border-t border-white/10">
            <p className="text-xs md:text-sm text-gray-300 font-light italic leading-tight">
              {slides[currentIndex].caption}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-40 pointer-events-none">
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white transition-all pointer-events-auto ${currentIndex === 0 ? 'opacity-0 scale-50' : 'opacity-0 group-hover:opacity-100 hover:bg-[#e94a86]'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          disabled={currentIndex === slides.length - 1}
          className={`p-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white transition-all pointer-events-auto ${currentIndex === slides.length - 1 ? 'opacity-0 scale-50' : 'opacity-0 group-hover:opacity-100 hover:bg-[#e94a86]'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function TimelineItem({ item, index, id, isLast }: { item: any; index: number; id?: string; key?: any; isLast?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isEven = (index + 1) % 2 === 0;
  const Icon = item.icon === "Handshake" ? Handshake : 
               item.icon === "Users" ? Users : 
               item.icon === "Clapperboard" ? Clapperboard : 
               item.icon === "Camera" ? Camera :
               item.icon === "Star" ? Star : 
               item.icon === "Globe" ? Globe : null;

  const handleNext = () => {
    if (currentIndex < item.slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (item.specialLayout) {
    return (
      <motion.div
        id={id}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center pt-0 pb-4 md:pb-12 px-6 overflow-visible"
      >
        {/* Central Axis Line - Pink and solid */}
        <div className="absolute top-0 h-1/2 w-px bg-[#e94a86]/40 z-0" />
        
        {/* Aura Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#e94a86] rounded-full blur-[200px] opacity-10 z-0 animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          {item.hasBadge && (
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-[11px] font-black tracking-[0.5em] uppercase mb-8 border-2 border-[#e94a86] px-8 py-2.5 rounded-full backdrop-blur-xl bg-[#e94a86]/30 shadow-[0_0_30px_rgba(233,74,134,0.4)]"
            >
              {item.badgeText}
            </motion.span>
          )}
          
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-[#e94a86] blur-2xl opacity-30 rounded-full animate-pulse" />
            {Icon && <Icon className="w-16 h-16 text-[#e94a86] relative z-10 drop-shadow-[0_0_20px_rgba(233,74,134,0.6)]" />}
          </div>

          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#e94a86] font-black text-sm tracking-[0.8em] uppercase mb-6 block"
          >
            {item.year}
          </motion.span>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[0.85] uppercase italic bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 drop-shadow-2xl"
          >
            {item.title}
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-[#e94a86]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <p className="relative z-10 text-gray-300 font-light leading-relaxed text-xl md:text-3xl max-w-3xl mx-auto italic tracking-tight">
              <span className="text-[#e94a86] font-serif text-5xl absolute -left-8 -top-4 opacity-40">"</span>
              {item.description}
              <span className="text-[#e94a86] font-serif text-5xl absolute -right-8 -bottom-8 opacity-40">"</span>
            </p>
          </motion.div>

          {/* Carousel for Special Layout */}
          <div className="mt-12 w-full max-w-5xl relative group">
            {/* Mobile Dot - Aligned with Image Center */}
            <div className="md:hidden absolute left-[20px] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-[#e94a86] shadow-[0_0_15px_rgba(233,74,134,0.8)] border-4 border-[#0c0d10]" />
            </div>
            
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e94a86]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <motion.div 
              onClick={handleNext}
              whileHover={{ scale: 1.01 }}
              className="w-full aspect-[4/3] relative rounded-[3rem] p-4 bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl cursor-pointer group overflow-hidden"
            >
              <div className="absolute -top-6 right-12 flex items-center gap-4 z-50">
                {item.slides.map((_: any, i: number) => (
                  <div key={i} className={`transition-all duration-500 rounded-full ${i === currentIndex ? "bg-[#e94a86] w-16 h-2" : "bg-white/20 w-3 h-3"}`} />
                ))}
              </div>
              <Carousel slides={item.slides} currentIndex={currentIndex} onNext={handleNext} onPrev={handlePrev} />
            </motion.div>
          </div>

          {/* Final Point of Light / Heart Icon */}
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="mt-12 relative"
          >
            <div className="absolute inset-0 bg-[#e94a86] blur-[60px] opacity-40 rounded-full scale-[2]" />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#e94a86] to-[#d13d75] flex items-center justify-center shadow-[0_0_80px_rgba(233,74,134,0.9)] border-4 border-white/20"
            >
              <Heart className="text-white fill-white w-12 h-12 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex md:grid md:grid-cols-[1fr_80px_1fr] items-start md:items-center ${index === 0 ? 'pt-4 md:pt-24' : ''} ${isLast ? 'pb-2 md:pb-8' : (index === 4 ? 'pb-4 md:pb-20' : 'pb-4 md:pb-40')}`}
    >
      {/* Column 1: Text (Odd) or Image (Even) - Desktop Only */}
      <div className={`hidden md:flex flex-col ${!isEven ? 'items-center text-center px-6' : 'pr-6'} pb-6`}>
        {!isEven ? (
          /* Text for Odd Phases (01, 03, 05) */
          <div className="flex flex-col items-center max-w-md">
            {item.hasBadge && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase mb-8 border-2 border-[#e94a86] px-6 py-2 rounded-full backdrop-blur-xl bg-[#e94a86]/30 shadow-[0_0_20px_rgba(233,74,134,0.3)]"
              >
                {item.badgeText}
              </motion.span>
            )}
            {Icon && <Icon className="w-10 h-10 text-[#e94a86] mb-6" />}
            <span className="text-[#e94a86] font-black text-xs tracking-[0.4em] uppercase mb-4 block">{item.year}</span>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight leading-tight">{item.title}</h3>
            <p className="text-gray-400 font-light leading-relaxed text-base lg:text-lg">{item.description}</p>
          </div>
        ) : (
          /* Image for Even Phases (02, 04) */
          <motion.div 
            onClick={handleNext}
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="w-full aspect-[3/4] relative rounded-[2.5rem] p-3 bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl cursor-pointer group"
          >
            <div className="absolute -top-6 right-8 flex items-center gap-4 z-50">
              {item.slides.map((_: any, i: number) => (
                <div key={i} className={`transition-all duration-500 rounded-full ${i === currentIndex ? "bg-[#e94a86] w-12 h-2" : "bg-white/20 w-3 h-3"}`} />
              ))}
            </div>
            <Carousel slides={item.slides} currentIndex={currentIndex} onNext={handleNext} onPrev={handlePrev} />
          </motion.div>
        )}
      </div>

      {/* Journey Axis (Central on Desktop, Left on Mobile) */}
      <div className="flex-shrink-0 w-10 md:w-auto md:h-full flex flex-col items-center justify-start md:justify-center relative z-10 pt-4 md:pt-0">
        {/* Axis Line - Continuous Pink Line */}
        <div className="absolute top-0 bottom-0 w-px bg-[#e94a86]/20 left-1/2 -translate-x-1/2" />
        
        {/* Circle Button - Desktop Only */}
        <button
          onClick={handleNext}
          disabled={currentIndex === item.slides.length - 1}
          className={`hidden md:block relative group outline-none transition-all duration-500 ${currentIndex === item.slides.length - 1 ? 'opacity-30 grayscale cursor-default scale-90' : 'opacity-100'}`}
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#e94a86] flex items-center justify-center shadow-[0_0_40px_rgba(233,74,134,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_60px_rgba(233,74,134,0.9)] group-active:scale-95 transition-all duration-300">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white group-hover:scale-150 transition-transform" />
          </div>
        </button>
      </div>

      {/* Column 3: Image (Odd) or Text (Even) - Desktop Only */}
      <div className={`hidden md:flex flex-col ${isEven ? 'items-center text-center px-6' : 'pl-6'} pb-6`}>
        {isEven ? (
          /* Text for Even Phases (02, 04) */
          <div className="flex flex-col items-center max-w-md">
            {item.hasBadge && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase mb-8 border-2 border-[#e94a86] px-6 py-2 rounded-full backdrop-blur-xl bg-[#e94a86]/30 shadow-[0_0_20px_rgba(233,74,134,0.3)]"
              >
                {item.badgeText}
              </motion.span>
            )}
            {Icon && <Icon className="w-10 h-10 text-[#e94a86] mb-6" />}
            <span className="text-[#e94a86] font-black text-xs tracking-[0.4em] uppercase mb-4 block">{item.year}</span>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight leading-tight">{item.title}</h3>
            <p className="text-gray-400 font-light leading-relaxed text-base lg:text-lg">{item.description}</p>
          </div>
        ) : (
          /* Image for Odd Phases (01, 03, 05) */
          <motion.div 
            onClick={handleNext}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="w-full aspect-[3/4] relative rounded-[2.5rem] p-3 bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl cursor-pointer group"
          >
            <div className="absolute -top-6 right-8 flex items-center gap-4 z-50">
              {item.slides.map((_: any, i: number) => (
                <div key={i} className={`transition-all duration-500 rounded-full ${i === currentIndex ? "bg-[#e94a86] w-12 h-2" : "bg-white/20 w-3 h-3"}`} />
              ))}
            </div>
            <Carousel slides={item.slides} currentIndex={currentIndex} onNext={handleNext} onPrev={handlePrev} />
          </motion.div>
        )}
      </div>

      {/* Mobile Content Stack */}
      <div className="md:hidden flex-1 pl-4 flex flex-col gap-4 py-4">
        <div>
          {item.hasBadge && (
            <span className="text-white text-[9px] font-black tracking-[0.3em] uppercase mb-4 border-2 border-[#e94a86] px-4 py-1 rounded-full inline-block bg-[#e94a86]/30 shadow-[0_0_15px_rgba(233,74,134,0.3)]">
              {item.badgeText}
            </span>
          )}
          {Icon && <Icon className="w-6 h-6 text-[#e94a86] mb-3" />}
          <span className="text-[#e94a86] font-black text-xs tracking-[0.4em] uppercase mb-2 block">{item.year}</span>
          <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{item.title}</h3>
          <p className="text-gray-400 font-light leading-relaxed text-sm">{item.description}</p>
        </div>
        <div 
          onClick={handleNext}
          className="relative aspect-[4/3] rounded-[2rem] p-2 bg-white/[0.02] border border-white/10 cursor-pointer group"
        >
          {/* Mobile Dot - Aligned with Image Center */}
          <div className="absolute -left-[36px] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-[#e94a86] shadow-[0_0_15px_rgba(233,74,134,0.8)] border-4 border-[#0c0d10]" />
          </div>
          
          <div className="absolute -top-4 right-4 flex items-center gap-2 z-50 scale-75">
            {item.slides.map((_: any, i: number) => (
              <div key={i} className={`transition-all duration-500 rounded-full ${i === currentIndex ? "bg-[#e94a86] w-8 h-1.5" : "bg-white/20 w-2 h-2"}`} />
            ))}
          </div>
          <Carousel slides={item.slides} currentIndex={currentIndex} onNext={handleNext} onPrev={handlePrev} />
        </div>
      </div>
    </motion.div>
  );
}

function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Timeline adaptada para o Masterplan do Projeto
  const timelineData = [
    {
      year: "Fase 01",
      title: "Imersão & Parceria Municipal",
      description: "A aventura começa com a imersão em um ecossistema tecnológico real, viabilizado pela parceria com a Secretaria Municipal e Prefeitura. É a democratização do acesso a ferramentas poderosas de audiovisual, permitindo que o jovem saia do amadorismo e domine a linguagem técnica necessária para impactar a sociedade e o mercado atual.",
      hasBadge: true,
      badgeText: "PARCERIA MUNICIPAL",
      icon: "Handshake",
      slides: [
        { url: "/assets/images/fase1/img1.webp", caption: "Equipamento de cinema line como ferramenta de transformação." },
        { url: "/assets/images/fase1/img2.webp", caption: "Imersão tecnológica: Jovens dominando a linguagem visual." },
        { url: "/assets/images/fase1/img3.webp", caption: "Precisão técnica: A democratização do acesso a ferramentas de elite." },
        { url: "/assets/images/fase1/img4.webp", caption: "Ecossistema real: O Studio Inspirar como palco do protagonismo jovem." }
      ]
    },
    {
      year: "Fase 02",
      title: "Network & Engenharia de Acesso",
      description: "Onde a política pública se torna tangível. Através da parceria com a Secretaria e a Prefeitura, quebramos a barreira financeira que separa o jovem da produção profissional. Ao levar equipamentos de alto padrão para dentro da escola, transformamos um desejo distante em uma ferramenta real de trabalho e pertencimento.",
      hasBadge: true,
      badgeText: "ENGENHARIA DE ACESSO",
      icon: "Globe",
      slides: [
        { url: "/assets/images/fase2/img1.webp", caption: "Logística do Acesso: O desembarque de um ecossistema de elite." },
        { url: "/assets/images/fase2/img2.webp", caption: "Engajamento Técnico: A quebra da barreira financeira." },
        { url: "/assets/images/fase2/img3.webp", caption: "Política Pública Tangível." },
        { url: "/assets/images/fase2/img4.webp", caption: "Ferramenta de Pertencimento." },
        { url: "/assets/images/fase2/img5.webp", caption: "Mentoria Técnica." }
      ]
    },
    {
      year: "Fase 03",
      title: "Aliança Escolar & Diversidade",
      description: "O nascimento do projeto na comunidade. Em parceria com a diretoria, realizamos a triagem oficial seguindo as normas do edital para selecionar 10 protagonistas. Com foco total em equidade, garantimos paridade de gênero (5 moças e 5 rapazes) e cotas raciais, unindo diferentes estereótipos em um coletivo plural. É o momento em que a diversidade da escola se transforma na força criativa do projeto.",
      hasBadge: true,
      badgeText: "COLETIVO PLURAL",
      icon: "Users",
      slides: [
        { url: "/assets/images/fase3/img1.jpeg", caption: "A Triagem: Parceria com a diretoria para selecionar protagonistas." },
        { url: "/assets/images/fase3/img2.jpeg", caption: "O Coletivo Plural: Formação oficial com equidade." },
        { url: "/assets/images/fase3/img3.jpeg", caption: "União de Estereótipos: A diversidade transformada em força." },
        { url: "/assets/images/fase3/img4.jpeg", caption: "Equidade em Foco: 5 moças e 5 rapazes unidos." },
        { url: "/assets/images/fase3/img5.jpeg", caption: "Nascimento do Projeto: O talento jovem assume o controle." }
      ]
    },
    {
      year: "Fase 04",
      title: "Imersão Tecnológica & Mentoria Ativa",
      description: "A jornada prática começa. Os 10 protagonistas mergulham nos pilares que compõem o audiovisual de alto impacto: Áudio Profissional, Vídeo de Elite e Iluminação Cênica. Sob a mentoria direta do Agente Cultural, eles dominam técnicas extraordinárias de posicionamento de câmera, formulação de entrevistas e treinamento para âncoras e videomakers.",
      hasBadge: true,
      badgeText: "MENTORIA ATIVA",
      icon: "Clapperboard",
      slides: [
        { url: "/assets/images/fase4/img1.jpeg", caption: "Mentoria Ativa: O Agente Cultural guiando o domínio técnico." },
        { url: "/assets/images/fase4/img2.jpeg", caption: "Movimento e Fluidez: Estabilização de imagem em padrão de elite." },
        { url: "/assets/images/fase4/img3.jpeg", caption: "Padrão de Mercado: Criação de conteúdo de qualidade superior." },
        { url: "/assets/images/fase4/img4.jpeg", caption: "Potencial Revelado: Tecnologia de alto impacto." }
      ]
    },
    {
      year: "Fase 05",
      title: "Realização Cênica & Produção",
      description: "O momento da verdade. Os 10 protagonistas assumem o set de filmagem para gravar os episódios oficiais, aplicando a mentoria de áudio, vídeo e luz para criar um legado de conteúdo autêntico.",
      hasBadge: true,
      badgeText: "REALIZAÇÃO CÊNICA",
      icon: "Camera",
      slides: [
        { url: "/assets/images/fase5/img1.webp", caption: "Realização Cênica: Domínio total de luz e enquadramento." },
        { url: "/assets/images/fase5/img2.webp", caption: "Legado Sonoro: Pós-produção de áudio profissional." },
        { url: "/assets/images/fase5/img3.webp", caption: "Look & Feel: Aplicação técnica de Color Grading." },
        { url: "/assets/images/fase5/img4.webp", caption: "Gravação dos episódios oficiais com padrão cinematográfico." },
        { url: "/assets/images/fase5/img5.webp", caption: "Ação e Precisão: Monitoramento de qualidade em tempo real." }
      ]
    },
    {
      year: "Fase 06",
      title: "A Grande Estreia & Celebração",
      description: "O ápice da jornada. Os episódios são apresentados em um evento de gala para a comunidade, onde a sociedade se torna o grande auditório. É o momento de celebrar o protagonismo jovem e a entrega do legado cultural à cidade, unindo escola, família e poder público em um marco histórico.",
      hasBadge: true,
      badgeText: "MARCO HISTÓRICO",
      icon: "Star",
      specialLayout: true,
      slides: [
        { url: "/assets/images/fase6/img1.webp", caption: "O Ápice: O projeto ORIGEM celebrando o legado cultural." }
      ]
    }
  ];

  // Parceiros e Autoridades do Projeto
  const authorityPartners = [
    {
      name: "PREFEITURA",
      description: "Apoio institucional e fomento à cultura local.",
      url: "https://santoaugusto.rs.gov.br/",
      logo: "/assets/images/logos/prefeitura/logo.jpg",
      isInternal: false
    },
    {
      name: "SEC. CULTURA",
      description: "Gestão estratégica e curadoria do edital cultural.",
      url: "https://santoaugusto.rs.gov.br/politica-nacional-aldir-blanc-pnab/",
      logo: "/assets/images/logos/cultura/logo.jpeg",
      isInternal: false
    },
    {
      name: "PNAB",
      description: "Política Nacional Aldir Blanc - Fomento à Cultura.",
      url: "https://www.gov.br/cultura/pt-br/assuntos/politica-nacional-aldir-blanc",
      logo: "/assets/images/logos/pnab/logoPNAB.JPG",
      isInternal: false
    },
    {
      name: "STUDIO INSPIRAR",
      description: "Núcleo de criação e produção audiovisual do projeto.",
      url: "/studio",
      logo: "/assets/images/logos/inspirar/logo.webp",
      isInternal: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white selection:bg-[#e94a86] selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 py-6 md:py-8 px-6 md:px-12 flex justify-between items-center bg-transparent backdrop-blur-sm transition-all duration-500">
        <div className="text-2xl font-bold tracking-tighter uppercase">
          ORIGEM<span className="text-[#e94a86]">.</span>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold items-center">
          <a href="#jornada" className="hover:text-[#e94a86] transition-colors">A Jornada</a>
          <a href="#tecnologia" className="hover:text-[#e94a86] transition-colors">Tecnologia</a>
          <Link to="/studio" className="hover:text-[#e94a86] transition-colors">Quem Somos</Link>
        </div>
      </nav>

      <main className="pt-0">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-32 md:pt-40">
          {/* Background Atmosphere */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e94a86]/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-white/30 text-[10px] font-bold tracking-[0.6em] uppercase mb-6 block">
                Projeto Cultural
              </span>
              <h1 className="text-5xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-[0.8] uppercase mb-6 md:mb-8">
                ORIGEM<span className="text-[#e94a86]">.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                <div className="h-px w-12 bg-[#e94a86]/40 hidden md:block" />
                <p className="text-[#e94a86] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                  O Futuro do Protagonismo Jovem
                </p>
                <div className="h-px w-12 bg-[#e94a86]/40 hidden md:block" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-xl mx-auto px-4 md:px-0"
            >
              <p className="text-[9px] md:text-xs text-white/40 font-medium leading-relaxed tracking-[0.2em] uppercase">
                Transformando alunos em criadores de conteúdo profissionais através de tecnologia de alto impacto.
              </p>
            </motion.div>
          </div>
          
          {/* Video Container - Cinematic Welcome Experience */}
          <div
            id="video-container"
            className="relative w-full aspect-video max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 bg-black group"
          >
            {!isPlaying ? (
              /* Capa do Vídeo - Player Personalizado */
              <button
                onClick={handlePlay}
                className="absolute inset-0 z-20 cursor-pointer w-full h-full border-none p-0 m-0 bg-transparent block outline-none"
              >
                {/* Thumbnail de Alta Fidelidade */}
                <img 
                  src="/assets/images/player/thumbnail.webp" 
                  alt="Assista o vídeo" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 bg-zinc-900"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay de Profundidade */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80" />
                <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%]" />

                {/* Botão de Play Customizado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-40">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 0px rgba(233,74,134,0)", 
                        "0 0 40px rgba(233,74,134,0.6)", 
                        "0 0 0px rgba(233,74,134,0)"
                      ] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-[#e94a86] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(233,74,134,0.4)] group-hover:scale-110 transition-all duration-500"
                  >
                    <Play className="text-white fill-white ml-2" size={40} />
                  </motion.div>

                  {/* Mensagem de Convite */}
                  <div className="text-center px-6 pointer-events-none">
                    <p className="text-[#e94a86] font-nova font-bold tracking-[0.2em] uppercase text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Nova Era
                    </p>
                    <p className="text-white text-lg md:text-xl font-light tracking-tight italic">
                      Prepare-se para dar <span className="font-bold">Origem</span> ao futuro. <br />
                      <span className="text-sm text-gray-400 not-italic">Clique para assistir.</span>
                    </p>
                  </div>
                </div>
              </button>
            ) : (
              /* Iframe do YouTube - Inserido apenas após o clique */
              <iframe
                className="absolute inset-0 w-full h-full z-30"
                src="https://www.youtube.com/embed/o8krIhR81eQ?autoplay=1&modestbranding=1&rel=0&si=3iXUEdVR2b9Zh2Rz&playsinline=1"
                title="Projeto Origem"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          {/* Conector Superior (Linha que nasce na base do vídeo) */}
          <div className="w-[1px] h-16 bg-[#e94a86] mx-auto shadow-[0_0_10px_rgba(233,74,134,0.5)]" />
        </section>

        {/* Hero Separador - O Masterplan da Transformação (Efeito Minimalista) */}
        <section className="w-full bg-[#0c0d10] py-20 md:py-40 relative flex items-center justify-center overflow-hidden border-y border-white/5">
          {/* Linha de Conexão Vertical */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-0" />
          
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              <span className="text-[#e94a86] text-[10px] font-bold tracking-[0.5em] uppercase mb-10 block">
                Visão Estratégica
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase leading-[0.85] mb-12">
                O Masterplan da <br /> 
                <span className="font-black italic text-white/90">Transformação</span>
              </h2>
              <div className="w-24 h-px bg-[#e94a86] mx-auto mb-12" />
              <p className="text-white/40 text-[10px] md:text-xs max-w-xl mx-auto font-bold leading-relaxed tracking-[0.3em] uppercase">
                Uma jornada estruturada para elevar o potencial criativo e tecnológico da nossa juventude.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="jornada" className="pt-0 pb-0 px-6 overflow-hidden relative z-20">
          <div className="max-w-7xl mx-auto relative">
            <div className="relative pt-0">
              {/* Infinite Timeline Line - Rosa e contínua */}
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#e94a86]/40 z-0" />
              
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={item.year} 
                  item={item} 
                  index={index} 
                  id={item.year === "Fase 03" ? "fase-03" : undefined}
                  isLast={index === timelineData.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tecnologia Section - Refined Grid */}
        <section id="tecnologia" className="py-16 md:py-40 px-6 bg-[#0c0d10] relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-32">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[#e94a86] text-[10px] font-bold tracking-[0.5em] uppercase mb-8 block"
              >
                Infraestrutura Técnica
              </motion.span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.85]">
                Tecnologia de <span className="font-black italic">Elite</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[2rem]">
              {[
                { title: "Sony ZV-E10", desc: "Cinema Line para captura de imagem com profundidade e cor cinematográfica.", icon: <Camera className="w-5 h-5" /> },
                { title: "Sigma Optics", desc: "Lentes de alta abertura para nitidez extrema e bokeh profissional.", icon: <Zap className="w-5 h-5" /> },
                { title: "Iluminação Cênica", desc: "Ecossistema de luz para criação de atmosferas e profundidade visual.", icon: <Star className="w-5 h-5" /> },
                { title: "Áudio Profissional", desc: "Captação cristalina para garantir a imersão sonora do espectador.", icon: <Users className="w-5 h-5" /> }
              ].map((prod, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-12 bg-[#0c0d10] hover:bg-white/[0.02] transition-all duration-500 group relative"
                >
                  <div className="text-[#e94a86] mb-10 group-hover:scale-110 transition-transform duration-500">
                    {prod.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-6 uppercase tracking-[0.2em]">{prod.title}</h3>
                  <p className="text-white/30 text-[10px] font-medium leading-relaxed tracking-widest uppercase">{prod.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Direção Técnica & Curadoria Section - Minimalist Card */}
        <section id="direcao-tecnica" className="py-16 md:py-32 px-6 flex flex-col items-center bg-[#0c0d10]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-4xl bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-16 overflow-hidden group"
          >
            <Link to="/studio" className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10 cursor-pointer">
              {/* Photo Column */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                  <img 
                    src="/assets/images/agente/imgagente1.jpg" 
                    alt="Diretor Técnico" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="flex-grow text-center md:text-left">
                <span className="text-[#e94a86] text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">
                  Agente Cultural & Direção Técnica
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase mb-6">
                  Studio <span className="font-black italic">Inspirar</span>
                </h2>
                <p className="text-white/50 text-sm md:text-base font-light leading-relaxed tracking-wide uppercase">
                  Proponente e estrategista responsável pela viabilização do Projeto Origem. Atua como mentor técnico, guiando os jovens no domínio de ferramentas cinematográficas e na preservação da memória cultural de Santo Augusto através do audiovisual.
                </p>
              </div>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-8 md:pt-12 pb-12 md:pb-16 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Footer de Autoridade / Logos do Edital */}
          <div className="mb-12 pb-12 border-b border-white/5">
            <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 md:gap-4">
              {authorityPartners.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center text-center group flex-1 min-w-[150px]">
                  {partner.isInternal ? (
                    <Link 
                      to={partner.url}
                      className="flex flex-col items-center"
                    >
                      <span className="text-sm font-bold tracking-[0.3em] mb-6 transition-all duration-300 group-hover:text-[#e94a86] group-hover:underline underline-offset-8 decoration-1">
                        {partner.name}
                      </span>
                      
                      {/* Logo Container */}
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-4 group-hover:bg-white/10 group-hover:border-[#e94a86]/50 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(233,74,134,0.2)] transition-all duration-500">
                        <img 
                          src={partner.logo} 
                          alt={`Logo ${partner.name}`}
                          className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </Link>
                  ) : (
                    <a 
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center"
                    >
                      <span className="text-sm font-bold tracking-[0.3em] mb-6 transition-all duration-300 group-hover:text-[#e94a86] group-hover:underline underline-offset-8 decoration-1">
                        {partner.name}
                      </span>
                      
                      {/* Logo Container */}
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-4 group-hover:bg-white/10 group-hover:border-[#e94a86]/50 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(233,74,134,0.2)] transition-all duration-500">
                        <img 
                          src={partner.logo} 
                          alt={`Logo ${partner.name}`}
                          className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </a>
                  )}
                  
                  <p className="mt-6 text-[10px] text-gray-300 font-light tracking-wider max-w-[140px]">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-2xl font-bold tracking-tighter uppercase">
              ORIGEM<span className="text-[#e94a86]">.</span>
            </div>
            <div className="flex gap-8 text-gray-500">
              <Instagram size={22} className="hover:text-white cursor-pointer transition-colors" />
              <Youtube size={22} className="hover:text-white cursor-pointer transition-colors" />
              <Globe size={22} className="hover:text-white cursor-pointer transition-colors" />
            </div>
            <p className="text-gray-600 text-xs tracking-[0.2em] uppercase font-medium">
              © 2026 Projeto Cultural Origem. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studio" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  );
}
