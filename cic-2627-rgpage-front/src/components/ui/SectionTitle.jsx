/**
 * SectionTitle — eyebrow label + h2 heading combo
 * Usage: <SectionTitle eyebrow="Departments" title="Where will you contribute?" />
 */
export default function SectionTitle({ eyebrow, title, as: Tag = 'h2', style, className = '' }) {
  return (
    <div className={`section-head ${className}`} style={style}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <Tag className="section-title">{title}</Tag>
    </div>
  );
}
