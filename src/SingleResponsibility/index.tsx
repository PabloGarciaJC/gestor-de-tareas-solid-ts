import { useState } from "react";

interface Task {
  id: number;
  title: string;
  type: string; // tipo usado solo para la lógica
}

// Tareas comunes para usuario no técnico
const commonTasks: Task[] = [
  { id: 1, title: "Pintar la pared", type: "Paint" },
  { id: 2, title: "Limpiar el piso", type: "Clean" },
  { id: 3, title: "Cocinar la cena", type: "Cook" },
  { id: 4, title: "Pintar la puerta", type: "Paint" },
  { id: 5, title: "Limpiar ventanas", type: "Clean" },
];

// Tareas técnicas para usuario técnico
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
        <h1>Bienvenido al Juego SRP</h1>
        <p>
          Este juego te enseña el <strong>Single Responsibility Principle (SRP)</strong>.
        </p>
        <p>Elige tu modalidad:</p>
        <button onClick={() => startGame("common")}>Modo Usuario Común</button>
        <button onClick={() => startGame("technical")}>Modo Técnico</button>
      </div>
    );
  }

  // Determinar responsables según modalidad
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
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              padding: "10px 15px",
              border: "1px solid #333",
              borderRadius: 5,
              cursor: "pointer",
              minWidth: 200,
            }}
          >
            <strong>{task.title}</strong>
            <div
              style={{
                marginTop: 5,
                display: "flex",
                gap: 5,
                flexWrap: "wrap", // <-- Grid-like layout
              }}
            >
              {gameMode === "common" ? (
                <>
                  <button onClick={() => handleAssign(task, "Paint")}>Pintor</button>
                  <button onClick={() => handleAssign(task, "Clean")}>Personal de Limpieza</button>
                  <button onClick={() => handleAssign(task, "Cook")}>Chef</button>
                </>
              ) : (
                Object.keys(responsibleLabels).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleAssign(task, key)}
                  >
                    {responsibleLabels[key as keyof typeof responsibleLabels]}
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>¡Juego terminado!</h3>
          <p>Puntuación final: {score}</p>
        </div>
      )}

      <button style={{ marginTop: 20 }} onClick={handleBack}>
        Atrás
      </button>
    </div>
  );
};
