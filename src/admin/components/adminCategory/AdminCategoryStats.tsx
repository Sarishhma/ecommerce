import {
  FolderTree,
  CheckCircle2,
  List,
} from "lucide-react";

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
      icon: FolderTree,
    },
    {
      label: "Active Categories",
      value: total,
      icon: CheckCircle2,
    },
    {
      label: "Currently Showing",
      value: visible,
      icon: List,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-5
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  {stat.label}
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};