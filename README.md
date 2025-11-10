# SOLID Playground (React + Vite + TS)

Este proyecto está orientado a comprender y aplicar los **principios SOLID**, una guía de buenas prácticas para escribir código más limpio, mantenible y escalable. Cada tarjeta de la aplicación representa uno de los principios

---

## Demo del Proyecto

[https://solid-playground-vite-react-ts.com/](https://solid-playground-vite-react-ts.pablogarciajc.com/)

| ![Imagen 1](https://pablogarciajc.com/wp-content/uploads/2025/11/solid-playground-vite-react-ts-1.webp) | ![Imagen 2](https://pablogarciajc.com/wp-content/uploads/2025/11/solid-playground-vite-react-ts-2.webp) |
|-----------|-----------|

## Áreas de Estudio

Este proyecto es tu primer acercamiento práctico a **React** usando **Vite**, diseñado para aprender conceptos esenciales mientras construyes un proyecto funcional:

**S — Single Responsibility Principle (SRP)**
Cada clase o módulo debe tener **una única responsabilidad**.  
Es decir, debe existir por **un solo motivo para cambiar**.  
En el proyecto se muestra cómo separar modelo, servicio, lógica y UI.

**O — Open/Closed Principle (OCP)**
Las clases deben estar **abiertas para extensión** pero **cerradas para modificación**.  
El código se puede extender con nuevas funcionalidades **sin cambiar lo ya existente**.

**L — Liskov Substitution Principle (LSP)**
Las clases derivadas deben poder **sustituir** a sus clases base **sin alterar el comportamiento del sistema**.  
Si una subclase rompe el funcionamiento esperado, no cumple LSP.

**I — Interface Segregation Principle (ISP)**
No se deben forzar clases a implementar **métodos que no usan**.  
Es mejor crear **interfaces pequeñas y específicas**, no una grande y general.

**D — Dependency Inversion Principle (DIP)**
Las clases de alto nivel no deben depender de implementaciones concretas,  
sino de **abstracciones (interfaces)**.  
Esto permite intercambiar comportamientos sin cambiar el código principal.

## Instalación

### Requisitos Previos

- Tener **Docker** y **Docker Compose** instalados.
- **Make**: Utilizado para automatizar procesos y gestionar contenedores de manera más eficiente.

### Pasos de Instalación

1. Clona el repositorio desde GitHub.
2. Dentro del repositorio, encontrarás un archivo **Makefile** que contiene los comandos necesarios para iniciar y gestionar tu aplicación.
3. Usa los siguientes comandos de **Make** para interactuar con la aplicación:

    - **`make init-app`**: Inicializa la aplicación, copiando `.env`, creando symlinks, levantando contenedores, instalando dependencias y levantando el servidor de desarrollo.  
    - **`make up`**: Levanta los contenedores asociados a la aplicación en segundo plano.  
    - **`make down`**: Detiene los contenedores y apaga la aplicación.  
    - **`make shell`**: Ingresa al contenedor para interactuar directamente con el sistema.  
    - **`make npm-install`**: Instala todas las dependencias definidas en `package.json`.  
    - **`make npm-host`**: Levanta el servidor de desarrollo (`npm run dev`) accesible desde tu máquina local.  
    - **`make build-prod`**: Genera la versión de producción de la aplicación (`npm run build`) y mueve los archivos compilados a la raíz del proyecto.  

4. Además de estos comandos, dentro del archivo **Makefile** puedes encontrar otros comandos que te permitirán interactuar de manera más específica con los contenedores y los diferentes servicios que conforman la aplicación.

5. Accede a los siguientes URL:
   - **Aplicación Web**: [http://localhost:5173](http://localhost:5173)

---

## Contáctame / Sígueme en mis redes sociales

| Red Social   | Descripción                                              | Enlace                   |
|--------------|----------------------------------------------------------|--------------------------|
| **Facebook** | Conéctate y mantente al tanto de mis actualizaciones.    | [Presiona aquí](https://www.facebook.com/PabloGarciaJC) |
| **YouTube**  | Fundamentos de la programación, tutoriales y noticias.   | [Presiona aquí](https://www.youtube.com/@pablogarciajc)     |
| **Página Web** | Más información sobre mis proyectos y servicios.        | [Presiona aquí](https://pablogarciajc.com/)              |
| **LinkedIn** | Sigue mi carrera profesional y establece conexiones.     | [Presiona aquí](https://www.linkedin.com/in/pablogarciajc) |
| **Instagram**| Fotos, proyectos y contenido relacionado.                 | [Presiona aquí](https://www.instagram.com/pablogarciajc) |
| **Twitter**  | Proyectos, pensamientos y actualizaciones.                | [Presiona aquí](https://x.com/PabloGarciaJC?t=lct1gxvE8DkqAr8dgxrHIw&s=09)   |

---
> _"El buen manejo de tus finanzas hoy construye la seguridad del mañana."_
