export default function Play(props) {
  const playColor = props.playcolor || "#fff";
  const playBackgroundColor = props.playbackgroundcolor || "#10B981";
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill={playColor} d="M6 6h13v11H6z" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
        fill={playBackgroundColor}
      />
    </svg>
  );
}
