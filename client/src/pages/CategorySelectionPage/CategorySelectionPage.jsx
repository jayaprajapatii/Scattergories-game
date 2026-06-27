import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategorySelectionPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    "Animal",
    "Movie",
    "Country",
  ]);

  function handleChange(index, value) {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  }

  function addCategory() {
    setCategories([...categories, ""]);
  }

  function removeCategory(index) {
    if (categories.length <= 1) return;

    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  }

  function handleStartGame() {

  const filteredCategories = categories
    .map(category => category.trim())
    .filter(category => category !== "");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomLetter =
    alphabet[
      Math.floor(Math.random() * alphabet.length)
    ];

  navigate("/game", {

    state: {

      categories: filteredCategories,

      letter: randomLetter,

      round: 1,

    },

  });

}

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 py-10">

      <div className="bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-yellow-400">
          🎮 Scattergories
        </h1>

        <h2 className="text-2xl font-semibold text-center text-white mt-5">
          Choose Your Categories
        </h2>

        <p className="text-center text-gray-400 mt-2">
          Create your own categories for this game.
          Add or remove categories before starting.
        </p>

        <div className="mt-6 mb-8 flex justify-between items-center">

          <h3 className="text-xl font-semibold text-white">
            Categories
          </h3>

          <span className="bg-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
            {categories.length} Selected
          </span>

        </div>

        {categories.map((category, index) => (

          <div
            key={index}
            className="flex items-center gap-3 mb-4"
          >

            <input
              type="text"
              value={category}
              placeholder={`Category ${index + 1}`}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={() => removeCategory(index)}
              disabled={categories.length === 1}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed w-12 h-12 rounded-lg text-xl"
            >
              ✕
            </button>

          </div>

        ))}

        <div className="flex justify-between items-center mt-8">

          <button
            onClick={addCategory}
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-semibold"
          >
            ➕ Add Another Category
          </button>

          <button
            onClick={handleStartGame}
            className="bg-green-500 hover:bg-green-600 transition px-8 py-3 rounded-lg font-semibold"
          >
            🚀 Start Game
          </button>

        </div>

      </div>

    </div>
  );
}

export default CategorySelectionPage;