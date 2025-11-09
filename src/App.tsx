import { SingleResponsibilityPrinciple } from "./SingleResponsibilityPrinciple";
import { OpenClosedPrinciple } from "./OpenClosedPrinciple";
import { LiskovSubstitutionPrinciple } from "./LiskovSubstitutionPrinciple";
import { InterfaceSegregationPrinciple } from "./InterfaceSegregation";
import { Denendenevlnvercion } from "./Denendenevlnvercion";

function App() {
  return (
    <>
      <h1 className="solid-title-primary">Principios SOLID</h1>
      <div className="srp-grid">
        <SingleResponsibilityPrinciple />
        <OpenClosedPrinciple />
        <LiskovSubstitutionPrinciple />
        <InterfaceSegregationPrinciple />
        <Denendenevlnvercion />
      </div>
    </>
  );
}

export default App;
