import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewCardProps = {
  reviewInfo: {
    name: string;
    image: string;
    rating: number;
    comment: string;
  };
  children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            width={48}
            height={48}
            src={reviewInfo.image}
            className="w-12 h-12 rounded-full object-cover"
            alt={reviewInfo.name}
          />
          <div className="ml-4">
            <h3 className="text-sm capitalize font-bold mb-1">
              {reviewInfo.name}
            </h3>
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}

export default ReviewCard;
