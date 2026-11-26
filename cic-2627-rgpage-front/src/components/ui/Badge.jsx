/**
 * Badge — dept tag / eyebrow badge using .pref-tag CSS class
 * tier: 't1' | 't2' | 't3'
 * Usage: <Badge tier="t1">1st choice</Badge>
 */
export default function Badge({ children, tier = 't1', className = '' }) {
  return (
    <span className={`pref-tag ${tier} ${className}`}>{children}</span>
  );
}
