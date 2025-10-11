export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
