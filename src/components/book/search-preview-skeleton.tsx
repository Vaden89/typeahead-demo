export const PreviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex gap-3 p-4 rounded-lg bg-muted animate-fade-up"
          style={{ animationDelay: `${index * 45}ms` }}
        >
          <div className="w-12.5 h-19 shrink-0 skeleton"></div>
          <div className="w-3/4 flex flex-col justify-between py-0.5">
            <div className="h-5 w-full skeleton"></div>
            <div className="h-4 w-2/3 skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
