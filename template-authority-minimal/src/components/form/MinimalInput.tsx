interface MinimalInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export default function MinimalInput({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  error,
}: MinimalInputProps) {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="form-input mt-2"
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
