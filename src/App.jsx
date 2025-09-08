import { useEffect, useState } from "react";

export default function App() {
  const [note, setNote] = useState("");
  const [storeNotes, setStoreNotes] = useState([]);
  //load items from localStorage when app loads
  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      setStoreNotes(savedNotes);
    } catch (error) {
      console.log("Error loading notes", error);
      setStoreNotes([]);
    }
  }, []);
  //add items to local storage when store note changes
  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(storeNotes));
      console.log("LocalStorage:", localStorage.getItem("notes"));
    } catch (error) {
      console.log("Error saving notes", error);
    }
  }, [storeNotes]);

  function handleSaveNotes() {
    if (!note.trim()) return;
    //save notes
    setStoreNotes([...storeNotes, note]);
    //reset input field
    setNote("");
  }
  return (
    <>
      <h1>Note App</h1>

      <div>
        <input
          type="text"
          value={note}
          placeholder="Enter notes"
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleSaveNotes}>Save</button>
      </div>
      <div>
        <h2>Saved Notes</h2>
        <p>
          {storeNotes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </p>
      </div>
    </>
  );
}
