interface MinimalSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export default function MinimalSelect({
  label,
  name,
  options,
  required = false,
}: MinimalSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <select id={name} name={name} required={required} className="form-input mt-2">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
