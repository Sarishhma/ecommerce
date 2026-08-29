import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, X, Check, Mail, Phone, MapPin, User as UserIcon } from "lucide-react"
import { profileSchema, type ProfileFormValues } from "../schema/account.schema"
import { useUpdateProfile } from "../hook/useAccount.hook"
import type { User } from "@/auth/types/auth.types"

export function ProfileTab({ user }: { user: User | null }) {
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    return (
      <p className="text-sm text-stone">
        Unable to load profile. Please try signing in again.
      </p>
    )
  }

  const { mutate, isPending, isSuccess } = useUpdateProfile(user.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
    },
  })

  const handleCancel = () => {
    reset({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
    })
    setIsEditing(false)
  }

  const onSubmit = (values: ProfileFormValues) => {
    mutate(values, {
      onSuccess: () => setIsEditing(false),
    })
  }

  const fields = [
    { icon: UserIcon, label: "Full Name", value: user.full_name },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone Number", value: user.phone_number },
    { icon: MapPin, label: "Address", value: user.address },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-charcoal">
            Profile Information
          </h2>
          <p className="text-sm text-stone mt-1">
            Manage your personal details
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal border border-sand rounded-lg hover:bg-sand/20 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-sand/10">
              <div className="p-2 rounded-lg bg-white text-terracotta shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-stone uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium text-charcoal mt-0.5 truncate">
                  {value || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
            <input
              {...register("full_name")}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all text-sm"
            />
            {errors.full_name && (
              <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all text-sm"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
            <input
              type="tel"
              {...register("phone_number")}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all text-sm"
            />
            {errors.phone_number && (
              <p className="text-sm text-red-600 mt-1">{errors.phone_number.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Address</label>
            <input
              {...register("address")}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all text-sm"
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="pt-4 border-t border-sand flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-terracotta text-white rounded-lg text-sm font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-2.5 border border-sand text-charcoal rounded-lg text-sm font-medium hover:bg-sand/20 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            {isSuccess && !isEditing && (
              <span className="text-sm text-green-600 ml-auto">Saved</span>
            )}
          </div>
        </form>
      )}
    </div>
  )
}