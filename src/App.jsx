import { useEffect, useMemo, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import gardenBackground from './assets/hero-garden.webp';
import heartRose from './assets/heart-rose.webp';
import './styles.css';

function HeartMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 38 42" aria-hidden="true">
      <path d="M19 38 5.6 24.8C-1 18.2 3.1 7.4 11 7.4c3.4 0 6.2 1.8 8 4.7 1.8-2.9 4.6-4.7 8-4.7 7.9 0 12 10.8 5.4 17.4L19 38Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M19 32.7 8.7 22.6c-4.4-4.4-1.8-11.1 3.2-11.1 3 0 5.4 2.5 7.1 5.3 1.7-2.8 4.1-5.3 7.1-5.3 5 0 7.6 6.7 3.2 11.1L19 32.7Z" fill="currentColor" opacity=".18" />
    </svg>
  );
}

function ShareGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="m8.1 10.8 7.7-4.5M8.1 13.2l7.7 4.5" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function Dialog({ dialogRef, onClose, children, className, label }) {
  const closeOnBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`story-dialog ${className}`}
      aria-label={label}
      onClose={onClose}
      onClick={closeOnBackdrop}
    >
      {children}
    </dialog>
  );
}

export default function App() {
  const letterDialog = useRef(null);
  const shareDialog = useRef(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${window.location.pathname}`;
  }, []);

  useEffect(() => {
    const dialog = letterDialog.current;
    if (!dialog) return;
    if (letterOpen && !dialog.open) dialog.showModal();
    if (!letterOpen && dialog.open) dialog.close();
  }, [letterOpen]);

  useEffect(() => {
    const dialog = shareDialog.current;
    if (!dialog) return;
    if (shareOpen && !dialog.open) dialog.showModal();
    if (!shareOpen && dialog.open) dialog.close();
  }, [shareOpen]);

  useEffect(() => {
    document.body.classList.toggle('has-open-dialog', letterOpen || shareOpen);
    return () => document.body.classList.remove('has-open-dialog');
  }, [letterOpen, shareOpen]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const temporaryInput = document.createElement('textarea');
      temporaryInput.value = shareUrl;
      temporaryInput.setAttribute('readonly', '');
      temporaryInput.style.position = 'fixed';
      temporaryInput.style.opacity = '0';
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand('copy');
      temporaryInput.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="page-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Para Taji, volver al inicio">
          <HeartMark className="brand__heart" />
          <span>Para Taji</span>
          <span className="brand__thread" aria-hidden="true" />
        </a>
        <button className="share-trigger" type="button" onClick={() => setShareOpen(true)}>
          <span>Compartir</span>
          <ShareGlyph />
        </button>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title" style={{ '--hero-image': `url("${gardenBackground}")` }}>
          <div className="hero__moon" aria-hidden="true" />
          <div className="hero__horizon" aria-hidden="true" />
          <div className="hero__copy">
            <h1 id="hero-title">Taji, eres la mujer más increíble que he conocido.</h1>
            <div className="heart-flourish" aria-hidden="true">
              <span />
              <HeartMark />
            </div>
            <p>Esta pequeña noche está hecha solo para ti.</p>
            <button className="primary-button" type="button" onClick={() => setLetterOpen(true)}>
              Abrir mi dedicatoria
              <span className="button-star" aria-hidden="true">✧</span>
            </button>
          </div>
          <div className="hero__art" aria-hidden="true">
            <img src={heartRose} alt="" />
          </div>
          <span className="hero__spark hero__spark--one" aria-hidden="true">✦</span>
          <span className="hero__spark hero__spark--two" aria-hidden="true">✧</span>
          <span className="hero__spark hero__spark--three" aria-hidden="true">·</span>
          <a className="scroll-cue" href="#siempre" aria-label="Bajar a la última nota">
            <span />
          </a>
        </section>

        <section className="closing-note" id="siempre" aria-labelledby="closing-title">
          <div className="paper closing-note__paper">
            <div className="closing-note__content">
              <div className="closing-note__rule" aria-hidden="true"><span>♥</span></div>
              <p className="closing-note__line">Por si alguna noche lo olvidas:</p>
              <h2 id="closing-title">el mundo es más bonito porque tú estás en él.</h2>
              <button className="text-button" type="button" onClick={() => setShareOpen(true)}>
                Guarda esta dedicatoria <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Hecho con cariño, para ti.</span>
        <HeartMark className="footer-heart" />
      </footer>

      <Dialog
        dialogRef={letterDialog}
        className="letter-dialog"
        label="Dedicatoria para Taji"
        onClose={() => setLetterOpen(false)}
      >
        <article className="paper letter-paper" aria-labelledby="letter-title">
          <button className="dialog-close" type="button" onClick={() => setLetterOpen(false)} aria-label="Cerrar dedicatoria">
            <CloseGlyph />
          </button>
          <div className="letter-copy">
            <h2 id="letter-title">Hay personas que hacen que el mundo se sienta menos oscuro.</h2>
            <p>
              Taji, quería dejarte estas palabras para que nunca olvides lo especial que eres.
              Eres la mujer más increíble que he conocido: tu forma de mirar, de reír y de estar
              en el mundo convierte cualquier día en algo mejor. Gracias por ser tú.
            </p>
            <p className="letter-signoff">Con todo mi cariño <HeartMark /></p>
          </div>
          <span className="letter-paper__seal" aria-hidden="true">♥</span>
        </article>
      </Dialog>

      <Dialog
        dialogRef={shareDialog}
        className="share-dialog"
        label="Compartir dedicatoria"
        onClose={() => setShareOpen(false)}
      >
        <section className="paper share-paper" aria-labelledby="share-title">
          <button className="dialog-close" type="button" onClick={() => setShareOpen(false)} aria-label="Cerrar compartir">
            <CloseGlyph />
          </button>
          <div className="share-content">
            <HeartMark className="share-content__heart" />
            <h2 id="share-title">Guarda esta dedicatoria</h2>
            <p>Escanea el código para volver a ella.</p>
            <div className="qr-heart-frame" aria-label="Código QR con silueta de corazón">
              <div className="qr-heart-frame__shape">
                <div className="qr-code">
                  <QRCodeSVG
                    value={shareUrl}
                    size={218}
                    level="H"
                    bgColor="#fffdf7"
                    fgColor="#191516"
                    includeMargin
                    title="Escanea para abrir la dedicatoria para Taji"
                  />
                </div>
              </div>
              <svg className="qr-heart-frame__outline" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M50 96C43 89 0 58 0 28 0 12 11 0 25 0c8 0 17 3 25 8 8-5 17-8 25-8 14 0 25 12 25 28 0 30-43 61-50 68Z" />
              </svg>
            </div>
            <button className="primary-button copy-button" type="button" onClick={copyLink}>
              <span aria-hidden="true">↗</span>
              {copied ? 'Enlace copiado' : 'Copiar enlace'}
            </button>
            <span className="visually-hidden" aria-live="polite">{copied ? 'Enlace copiado al portapapeles' : ''}</span>
          </div>
        </section>
      </Dialog>
    </div>
  );
}
