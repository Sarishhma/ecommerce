import {
  ChevronLeft,
  LogOut,
} from "lucide-react";

interface AdminSettingsHeaderProps {
  firstName: string;
  onStorefront: () => void;
  onLogout: () => void;
}

export const AdminSettingsHeader = ({
  firstName,
  onStorefront,
  onLogout,
}: AdminSettingsHeaderProps) => {
  return (
    <section className="relative overflow-hidden bg-ivory/80 backdrop-blur-md border border-border shadow-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10">

      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-60 -left-40 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Profile */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">

          <div className="relative shrink-0">

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-terracotta/20 to-amber-200/30 flex items-center justify-center border-4 border-white shadow-sm">

              <span className="font-display text-3xl sm:text-4xl font-light text-terracotta">
                {firstName.charAt(0).toUpperCase()}
              </span>

            </div>

            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-[3px] sm:border-4 border-white" />

          </div>

          <div className="min-w-0">

            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-stone font-semibold mb-1">
              Admin Settings
            </p>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-charcoal leading-tight">
              Welcome,{" "}
              <span className="font-medium bg-gradient-to-r from-terracotta to-amber-600 bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>

          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <button
            onClick={onStorefront}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 bg-white border border-border rounded-xl text-sm font-semibold text-charcoal hover:bg-sand hover:text-terracotta transition-all shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          <button
            onClick={onLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

        </div>
      </div>
    </section>
  );
};
