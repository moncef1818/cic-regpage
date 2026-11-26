/**
 * Input — styled input / select / textarea matching base.css form field styles.
 * as: 'input' | 'select' | 'textarea'
 * Usage: <Input as="select" value={v} onChange={fn} error={errors.field} />
 */
export default function Input({
  as: Tag = 'input',
  error = false,
  className = '',
  children,
  rows,
  ...rest
}) {
  const errCls = error ? 'err' : '';
  const tagProps = Tag === 'textarea' ? { rows: rows || 4 } : {};
  return (
    <Tag className={`${errCls} ${className}`} {...tagProps} {...rest}>
      {children}
    </Tag>
  );
}
