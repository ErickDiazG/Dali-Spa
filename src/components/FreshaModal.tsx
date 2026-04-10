import React, { useEffect } from 'react';
import { X, CalendarDays, ExternalLink } from 'lucide-react';

interface FreshaModalProps {
  url: string | null;
  onClose: () => void;
}

const FreshaModal: React.FC<FreshaModalProps> = ({ url, onClose }) => {

  // Bloquear el scroll del cuerpo cuando el modal está abierto
  useEffect(() => {
    if (url) {
      document.body.style.overflow = 'hidden';
      // Abrir Fresha automáticamente en nueva pestaña al llamar el modal
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [url]);

  if (!url) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[var(--cream)] w-full max-w-sm shadow-2xl overflow-hidden rounded-2xl p-8 flex flex-col items-center text-center gap-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[var(--text-muted)] hover:text-burgundy transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center">
          <CalendarDays size={28} className="text-burgundy" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-serif tracking-widest text-[var(--navy)]">
            Agenda Abierta
          </h3>
          <p className="text-xs font-sans text-[var(--text-muted)] tracking-wide leading-relaxed">
            Tu agenda de reserva de Dali Spa se ha abierto en una nueva pestaña. 
            Completa tu cita ahí y vuelve aquí cuando quieras.
          </p>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-burgundy hover:bg-burgundy/90 text-white py-3.5 text-[10px] tracking-[0.2em] font-sans font-semibold uppercase flex items-center justify-center gap-2 rounded-sm transition-colors shadow-lg shadow-[var(--burgundy)]/20"
          >
            <ExternalLink size={14} />
            Abrir Agenda Nuevamente
          </a>
          <button
            onClick={onClose}
            className="w-full text-[var(--text-muted)] font-sans text-[10px] tracking-widest uppercase py-2 hover:text-[var(--text)] transition-colors"
          >
            Seguir Explorando
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreshaModal;
