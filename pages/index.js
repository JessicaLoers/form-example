import Link from "next/link";
import Form from "@/components/Form";

export default function HomePage({ remedies, onAddRemedy }) {
  return (
    <div>
      <h1>List of remedies</h1>
      <Form onFormSubmit={onAddRemedy} />
      <ul>
        {remedies.map(({ id, title, symptoms }) => (
          <li key={id}>
            <Link href={`/remedy/${id}`}>{title}</Link>
            <ul>
              {symptoms.map((symptom) => (
                <li key={`symptom-${symptom}`}>{symptom}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "id": "1",
//     "title": "Soothing Ginger Tea",
//     "imageUrl": "https://images.pexels.com/photos/9399395/pexels-photo-9399395.jpeg?auto=compress&cs=tinysrgb&w=600",
//     "ingredients": ["Ginger", "Honey", "Lemon"],
//     "preparation": "Boil water with ginger, add lemon and honey to taste.",
//     "usage": "Drink warm to soothe a sore throat.",
//     "symptoms": ["Sore Throat", "Cold"]
