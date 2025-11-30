import { useParams, useSearchParams } from "react-router-dom";
import { ProoflyEmbed } from "./ProoflyEmbed";

export function EmbedPage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [params] = useSearchParams();

  const variantParam = params.get("variant");
  const variant = (variantParam as any) || "glass";

  if (!shareId) return null;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <ProoflyEmbed
        shareId={shareId}
        backendUrl={backendUrl}
        variant={variant}
      />
    </div>
  );
}

export default EmbedPage;
