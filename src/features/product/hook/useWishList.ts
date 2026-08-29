import { useAppDispatch, useAppSelector, toggleWishlistItem, selectWishlistIds } from '@/redux'

export const useWishlist = (productId: number) => {
  const dispatch = useAppDispatch()
  const wishlistIds = useAppSelector(selectWishlistIds)

  const isWishlisted = wishlistIds.includes(productId)
  const toggle = () => dispatch(toggleWishlistItem(productId))

  return { isWishlisted, toggle }
}