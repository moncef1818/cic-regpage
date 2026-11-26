/**
 * Button — wraps .btn-cta and .btn-cta-ghost with variant prop
 * Usage: <Button variant="ghost" onClick={fn}>Label</Button>
 */
export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, className = '', ...rest }) {
  const cls = variant === 'ghost' ? 'btn-cta-ghost' : 'btn-cta';
  return (
    <button
      type={type}
      className={`${cls} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
