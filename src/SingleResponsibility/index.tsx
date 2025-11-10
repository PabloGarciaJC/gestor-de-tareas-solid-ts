import { useState } from "react";

interface Task {
  id: number;
  title: string;
  type: string;
}

const commonTasks: Task[] = [
  { id: 1, title: "Pintar la pared", type: "Paint" },
  { id: 2, title: "Limpiar el piso", type: "Clean" },
  { id: 3, title: "Cocinar la cena", type: "Cook" },
  { id: 4, title: "Pintar la puerta", type: "Paint" },
  { id: 5, title: "Limpiar ventanas", type: "Clean" },
];

const technicalTasks: Task[] = [
  { id: 1, title: "Guardar usuario en DB", type: "UserService" },
  { id: 2, title: "Enviar correo de confirmación", type: "EmailService" },
  { id: 3, title: "Generar reporte PDF", type: "ReportService" },
  { id: 4, title: "Validar formulario", type: "ValidationService" },
  { id: 5, title: "Procesar pago", type: "PaymentService" },
];

export const SingleResponsibility = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"common" | "technical" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(
    "Selecciona el responsable correcto para cada tarea según su tipo."
  );

  const startGame = (mode: "common" | "technical") => {
    setGameMode(mode);
    setIntro(false);
    setTasks(mode === "common" ? commonTasks : technicalTasks);
    setScore(0);
    setMessage(
      mode === "common"
        ? "Selecciona el responsable correcto para cada tarea según su tipo."
        : "Asigna cada tarea a la clase/servicio correcto según su responsabilidad."
    );
  };

  const handleAssign = (task: Task, responsible: string) => {
    if (task.type === responsible) {
      setScore(score + 1);
      setMessage(`✅ Correcto! "${task.title}" fue asignada correctamente.`);
    } else {
      setScore(score - 1);
      setMessage(`❌ Incorrecto! "${task.title}" no corresponde a este responsable.`);
    }
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleBack = () => {
    setIntro(true);
    setGameMode(null);
    setTasks([]);
    setScore(0);
    setMessage("Selecciona el responsable correcto para cada tarea según su tipo.");
  };

  if (intro) {
    return (
      <div className="srp-container">

        <h1 className="srp-title">Single Responsibility Principle (SRP)</h1>

        <div className="srp-description">
          <strong>SRP</strong> significa <strong>Single Responsibility Principle</strong>, o
          <strong> Principio de Responsabilidad Única</strong>.
        </div>

        <div className="srp-description">
          Este principio forma parte de los <strong>Principios SOLID</strong> de la programación orientada a objetos.
          Establece que <strong>cada clase, módulo o función debe encargarse de una sola responsabilidad</strong>.
          Si un componente hace más de una cosa, se vuelve difícil de mantener, probar y modificar sin romper algo.
        </div>

        <div className="srp-description">
          Para ayudarte a entender este concepto de forma sencilla, aquí tienes un <strong>juego interactivo</strong>.
          Tu objetivo es <strong>asignar cada tarea a su responsable correcto</strong>.
        </div>

        <h2 className="srp-subtitle">Selecciona cómo quieres aprender:</h2>

        <button className="srp-button" onClick={() => startGame("common")}>
          Actividades Cotidianas
        </button>

        <button className="srp-button" onClick={() => startGame("technical")}>
          Técnico
        </button>
      </div>
    );
  }


  const responsibleLabels =
    gameMode === "common"
      ? { Paint: "Pintor", Clean: "Personal de Limpieza", Cook: "Chef" }
      : {
        UserService: "UserService",
        EmailService: "EmailService",
        ReportService: "ReportService",
        ValidationService: "ValidationService",
        PaymentService: "PaymentService",
      };

  return (
    <div className="srp-container">
      <h1>Juego SRP - {gameMode === "common" ? "Usuario Común" : "Técnico"}</h1>
      <p><strong>Puntuación:</strong> {score}</p>
      <p>{message}</p>

      <h2>Tareas disponibles:</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <strong>{task.title}</strong>
            <div className="button-group">
              {gameMode === "common" ? (
                <>
                  <button className="srp-button" onClick={() => handleAssign(task, "Paint")}>Pintor</button>
                  <button className="srp-button" onClick={() => handleAssign(task, "Clean")}>Personal de Limpieza</button>
                  <button className="srp-button" onClick={() => handleAssign(task, "Cook")}>Chef</button>
                </>
              ) : (
                Object.keys(responsibleLabels).map((key) => (
                  <button key={key} className="srp-button" onClick={() => handleAssign(task, key)}>
                    {responsibleLabels[key as keyof typeof responsibleLabels]}
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="end-screen">
          <h3>¡Juego terminado!</h3>
          <p>Puntuación final: {score}</p>
        </div>
      )}

      <button className="srp-button back-button" onClick={handleBack}>
        Atrás
      </button>
    </div>
  );
};
