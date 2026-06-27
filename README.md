# Scattergories-game

A real-time Scattergories game built with React, Node.js, Express, and Socket.io.

Play solo or compete with friends in multiplayer rooms. Each round generates a random letter, and players must quickly come up with answers for different categories before the timer runs out.

---

## Features

- Single-player mode
- Multiplayer mode with room creation and joining
- Random letter generation
- Countdown timer
- Multiple categories
- Automatic score calculation
- Multiple rounds
- Real-time gameplay using Socket.io

---

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Vite
- Socket.io Client

### Backend
- Node.js
- Express
- Socket.io

---

## Project Structure

```text
Scattergories-game/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Timer.jsx
│   │   ├── constants/
│   │   │   └── categories.js
│   │   ├── pages/
│   │   │   ├── HomePage/
│   │   │   │   └── HomePage.jsx
│   │   │   ├── WaitingRoomPage/
│   │   │   │   └── WaitingRoomPage.jsx
│   │   │   ├── GamePage/
│   │   │   │   └── GamePage.jsx
│   │   │   └── ResultPage/
│   │   │       └── ResultPage.jsx
│   │   ├── services/
│   │   │   └── socket.js
│   │   ├── utils/
│   │   │   ├── generateRandomLetter.js
│   │   │   └── scoreCalculator.js
│   │   ├── App.jsx
│   │   └── main.jsx
|   |   |__ App.css
|   |   |__ index.css
│   └── package.json
├── server/
   ├── server.js
   └── package.json
```

### `client/`
Contains the frontend of the application, built using React and Vite.

#### `src/`
Contains the source code of the frontend application.

##### `components/`
Contains reusable UI components.
- `Timer.jsx`
  - Implements the countdown timer used during gameplay.

##### `constants/`
Stores constant values used throughout the application.

- `categories.js`
  - Contains the list of categories used in each round.

##### `pages/`
Contains the main pages of the application.

###### `HomePage/`
Handles the landing page and provides options for single-player and multiplayer modes.
- `HomePage.jsx`
  - Allows users to start a game, create a room, or join an existing room.

###### `WaitingRoomPage/`
Manages the waiting room before the game starts.
- `WaitingRoomPage.jsx`
  - Displays the room code and waits for players to join.

###### `GamePage/`
Contains the core gameplay logic.
- `GamePage.jsx`
  - Handles the timer, answer collection, round management, and navigation to the results page.

###### `ResultPage/`
Displays the outcome of a round.
- `ResultPage.jsx`
  - Calculates scores and allows players to proceed to the next round.

##### `services/`
Contains modules responsible for communicating with external services.
- `socket.js`
  - Establishes and manages the Socket.io connection for real-time multiplayer communication.

##### `utils/`
Contains helper functions used across the project.

- `generateRandomLetter.js`
  - Generates a random letter for each round.
- `scoreCalculator.js`
  - Contains functions for calculating player scores.

##### Root Files
- `App.jsx`
  - Configures routing and connects all pages of the application.
- `main.jsx`
  - Entry point of the React application.
- `App.css`
  - Contains custom component-level styles that complement Tailwind CSS utilities.
- `index.css`
  - Imports Tailwind CSS and defines global styles applied throughout the application.

---

### `server/`
Contains the backend of the application, built using Node.js, Express, and Socket.io.

- `server.js`
  - Handles room creation, player connections, random letter generation, and synchronization between players.

- `package.json`
  - Defines backend dependencies and project metadata.

---

## Getting Started

### Clone the repository

```bash
git clone <repository_url>
```

### Install dependencies

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
npm install
npm run dev
```

---

## How to play 

1. Start a single-player game or create a room.
2. Invite another player to join.
3. A random letter is generated.
4. Fill in answers for each category before the timer ends.
5. Earn points for valid answers.
6. Continue for multiple rounds.

---

