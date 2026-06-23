import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../../services/socket";

function WaitingRoomPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const roomCode = location.state?.roomCode;

  const [playerCount, setPlayerCount] = useState(1);

  useEffect(() => {

    socket.emit("join-room", roomCode);

    socket.on("player-count", (count) => {

      setPlayerCount(count);

    });

    socket.on("start-game", (data) => {

      navigate("/game", {
        state: {
          roomCode,
          letter: data.letter,
          round: data.round,
        },
      });

    });

    return () => {

      socket.off("player-count");
      socket.off("start-game");

    };

  }, []);

  return (

    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center">

      <h1 className="text-5xl font-bold mb-8">
        Waiting Room
      </h1>

      <h2 className="text-3xl mb-4">
        Room Code : {roomCode}
      </h2>

      <h2 className="text-2xl text-green-400">
        Players Joined : {playerCount}/2
      </h2>

      {playerCount === 1 && (

        <p className="mt-6 text-yellow-400 text-xl">
          Waiting for another player...
        </p>

      )}

      {playerCount === 2 && (

        <p className="mt-6 text-green-400 text-xl">
          Game Starting...
        </p>

      )}

    </div>

  );

}

export default WaitingRoomPage;