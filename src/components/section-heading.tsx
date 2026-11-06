export function SectionHeading({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 data-reveal className="text-3xl font-bold">
        {title}
      </h2>
      {lede && <p className="mt-2 text-muted">{lede}</p>}
    </div>
  );
}
