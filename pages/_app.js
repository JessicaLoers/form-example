import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GlobalStyle from "../styles";
import initialRemedies from "@/lib/remedies.json";

export default function App({ Component, pageProps }) {
  const [remedies, setRemedies] = useState(initialRemedies);
  console.log("APP", remedies);

  function handleAddRemedy(newRemedy) {
    setRemedies([{ id: uuidv4(), ...newRemedy }, ...remedies]);
  }

  function handleUpdateRemedy(id, updatedRemedy) {
    setRemedies(
      remedies.map((remedy) =>
        remedy.id === id ? { ...remedy, ...updatedRemedy } : remedy
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        remedies={remedies}
        onAddRemedy={handleAddRemedy}
        onUpdateRemedy={handleUpdateRemedy}
      />
    </>
  );
}
