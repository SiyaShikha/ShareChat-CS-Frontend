import React, { useState } from "react";
import axios from "axios";

type Props = {
  onRoomCreated: () => void;
};

const CreateChatRoomForm: React.FC<Props> = ({ onRoomCreated }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:5086/api/chatroom",
        { name },
        {
          withCredentials: true,
        }
      );

      setName("");
      onRoomCreated();
    } catch (err) {
      setError("Failed to create chat room");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Create a Chat Room
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Chat Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </form>
  );
};

export default CreateChatRoomForm;
