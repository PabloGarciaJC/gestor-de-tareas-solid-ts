import { SingleResponsibilityPrinciple } from "./SingleResponsibilityPrinciple";

function App() {
  return (
    <>
      <h1 className="solid-title-primary">Principios SOLID</h1>
      <div className="srp-grid">
        <SingleResponsibilityPrinciple />
        <SingleResponsibilityPrinciple />
      </div>
    </>
  );
}

export default App;
