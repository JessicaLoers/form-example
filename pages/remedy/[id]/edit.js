import { useRouter } from "next/router";
import Link from "next/link";
import Form from "@/components/Form";

export default function EditPage({ remedies, onUpdateRemedy }) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return;

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  return (
    <>
      <Form
        remedy={currentRemedy}
        onFormSubmit={(updatedRemedy) => {
          onUpdateRemedy(currentRemedy.id, updatedRemedy);
        }}
      />
      <Link href={`/remedy/${id}`}>Cancel</Link>
    </>
  );
}
