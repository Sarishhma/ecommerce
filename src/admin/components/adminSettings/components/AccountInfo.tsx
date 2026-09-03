import {
  Mail,
  MapPin,
  Pencil,
  Phone,
  User,
} from "lucide-react";

interface AccountInformationProps {
  user: {
    full_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
  } | null;
  onEdit: () => void;
}

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  emptyText: string;
}

const ProfileField = ({
  icon,
  label,
  value,
  emptyText,
}: ProfileFieldProps) => {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-stone mb-2 block">
        {label}
      </label>

      <div className="flex items-center gap-3 bg-sand/30 px-4 py-3 rounded-lg border border-border/50 min-w-0">

        <span className="text-stone shrink-0">
          {icon}
        </span>

        <span
          className={
            value
              ? "truncate text-charcoal font-medium"
              : "truncate text-stone italic"
          }
        >
          {value || emptyText}
        </span>

      </div>
    </div>
  );
};

export const AccountInformation = ({
  user,
  onEdit,
}: AccountInformationProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-sand pb-4 mb-6">

        <div>
          <h2 className="font-sans font-bold text-lg text-charcoal">
            Account Information
          </h2>

          <p className="text-sm text-stone mt-1">
            Your personal and account information.
          </p>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta/90 transition-all shadow-sm"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>

      </div>

      {/* Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

        <ProfileField
          icon={<User className="w-4 h-4" />}
          label="Full Name"
          value={user?.full_name}
          emptyText="No name added"
        />

        <ProfileField
          icon={<Mail className="w-4 h-4" />}
          label="Email Address"
          value={user?.email}
          emptyText="No email added"
        />

        <ProfileField
          icon={<Phone className="w-4 h-4" />}
          label="Phone Number"
          value={user?.phone_number}
          emptyText="No phone number added"
        />

        <ProfileField
          icon={<MapPin className="w-4 h-4" />}
          label="Address"
          value={user?.address}
          emptyText="No address added"
        />

      </div>

      {/* Role */}
      <div className="mt-6 pt-6 border-t border-sand">

        <label className="text-xs font-bold uppercase tracking-wider text-stone mb-2 block">
          Role
        </label>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-full border border-emerald-200">

          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

          Administrator

        </div>

      </div>
    </>
  );
};
