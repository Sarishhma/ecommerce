import {
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";

interface Settings {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
}

interface EditProfileFormProps {
  settings: Settings;
  isSaving: boolean;
  onChange: (
    field: keyof Settings,
    value: string
  ) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const EditProfileForm = ({
  settings,
  isSaving,
  onChange,
  onCancel,
  onSave,
}: EditProfileFormProps) => {
  return (
    <>
      {/* Header */}
      <div className="border-b border-sand pb-4 mb-6">

        <h2 className="font-sans font-bold text-lg text-charcoal">
          Edit Account Information
        </h2>

        <p className="text-sm text-stone mt-1">
          Update your personal information below.
        </p>

      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

        {/* Full Name */}
        <FormField
          label="Full Name"
          icon={<User className="w-4 h-4" />}
          type="text"
          value={settings.full_name}
          placeholder="Enter your full name"
          onChange={(value) =>
            onChange("full_name", value)
          }
        />

        {/* Email */}
        <FormField
          label="Email Address"
          icon={<Mail className="w-4 h-4" />}
          type="email"
          value={settings.email}
          placeholder="Enter your email"
          onChange={(value) =>
            onChange("email", value)
          }
        />

        {/* Phone */}
        <FormField
          label="Phone Number"
          icon={<Phone className="w-4 h-4" />}
          type="tel"
          value={settings.phone_number}
          placeholder="Enter your phone number"
          onChange={(value) =>
            onChange("phone_number", value)
          }
        />

        {/* Address */}
        <FormField
          label="Address"
          icon={<MapPin className="w-4 h-4" />}
          type="text"
          value={settings.address}
          placeholder="Enter your address"
          onChange={(value) =>
            onChange("address", value)
          }
        />

        {/* Password */}
        <div className="md:col-span-2">

          <FormField
            label="New Password"
            icon={<Lock className="w-4 h-4" />}
            type="password"
            value={settings.password}
            placeholder="Leave blank to keep current password"
            onChange={(value) =>
              onChange("password", value)
            }
          />

          <p className="text-xs text-stone mt-2">
            Only enter a password if you want to change it.
          </p>

        </div>

      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-sand flex flex-col-reverse sm:flex-row justify-end gap-3">

        <button
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-border rounded-xl text-sm font-semibold text-charcoal hover:bg-sand transition-all shadow-sm disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />

          {isSaving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </>
  );
};

/* ---------------------------------------------
   Reusable Form Field
---------------------------------------------- */

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const FormField = ({
  label,
  icon,
  type,
  value,
  placeholder,
  onChange,
}: FormFieldProps) => {
  return (
    <div>

      <label className="text-xs font-bold uppercase tracking-wider text-stone mb-2 block">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-sand/30 border border-border/50 rounded-lg text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition"
        />

      </div>

    </div>
  );
};
