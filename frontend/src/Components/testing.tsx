import { ProoflyEmbed } from "./ProoflyEmbed";

// Backend API base URL – should include `/api`
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://proofly-backend.onrender.com/api";

export function TestimonialSection() {
  return (
    <ProoflyEmbed
      shareId="fop9wmt5"
      backendUrl={BACKEND_URL}
      variant="grid"
    />
  );
}