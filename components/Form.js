import { useState } from "react";
import { useRouter } from "next/router";
import symptoms from "@/lib/symptoms.json";

// If the remedy is not an empty object, we are in edit mode ;)
export default function Form({ onFormSubmit, remedy = {} }) {
  const router = useRouter();

  // State with symptoms and ingredients fields, prefilled if editing an existing remedy
  const [fields, setFields] = useState({
    // If remedy has symptoms, map them to fields with IDs, else start with an empty field
    symptoms: remedy.symptoms
      ? remedy.symptoms.map((symptom, index) => ({
          id: index + 1,
          value: symptom,
        }))
      : [{ id: 1, value: "" }],
    // If ingredients has symptoms, map them to fields with IDs, else start with an empty field
    ingredients: remedy.ingredients
      ? remedy.ingredients.map((ingredient, index) => ({
          id: index + 1,
          value: ingredient,
        }))
      : [{ id: 1, value: "" }],
  });

  // Handle changes to input fields for symptoms and ingredients
  function handleFieldChange(type, id, value) {
    setFields((prevFields) => ({
      ...prevFields,
      [type]: prevFields[type].map((field) =>
        field.id === id ? { ...field, value } : field
      ),
    }));
  }

  // Add a new field for symptoms or ingredients
  function handleAddField(type) {
    setFields((prevFields) => ({
      ...prevFields,
      [type]: [
        ...prevFields[type],
        { id: prevFields[type].length + 1, value: "" },
      ],
    }));
  }

  // Remove a field for symptoms or ingredients by ID
  function handleRemoveField(type, id) {
    setFields((prevFields) => ({
      ...prevFields,
      [type]: prevFields[type].filter((field) => field.id !== id),
    }));
  }

  // Extract the values from the fields, removing empty ones
  function extractFieldValues(fields) {
    return fields.map((field) => field.value).filter((value) => value !== "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newRemedy = {
      title: event.target.title.value,
      preparation: event.target.preparation.value,
      usage: event.target.usage.value,
      symptoms: extractFieldValues(fields.symptoms),
      ingredients: extractFieldValues(fields.ingredients),
      imageUrl:
        remedy.imageUrl ||
        "https://images.unsplash.com/photo-1448935852404-7a38bb46f5b3?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    onFormSubmit(newRemedy);

    // If remedy has an ID, it's in edit mode, so navigate to the remedy's detail page
    if (remedy.id) {
      router.push(`/remedy/${remedy.id}`);
    } else {
      // If in create mode, reset the form for new entries
      event.target.reset();
      event.target.title.focus();
    }
  }

  return (
    <form style={{ display: "grid", width: "300px" }} onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        defaultValue={remedy && remedy.title}
      />

      <section>
        <label>Ingredients:</label>
        {fields.ingredients.map((field) => (
          <div key={field.id} style={{ display: "flex", marginBottom: "8px" }}>
            <input
              type="text"
              value={field.value}
              onChange={(event) =>
                handleFieldChange("ingredients", field.id, event.target.value)
              }
            />
            <button
              type="button"
              onClick={() => handleRemoveField("ingredients", field.id)}
              disabled={fields.ingredients.length === 1}
              style={{ marginLeft: "8px" }}
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("ingredients")}
          style={{ marginTop: "8px" }}
        >
          +
        </button>
      </section>

      <label htmlFor="preparation">Preparation:</label>
      <textarea
        id="preparation"
        name="preparation"
        defaultValue={remedy && remedy.preparation}
      />

      <label htmlFor="usage">Usage:</label>
      <textarea
        id="usage"
        name="usage"
        defaultValue={remedy && remedy.preparation}
      />

      <section>
        <label>Symptoms:</label>
        {fields.symptoms.map((field) => (
          <div key={field.id} style={{ display: "flex", marginBottom: "8px" }}>
            <select
              value={field.value}
              onChange={(event) =>
                handleFieldChange("symptoms", field.id, event.target.value)
              }
            >
              <option value="">Please select a symptom</option>
              {symptoms.map((symptom) => (
                <option
                  key={symptom}
                  value={symptom}
                  disabled={fields.symptoms.some(
                    (f) => f.value === symptom && f.id !== field.id
                  )}
                >
                  {symptom}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleRemoveField("symptoms", field.id)}
              disabled={fields.symptoms.length === 1}
              style={{ marginLeft: "8px" }}
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("symptoms")}
          style={{ marginTop: "8px" }}
        >
          +
        </button>
      </section>

      <button type="submit">Submit</button>
    </form>
  );
}
