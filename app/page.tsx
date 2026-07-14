"use client";

import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Ronin Bike',
    description: 'Plataforma de e-commerce para ciclismo de alta gama con optimización SEO avanzada.',
    href: 'https://ronin-bike.vercel.app',
    tech: 'Next.js, TypeScript, Tailwind CSS, Stripe',
    accentColor: '#d97706',
    problema: 'Las plataformas de e-commerce de ciclismo suelen ser pesadas debido a la alta resolución de las imágenes, lo que destruye el rendimiento móvil y el posicionamiento en Google (SEO).',
    solucion: 'Desarrollé una arquitectura utilizando Next.js para renderizar el contenido desde el servidor (SSR), logrando una carga instantánea, optimizando imágenes dinámicamente y asegurando un flujo de pago con Stripe 100% seguro.'
  },
  {
    title: 'Urban Store',
    description: 'Tienda digital enfocada en indumentaria urbana y una experiencia de usuario fluida.',
    href: 'https://urban-store-xi.vercel.app',
    tech: 'React, Node.js, Express, MongoDB',
    accentColor: '#2563eb',
    problema: 'Las tiendas de ropa necesitan filtros rápidos por talle, color y categoría. En bases de datos mal optimizadas, cruzar estos datos ralentiza la carga y frustra la navegación.',
    solucion: 'Creé una SPA con React para navegación fluida y diseñé una API REST con Node.js y MongoDB, modelando los datos de forma no relacional para que los filtros de productos se resuelvan en milisegundos.'
  }
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Referencias para manejar el arrastre (Swipe / Drag)
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isOpen) {
      timerRef.current = setInterval(() => {
        setActiveIndex((current) => (current + 1) % projects.length);
      }, 10000);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 10000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
    resetTimer();
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
    resetTimer();
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    resetTimer();
  };

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const diffX = clientX - dragStartX.current;

    if (diffX > 80) {
      handlePrev();
      isDragging.current = false;
    } else if (diffX < -80) {
      handleNext();
      isDragging.current = false;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const emailAsunto = encodeURIComponent("Consulta sobre desarrollo web - AMsolutions");
  const emailCuerpo = encodeURIComponent("¡Hola Marcelo!\n\nMe pongo en contacto con vos para consultarte sobre un proyecto...\n\n[Escribí tu consulta acá]\n\nSaludos.");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=amsolutions.studio@gmail.com&su=${emailAsunto}&body=${emailCuerpo}`;

  const navLinkStyle = {
    fontSize: '13px',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    color: 'var(--text, #111111)',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease'
  };

  return (
    <div 
      className="portfolio-root" 
      style={{ 
        userSelect: 'none', 
        WebkitUserSelect: 'none',
        minHeight: '100vh',
        boxSizing: 'border-box',
        background: 'var(--bg-verde-salvia, #e2e8f0)', 
        color: 'var(--text, #111111)',
        padding: '40px 24px'
      }}
    >
      {/* ESTRUCTURA CONTENEDORA ORIGINAL RESTAURADA */}
      <main className="portfolio-shell" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* CABECERA */}
        <header className="intro-section" style={{ marginTop: '20px' }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'min(130px, 12vw)',
            fontWeight: '400',
            fontStyle: 'italic',
            letterSpacing: '-0.04em',
            marginBottom: '0px',
            lineHeight: '0.85',
            display: 'inline-block',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}>
            AMsolutions
          </h1>
          
          <p className="subtitle" style={{
            fontSize: '12px', 
            fontWeight: '400',
            textTransform: 'none',
            letterSpacing: '0.08em',
            marginBottom: '16px',
            marginTop: '12px',
            display: 'block'
          }}>
            Digital craft by Marcelo Hernán Moyano Crespo
          </p>

          <p className="lead-paragraph" style={{ marginTop: '0px', marginBottom: '24px', maxWidth: '600px', fontSize: '15px', lineHeight: '1.5' }}>
            Arquitectura web centrada en el rendimiento puro. Convertimos su visión en código sólido, eliminando la complejidad para que cada proyecto funcione sin fricción.
          </p>

          {/* NAVBAR INTEGRADO PERFECTAMENTE (SIN ROMPER NADA) */}
          <nav className="navbar" style={{ 
            position: 'relative', 
            width: '100%', 
            padding: '24px 0px', // padding lateral en 0 para pegar los textos al ras de la línea
            borderTop: '1px solid rgba(17, 17, 17, 0.1)', 
            borderBottom: '1px solid rgba(17, 17, 17, 0.1)', 
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '64px', 
            marginTop: '24px',
            boxSizing: 'border-box'
          }}>
            {/* Bloque Izquierdo */}
            <div className="navbar-links-left" style={{ display: 'flex', gap: '24px' }}>
              <a href="#about" className="navbar-link" style={navLinkStyle}>About me</a>
              <a href="#otros-proyectos" className="navbar-link" style={navLinkStyle}>Proyectos</a>
              <a href="#contacto" className="navbar-link" style={navLinkStyle}>Contacto</a>
            </div>

            {/* Bloque Derecho */}
            <div className="navbar-links-right" style={{ display: 'flex', gap: '24px' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="navbar-link" style={navLinkStyle}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="navbar-link" style={navLinkStyle}>LinkedIn</a>
            </div>
          </nav>
        </header>

        {/* SECCIÓN DE PROYECTOS DESTACADOS */}
        <section id="proyectos" className="projects-section" style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: '300',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Proyectos destacados
          </h2>

          <div style={{ position: 'relative', width: '100%' }}>
            
            {/* Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px', 
              width: '100%'
            }}>
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeIndex === index ? 'var(--text, #11)' : 'rgba(0, 0, 0, 0.15)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 0.3s, transform 0.3s',
                    transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)'
                  }}
                  title={`Ver proyecto ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Wrapper del slider */}
            <div className="slides-wrapper" style={{ minHeight: isOpen ? '650px' : '450px', transition: 'min-height 0.5s ease' }}>
              {projects.map((project, index) => (
                <div key={project.title} className={`project-card ${index === activeIndex ? 'active' : ''}`}>
                  <div className="card-link" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
                    
                    {/* Caja de Preview */}
                    <div 
                      className="preview-box" 
                      onMouseDown={(e) => handleDragStart(e.clientX)}
                      onMouseMove={(e) => handleDragMove(e.clientX)}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                      onTouchEnd={handleDragEnd}
                      style={{ 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        width: '100%', 
                        maxWidth: '520px', 
                        aspectRatio: '16 / 10', 
                        background: 'rgba(0, 0, 0, 0.04)', 
                        margin: '0 auto',
                        cursor: 'grab',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                      }}
                    >
                      <img 
                        src={`https://api.microlink.io?url=${encodeURIComponent(project.href)}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={project.title} 
                        className="preview-image"
                        loading="lazy"
                        draggable="false" 
                        style={{ 
                          borderRadius: '16px', 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          pointerEvents: 'none'
                        }}
                      />
                    </div>
                    
                    <div className="project-content" style={{ width: '100%', maxWidth: '520px', margin: '0 auto', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '24px', marginTop: '0', marginBottom: '8px' }}>{project.title}</h3>
                      <p className="description" style={{ color: 'rgba(0,0,0,0.7)', fontSize: '14px', marginBottom: '12px' }}>{project.description}</p>
                      
                      <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text, #111)',
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer',
                          padding: '4px 0',
                          textDecoration: 'underline',
                          marginBottom: '16px',
                          display: 'block'
                        }}
                      >
                        {isOpen ? 'Ocultar detalles técnicos ↑' : 'Ver detalles técnicos ↓'}
                      </button>

                      {/* Acordeón de detalles */}
                      <div style={{
                        maxHeight: isOpen ? '350px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s cubic-bezier(0, 1, 0, 1)',
                        fontSize: '13px',
                        color: 'var(--text, #111)',
                        background: 'rgba(0, 0, 0, 0.02)',
                        padding: isOpen ? '16px' : '0 16px',
                        borderRadius: '8px',
                        marginBottom: '16px'
                      }}>
                        <p style={{ marginBottom: '8px' }}><strong>El Desafío:</strong> {project.problema}</p>
                        <p style={{ marginBottom: '12px' }}><strong>La Solución:</strong> {project.solucion}</p>
                        <a 
                          href={project.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            background: '#111',
                            color: '#fff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                        >
                          Visitar Sitio Oficial
                        </a>
                      </div>

                      <div className="tech-tag" style={{ borderLeftColor: project.accentColor, borderLeftWidth: '2px', borderLeftStyle: 'solid', paddingLeft: '12px', marginTop: '12px' }}>
                        <span className="label" style={{ fontWeight: '600' }}>Stack:</span> {project.tech}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECCIÓN SOBRE MÍ */}
        <section id="about" style={{ padding: '48px 0', borderTop: '1px solid rgba(17, 17, 17, 0.1)', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: '300',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            Sobre mí
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Lado Izquierdo: Biografía */}
            <div style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text, #111)' }}>
              <p style={{ marginBottom: '16px' }}>
                ¡Hola! Soy <strong>Marcelo Hernán Moyano Crespo</strong>, el desarrollador detrás de AMsolutions. Me apasiona construir productos digitales que no solo se vean bien, sino que vuelen en rendimiento y usabilidad.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Mi enfoque combina una profunda dedicación a la optimización de código con un diseño limpio y funcional. Creo firmemente que un buen software es aquel que resuelve problemas complejos de forma imperceptible y agradable para el usuario.
              </p>
              <p>
                Cuando no estoy escribiendo código, estoy explorando nuevas arquitecturas, refinando interfaces de usuario, o buscando formas de exprimir cada milisegundo en la velocidad de carga de una página.
              </p>
            </div>

            {/* Lado Derecho: Tarjeta de Stack */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.02)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(17, 17, 17, 0.05)'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Core Tech Stack
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(17, 17, 17, 0.05)', paddingBottom: '8px' }}>
                  <strong>Frontend:</strong> <span style={{ textAlign: 'right' }}>React, Next.js, TypeScript</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(17, 17, 17, 0.05)', paddingBottom: '8px' }}>
                  <strong>Backend:</strong> <span style={{ textAlign: 'right' }}>Node.js, Express, REST APIs</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(17, 17, 17, 0.05)', paddingBottom: '8px' }}>
                  <strong>BBDD:</strong> <span style={{ textAlign: 'right' }}>MongoDB, PostgreSQL</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                  <strong>Herramientas:</strong> <span style={{ textAlign: 'right' }}>Git, Docker, Vercel, Stripe</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* GRILLA DE PRÓXIMOS LANZAMIENTOS */}
        <section id="otros-proyectos" style={{ padding: '48px 0', borderTop: '1px solid rgba(17, 17, 17, 0.1)', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: '300',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            Próximos lanzamientos
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            <div className="placeholder-card" style={{
              border: '1px dashed rgba(17, 17, 17, 0.2)',
              borderRadius: '16px',
              aspectRatio: '1 / 1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.01)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, border-color 0.4s ease',
              cursor: 'default'
            }}>
              <span style={{ fontSize: '24px', fontWeight: '200', color: 'rgba(0, 0, 0, 0.3)', marginBottom: '12px' }}>+</span>
              <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0', color: 'rgba(0,0,0,0.8)' }}>Proyecto Beta</h4>
              <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>Desarrollo de microservicios en proceso</p>
            </div>

            <div className="placeholder-card" style={{
              border: '1px dashed rgba(17, 17, 17, 0.2)',
              borderRadius: '16px',
              aspectRatio: '1 / 1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.01)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, border-color 0.4s ease',
              cursor: 'default'
            }}>
              <span style={{ fontSize: '24px', fontWeight: '200', color: 'rgba(0, 0, 0, 0.3)', marginBottom: '12px' }}>+</span>
              <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0', color: 'rgba(0,0,0,0.8)' }}>SaaS Platform</h4>
              <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>Planteo de arquitectura e integraciones</p>
            </div>

            <div className="placeholder-card" style={{
              border: '1px dashed rgba(17, 17, 17, 0.2)',
              borderRadius: '16px',
              aspectRatio: '1 / 1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.01)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, border-color 0.4s ease',
              cursor: 'default'
            }}>
              <span style={{ fontSize: '24px', fontWeight: '200', color: 'rgba(0, 0, 0, 0.3)', marginBottom: '12px' }}>+</span>
              <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0', color: 'rgba(0,0,0,0.8)' }}>Mobile App</h4>
              <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>Diseño de UI e interacciones nativas</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contacto" style={{ 
          marginTop: '80px', 
          paddingTop: '32px', 
          borderTop: '1px solid rgba(17, 17, 17, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          width: '100%'
        }}>
          {/* Fila del Mail */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>¿Tenés una idea o proyecto en mente?</p>
              <a 
                href={gmailUrl}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--text, #111)', 
                  textDecoration: 'underline',
                  marginTop: '4px',
                  display: 'inline-block',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                amsolutions.studio@gmail.com
              </a>
            </div>
          </div>

          {/* Fila inferior */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '12px', 
            color: 'rgba(0,0,0,0.5)', 
            borderTop: '1px solid rgba(0,0,0,0.05)', 
            paddingTop: '16px',
            width: '100%'
          }}>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} — Córdoba, Argentina
            </p>
            <p style={{ margin: 0 }}>
              Designed & Crafted by MHMC
            </p>
          </div>
        </footer>
      </main>

      {/* BOTÓN FLOTANTE */}
      <button 
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'var(--text, #111)',
          color: 'var(--bg-verde-salvia, #e2e8f0)',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? 'visible' : 'hidden',
          transform: showScrollTop ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          fontSize: '18px',
          fontWeight: '500',
          zIndex: 99
        }}
        title="Volver arriba"
      >
        ↑
      </button>

    </div>
  );
}