import { ProoflyEmbed } from "./ProoflyEmbed";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export function TestimonialSection() {
  return (
    <ProoflyEmbed
      shareId="fop9wmt5"
      backendUrl={BACKEND_URL}
      variant="grid"
    />
  );
}