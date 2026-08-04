import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema, type ProfileFormValues } from "../schema/account.schema"
import { useUpdateProfile } from "../hook/useAccount.hook"
import type { User } from "@/redux/slices/authSlice"


export function ProfileTab({ user }: { user: User }) {
  const { mutate, isPending, isSuccess } = useUpdateProfile()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
    },
  })

  const onSubmit = (values: ProfileFormValues) => mutate(values)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
          <input
            {...register("firstName")}
            className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
        <input
          type="tel"
          {...register("phone")}
          className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
      </div>

      <div className="pt-4 border-t border-sand flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
        {isSuccess && <span className="text-sm text-green-600">Saved</span>}
      </div>
    </form>
  )
}