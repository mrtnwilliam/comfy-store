import { formatCurrency } from "@/utils/format";
import { Separator } from "../ui/separator";
import { Card, CardTitle } from "../ui/card";
import { Cart } from "@prisma/client";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { createOrderAction } from "@/utils/actions";

function CartTotals({cart} : {cart: Cart}) {
  const {cartTotal, shipping, tax, orderTotal} = cart;
  return <Card className="p-8">
    <CartTotalRow label="Subtotal" amount={cartTotal} />
    <CartTotalRow label="Shipping" amount={shipping} />
    <CartTotalRow label="Tax" amount={tax} />
    <CardTitle className="mt-8">
      <CartTotalRow label="Order Total" amount={orderTotal} />
    </CardTitle>
    <FormContainer action={createOrderAction}>
      <SubmitButton text="Place Order" className="w-full mt-8" />
    </FormContainer>
  </Card>;
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return(
  <>
    <p className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
    {lastRow ? null :<Separator className="my-2" />}
  </>
  )
};

export default CartTotals;
