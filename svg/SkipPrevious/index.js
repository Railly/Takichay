export default function SkipPrevious(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      width={24}
      fill="#FFF"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z" />
    </svg>
  );
}
