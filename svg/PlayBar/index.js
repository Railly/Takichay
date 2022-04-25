export default function PlayBar({ width, className }) {
  return (
    <svg
      className={className}
      fill="none"
      height={1}
      width={width}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0 0 L100 0 L100 100 L0 100 L0 0" />
    </svg>
  );
}
