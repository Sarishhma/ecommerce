import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordSchema, type PasswordFormValues } from "../schema/account.schema"
import { useChangePassword } from "../hook/useAccount.hook"


export function PasswordTab() {
  const { mutate, isPending, isSuccess, isError, error } = useChangePassword()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) })

  const onSubmit = (values: PasswordFormValues) =>
    mutate(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => reset() }
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Change Password</h2>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Current Password</label>
        <input
          type="password"
          {...register("currentPassword")}
          className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">New Password</label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
        {errors.newPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="pt-4 border-t border-sand flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
        {isSuccess && <span className="text-sm text-green-600">Password updated</span>}
        {isError && <span className="text-sm text-red-600">{(error as Error).message}</span>}
      </div>
    </form>
  )
}