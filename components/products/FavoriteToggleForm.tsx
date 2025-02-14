'use client'
import { usePathname } from "next/navigation";
import { CardSubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
}

function FavoriteToggleForm({productId, favoriteId} : FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {productId,favoriteId,pathname})
  return (
    <FormContainer action={toggleAction} >
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm