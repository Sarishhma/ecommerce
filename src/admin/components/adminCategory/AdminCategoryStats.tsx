interface AdminCategoryStatsProps {
  total: number;
  visible: number;
}

export const AdminCategoryStats = ({
  total,
  visible,
}: AdminCategoryStatsProps) => {
  const stats = [
    {
      label: "Total Categories",
      value: total,
    },
    {
      label: "Active Categories",
      value: total,
    },
    {
      label: "Currently Showing",
      value: visible,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone">
              {stat.label}
            </h3>
          </div>
          <p className="text-3xl font-display text-charcoal mb-1">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};