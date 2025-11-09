import { SingleResponsibility } from "./SingleResponsibility";
import { OpenClosed } from "./OpenClosed";
import { LiskovSubstitution } from "./LiskovSubstitution";
import { InterfaceSegregationPrinciple } from "./InterfaceSegregation";
import { Denendenevlnvercion } from "./Denendenevlnvercion";

function App() {
  return (
    <>
      <h1 className="solid-title-primary">Principios SOLID</h1>
      <div className="srp-grid">
        <SingleResponsibility />
        <OpenClosed />
        <LiskovSubstitution />
        <InterfaceSegregationPrinciple />
        <Denendenevlnvercion />
      </div>
    </>
  );
}

export default App;
