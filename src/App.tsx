import { SingleResponsibility } from "./SingleResponsibility";
import { OpenClosed } from "./OpenClosed";
import { LiskovSubstitution } from "./LiskovSubstitution";
import { InterfaceSegregation } from "./InterfaceSegregation";
import { Denendenevlnvercion } from "./Denendenevlnvercion";

function App() {
  return (
    <>
      <h1 className="solid-title-primary">Principios SOLID</h1>
      <p className="srp-description-title">
        SOLID es un conjunto de cinco principios de diseño de software que ayudan a crear sistemas más mantenibles, escalables y fáciles de entender.
        Cada principio (SRP, OCP, LSP, ISP y DIP) se enfoca en mejorar la organización y responsabilidad del código.
      </p>
      <div className="srp-grid">
        <SingleResponsibility />
        <OpenClosed />
        <LiskovSubstitution />
        <InterfaceSegregation />
        <Denendenevlnvercion />
      </div>
    </>
  );
}

export default App;
