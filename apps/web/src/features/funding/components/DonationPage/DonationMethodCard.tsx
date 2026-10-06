import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  type IconAliaseKey,
} from '@maw/ui-lib';
import { Link } from '@/core/i18n/navigation';

export type DonationMethodCardProps = {
  icon: IconAliaseKey;
  title: string;
  description: string;
  href: string;
  cta: string;
  className?: string;
};

export function DonationMethodCard({
  icon,
  title,
  description,
  href,
  cta,
  className,
}: DonationMethodCardProps) {
  return (
    <Card
      className={`hover:border-primary/50 transition-colors ${className ?? ''}`}
    >
      <CardHeader className="flex flex-row items-center gap-3">
        <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon icon={icon} aria-hidden />
        </span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <CardDescription>{description}</CardDescription>
        <Button asChild className="w-full">
          <Link href={href} target="_blank">
            {cta}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
