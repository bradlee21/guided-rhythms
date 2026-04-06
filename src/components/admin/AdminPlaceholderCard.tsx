import { brand } from "@/lib/brand";

export function AdminPlaceholderCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article
      className="rounded-[1.5rem] p-5"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        border: `1px solid ${brand.border}`,
      }}
    >
      <h2 className="text-xl font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
        {body}
      </p>
    </article>
  );
}
