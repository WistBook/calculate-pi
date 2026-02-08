export function Header({ title }: { title: string }) {
  return (
    <header className="p-4 text-4xl">
      <div className="pb-2 border-b-2 border-emerald-600">
        {title}
      </div>
    </header>
  );
}