import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GamePage() {

  const ROUND_TIME = 10;

  const location = useLocation();
  const navigate = useNavigate();

  const letter = location.state?.letter || "";
  const round = location.state?.round || 1;
  const roomCode = location.state?.roomCode;
  const categories = location.state?.categories || [];
  console.log("GamePage roomCode =", roomCode);

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);

  useEffect(() => {

    if (timeLeft === 0) {

      navigate("/result", {
        state: {
          answers,
          letter,
          round,
          roomCode,
          categories,
        },
      });

      return;

    }
    console.log(location.state);
    const timer = setTimeout(() => {

      setTimeLeft((prevTime) => prevTime - 1);

    }, 1000);

    return () => {

      clearTimeout(timer);

    };

  }, [timeLeft, answers, letter, navigate]);

  function handleChange(category, value) {

    setAnswers((prevAnswers) => ({

      ...prevAnswers,

      [category]: value,

    }));

  }

  function handleSubmit() {

    navigate("/result", {

      state: {
        answers,
        letter,
        round,
        roomCode,
        categories,

      },

    });

  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-3xl text-yellow-400 mb-4">
        Round : {round}
      </h1>

      <h1 className="text-5xl font-bold mb-8">
        Letter : {letter}
      </h1>

      <h2 className="text-3xl mb-8">

        Time Left : {timeLeft} sec

      </h2>

      <div className="space-y-6">

        {

          categories.map((category) => (

            <div
              key={category}
              className="flex flex-col gap-2"
            >

              <label className="text-xl">

                {category}

              </label>

              <input

                type="text"

                value={answers[category] || ""}

                onChange={(e) =>
                  handleChange(
                    category,
                    e.target.value
                  )
                }

                className="bg-slate-800 border border-slate-600 rounded-lg p-3"

              />

            </div>

          ))

        }

      </div>

      <button

        onClick={handleSubmit}

        className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg mt-8"

      >

        Submit

      </button>

    </div>

  );

}

export default GamePage;