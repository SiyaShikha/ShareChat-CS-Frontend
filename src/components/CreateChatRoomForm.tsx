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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setName("");
      onRoomCreated();
    } catch (err) {
      setError("Failed to create chat room");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Chat Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Create</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateChatRoomForm;
