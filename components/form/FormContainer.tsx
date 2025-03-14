'use client'
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types";
import { useEffect } from "react";
import { useActionState } from "react"; 

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
