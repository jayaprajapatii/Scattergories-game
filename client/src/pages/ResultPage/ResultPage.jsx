import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../../services/socket";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};
  const letter = location.state?.letter || "";
  const round = location.state?.round || 1;
  const roomCode = location.state?.roomCode;
  const categories = location.state?.categories || [];
  console.log("Room code from ResultPage:", roomCode);

  let totalScore = 0;

  Object.values(answers).forEach((answer) => {

    if (
      answer &&
      answer.trim() !== "" &&
      answer[0].toUpperCase() === letter
    ) {

      totalScore += 10;

    }

  });

  function handleNextRound() {

  // Single Player
  if (!roomCode) {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const randomLetter =
      alphabet[
        Math.floor(
          Math.random() * alphabet.length
        )
      ];

    navigate("/game", {
      state: {
        letter: randomLetter,
        round: round + 1,
        categories,
      },
    });

    return;
  }

  // Multiplayer
  socket.emit("next-round", roomCode);

}

  useEffect(() => {

    socket.on(
      "new-round",
      (data) => {

        navigate(
          "/game",
          {
            state: {
              roomCode,
              round: data.round,
              letter: data.letter,
            },
          }
        );

      }
    );

    return () => {

      socket.off(
        "new-round"
      );

    };

  }, []);

  return (

    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-5xl font-bold mb-8">

        Results

      </h1>

      <h2 className="text-3xl mb-6">

        Round : {round}

      </h2>

      <h2 className="text-3xl mb-8">

        Letter : {letter}

      </h2>

      <div className="space-y-4">

        {

          Object.entries(answers).map(

            ([category, answer]) => (

              <div
                key={category}
                className="bg-slate-800 p-4 rounded-lg"
              >

                <h3 className="text-xl">

                  {category}

                </h3>

                <p>

                  {answer}

                </p>

              </div>

            )

          )

        }

      </div>

      <h2 className="text-4xl font-bold text-green-400 mt-10">

        Total Score : {totalScore}

      </h2>

      <button

        onClick={() => {
          handleNextRound();
        }}

        className="
        bg-green-500
        hover:bg-green-600
        px-8
        py-3
        rounded-lg
        mt-10
        "
      >

        Next Round

      </button>

    </div>

  );

}

export default ResultPage;