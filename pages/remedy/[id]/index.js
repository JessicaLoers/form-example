import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function RemedyDetailsPage({ remedies }) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return;

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  return (
    <>
      <Link href={`/remedy/${currentRemedy.id}/edit`}>Edit Remedy</Link>
      <h1>{currentRemedy.title}</h1>
      <Image
        src={currentRemedy.imageUrl}
        alt={currentRemedy.title}
        width={250}
        height={250}
        priority
      />

      <ul>
        {currentRemedy.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{currentRemedy.preparation}</p>
      <p>{currentRemedy.usage}</p>
      <ul>
        {currentRemedy.symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>

      <Link href="/"> &larr; Back</Link>
    </>
  );
}
