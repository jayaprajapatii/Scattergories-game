import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();
  function startSinglePlayerGame() {

  navigate("/category-selection");

}

  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");

  async function createRoom() {

    const response = await fetch(
      "http://localhost:5000/api/create-room",
      {
        method: "POST",
      }
    );

    const data = await response.json();

    setRoomCode(data.roomCode);

    navigate("/waiting", {
      state: {
        roomCode: data.roomCode,
      },
    });

  }

  async function joinRoom() {

    try {

      const response = await fetch(
        "http://localhost:5000/api/join-room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomCode: joinCode,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        navigate("/waiting", {
          state: {
            roomCode: joinCode,
          },
        });

      } else {

        alert("Room not found!");

      }

    } catch {

      alert("Something went wrong!");

    }

  }

  return (

    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold mb-12">
        Scattergories
      </h1>

      <button

        onClick={startSinglePlayerGame}

        className="
        bg-blue-500
        hover:bg-blue-600
        px-8
        py-3
        rounded-lg
        text-lg
        mb-6
        "
      >

  Start Game

</button>

      <button
        onClick={createRoom}
        className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-lg text-lg mb-6"
      >
        Create Room
      </button>

      <input
        type="text"
        placeholder="Enter Room Code"
        value={joinCode}
        onChange={(e) =>
          setJoinCode(
            e.target.value.toUpperCase()
          )
        }
        className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 mb-4"
      />

      <button
        onClick={joinRoom}
        className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg text-lg"
      >
        Join Room
      </button>

      {roomCode && (

        <div className="mt-8 text-2xl text-yellow-400">

          Room Code : {roomCode}

        </div>

      )}

    </div>

  );

}

export default HomePage;