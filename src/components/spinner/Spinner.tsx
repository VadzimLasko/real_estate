import "./spinner.css";

export default function Spinner() {
  return (
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export const GeneralSpinner = () => {
  return <div className="wrapper">{<Spinner />}</div>;
};
