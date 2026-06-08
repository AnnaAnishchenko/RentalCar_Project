const CatalogLoader = () => {
  return (
    <section className="grid grid-cols-4 gap-6 py-10">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-2xl bg-gray-200"
        />
      ))}
    </section>
  );
};

export default CatalogLoader;
