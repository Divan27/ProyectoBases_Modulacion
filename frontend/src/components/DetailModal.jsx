import { X } from 'lucide-react';

function DetailModal({ open, title, subtitle, onClose, children, footer }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <div className="modal-header">
          <div>
            <p className="section-kicker">DETALLE DEL REGISTRO</p>
            <h2 id="detail-title">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar ventana"><X size={22} /></button>
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </section>
    </div>
  );
}

export function DetailGrid({ items }) {
  return (
    <dl className="detail-grid">
      {items.map(({ label, value, wide, link }) => (
        <div key={label} className={wide ? 'detail-item wide' : 'detail-item'}>
          <dt>{label}</dt>
          <dd>{link ? <a href={link} target="_blank" rel="noreferrer">{value}</a> : (value ?? '—')}</dd>
        </div>
      ))}
    </dl>
  );
}

export default DetailModal;
