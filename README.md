# 🧩 Sudoku Profesional - React Project

¡Bienvenido al repositorio de mi juego de Sudoku! Este proyecto fue desarrollado utilizando **React 19** y empaquetado con **Vite**. 

 Demuestra el uso correcto de la arquitectura de componentes y hooks de React.

---

## 🚀 Características del Juego
*   **Diseño Hacker/Cyberpunk:** Interfaz oscura con tonos verde neón y fuentes monoespaciadas.
*   **Cronómetro en vivo:** Registra el tiempo de juego de forma reactiva.
*   **Sistema de Pistas:** El juego rellena una celda vacía al azar con la solución correcta.
*   **Autocompletado:** Resuelve el tablero completo de forma instantánea.
*   **Finalizar Juego:** Detiene el tiempo y bloquea el tablero para dar por terminada la partida.
*   **Nuevo Juego:** Reinicia el tablero y el reloj a cero.

## 🛠️ Conceptos de React Aplicados
Para demostrar el uso real de React frente a JavaScript tradicional (manipulación del DOM), se aplicaron los siguientes conceptos:
*   **`useState`:** Utilizado para manejar el estado del tablero (9x9), el tiempo en segundos y el estado de fin de juego.
*   **`useEffect`:** Utilizado para gestionar el ciclo de vida del temporizador sin generar fugas de memoria o bucles infinitos de renderizado.
*   **Renderizado de Listas:** Uso del método `.map()` sobre arreglos bidimensionales para renderizar dinámicamente las celdas en una cuadrícula CSS Grid.
*   **Inmutabilidad:** Las actualizaciones de estado se hacen creando copias de los arreglos originales (`map` y propagación), como dictan las buenas prácticas de React.

---

## 📦 Cómo ejecutar el proyecto localmente

Si deseas descargar el proyecto y correrlo en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lucy-nube/Proyect-Reactjs.git
   ```
2. **Entrar a la carpeta:**
   ```bash
   cd Proyect-Reactjs
   ```
3. **Instalar dependencias:**
   ```bash
   npm install
   ```
4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
5. Abre la dirección que te indique la terminal (normalmente `http://localhost:5173`).

---

## 🌐 Despliegue (GitHub Pages)
El proyecto cuenta con dos ramas principales:
*   **`main`**: Contiene este código fuente legible, estructurado y listo para evaluar.
*   **`gh-pages`**: Contiene los archivos de distribución compilados (`dist`) que sirven para visualizar el juego en vivo.

👉 **Puedes jugar en vivo aquí:** [https://github.io](https://github.io)
