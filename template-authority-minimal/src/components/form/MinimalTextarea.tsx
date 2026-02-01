interface MinimalTextareaProps {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  error?: string;
}

export default function MinimalTextarea({
  label,
  name,
  required = false,
  rows = 6,
  placeholder,
  error,
}: MinimalTextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="form-textarea mt-2"
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
