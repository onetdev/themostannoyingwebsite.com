import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@maw/ui-lib';

import { CommentItem } from './CommentItem';
import { Comment } from '../domain/entities/comment';

export interface CommentSectionProps {
  items: Comment[];
}

export function CommentSection({ items }: CommentSectionProps) {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {items.map((comment, i) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
            {i !== items.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
