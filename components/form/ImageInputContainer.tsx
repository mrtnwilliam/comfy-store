'use client'
import { type actionFunction } from "@/utils/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

type ImageInputContainerProps = {
  name: string;
  image: string;
  text: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const { name, image, text, action } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  return (
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        height={200}
        width={200}
        className="rounded-md object-cover mb-4 w-[200px] h-[200px]"
      />
      <Button
        variant="outline"
        size="sm"
        className="capitalize"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImageInputContainer;
