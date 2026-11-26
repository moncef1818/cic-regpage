/**
 * Card — generic card shell using .dept-card CSS styles
 * Usage: <Card onClick={fn}>{children}</Card>
 */
export default function Card({ children, onClick, className = '', style }) {
  return (
    <div
      className={`dept-card ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
