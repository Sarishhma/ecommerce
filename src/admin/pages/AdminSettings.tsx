
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/auth/hooks/useLogout";
import { useUpdateUser } from "../components/users/hooks/userUpdatehook";
import { AdminSettingsHeader } from "../components/adminSettings/components/Header";
import { AccountInformation } from "../components/adminSettings/components/AccountInfo";
import { EditProfileForm } from "../components/adminSettings/components/EditProfileForm";
import { SettingsToast } from "../components/adminSettings/ToastNotification/SettingToast";

export const AdminSettings = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const handleLogout = useLogout();

  const { mutateAsync: updateUser, isPending: isSaving } = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);

  const [settings, setSettings] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
  });

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /*
   * Load user information into the form
   */
  useEffect(() => {
    if (user) {
      setSettings({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        password: "",
      });
    }
  }, [user]);

  /*
   * Automatically remove toast after 4 seconds
   */
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleChange = (
    field: keyof typeof settings,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setSettings({
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      address: user?.address || "",
      password: "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setSettings({
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      address: user?.address || "",
      password: "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const payload = {
        full_name: settings.full_name,
        email: settings.email,
        phone_number: settings.phone_number,
        address: settings.address,

        ...(settings.password
          ? { password: settings.password }
          : {}),
      };

      await updateUser({
        id: user.id,
        payload,
        idempotencyKey: crypto.randomUUID(),
      });

      setIsEditing(false);

      setToast({
        type: "success",
        message: "Your account information has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update settings:", error);

      setToast({
        type: "error",
        message: "We couldn't update your information. Please try again.",
      });
    }
  };

  const firstName =
    user?.full_name?.split(" ")[0] || "Admin";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 animate-fade-in">

      {/* Header */}
      <AdminSettingsHeader
        firstName={firstName}
        onStorefront={() => navigate("/")}
        onLogout={handleLogout}
      />

      {/* Account Information */}
      <section className="bg-white/60 backdrop-blur-sm rounded-2xl border border-border shadow-sm p-5 sm:p-6 lg:p-8">

        {!isEditing ? (
          <AccountInformation
            user={user}
            onEdit={handleEdit}
          />
        ) : (
          <EditProfileForm
            settings={settings}
            isSaving={isSaving}
            onChange={handleChange}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        )}

      </section>

      {/* Notification */}
      {toast && (
        <SettingsToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
};

