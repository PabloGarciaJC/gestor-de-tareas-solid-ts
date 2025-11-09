import { SingleResponsibilityPrinciple } from "./SingleResponsibilityPrinciple";
import { OpenClosedPrinciple } from "./OpenClosedPrinciple";

function App() {
  return (
    <>
      <h1 className="solid-title-primary">Principios SOLID</h1>
      <div className="srp-grid">
        <SingleResponsibilityPrinciple />
        <OpenClosedPrinciple />
      </div>
    </>
  );
}

export default App;
