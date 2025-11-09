import { useEffect, useState } from "react";

/* ================= Dependency Inversion Principle (DIP) ================= */

/* ------------------ (1) INTERFACES ------------------
   Definimos abstracciones para enviar mensajes
-------------------------------------------------- */
interface MessageSender {
  send(message: string): void;
}

/* ------------------ (2) IMPLEMENTACIONES ------------------
   Clases concretas que implementan la interfaz
-------------------------------------------------- */
class EmailSender implements MessageSender {
  send(message: string) {
    console.log("Enviando email:", message);
  }
}

class SmsSender implements MessageSender {
  send(message: string) {
    console.log("Enviando SMS:", message);
  }
}

/* ------------------ (3) LÓGICA ------------------
   Clase de alto nivel depende de la abstracción MessageSender
-------------------------------------------------- */
class NotificationManager {
  private sender: MessageSender;

  constructor(sender: MessageSender) {
    this.sender = sender;
  }

  notify(message: string) {
    this.sender.send(message);
  }
}

/* ------------------ (4) UI ------------------
   Solo presenta la interfaz y permite enviar mensajes
-------------------------------------------------- */
export const Denendenevlnvercion = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const sendNotification = (sender: MessageSender, message: string) => {
    const manager = new NotificationManager(sender);
    manager.notify(message);
    setNotifications([...notifications, message]);
  };

  return (
    <div className="srp-container">
      <h1 className="srp-title">Dependency Inversion Principle (DIP)</h1>

      <p className="srp-description">
        <strong>Idea clave:</strong> Las clases de alto nivel no deben depender de clases de bajo nivel, sino de abstracciones.
      </p>

      <ul className="srp-explain-list">
        <li>
          <strong>MessageSender</strong> es la abstracción (interfaz).
        </li>
        <li>
          <strong>EmailSender</strong> y <strong>SmsSender</strong> implementan la abstracción.
        </li>
        <li>
          <strong>NotificationManager</strong> depende de la abstracción, no de la implementación.
        </li>
        <li>
          <strong>UI</strong> permite enviar mensajes y ver historial.
        </li>
      </ul>

      <h2 className="srp-subtitle">Enviar notificaciones</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button
          className="srp-delete-btn"
          onClick={() => sendNotification(new EmailSender(), "Mensaje por Email")}
        >
          Enviar Email
        </button>
        <button
          className="srp-delete-btn"
          onClick={() => sendNotification(new SmsSender(), "Mensaje por SMS")}
        >
          Enviar SMS
        </button>
      </div>

      <ul className="srp-task-list">
        {notifications.map((msg, index) => (
          <li key={index} className="srp-task-item">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};
