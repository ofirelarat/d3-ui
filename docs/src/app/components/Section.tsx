export function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      {title && <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>}
      <div>{children}</div>
    </section>
  );
}
