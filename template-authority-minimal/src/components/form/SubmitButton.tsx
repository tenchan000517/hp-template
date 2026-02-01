interface SubmitButtonProps {
  children: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function SubmitButton({
  children,
  disabled = false,
  loading = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="btn-submit"
    >
      {loading ? '送信中...' : children}
    </button>
  );
}
