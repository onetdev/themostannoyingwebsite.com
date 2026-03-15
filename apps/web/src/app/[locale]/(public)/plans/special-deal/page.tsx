import { SpecialUnsubscriptionDeal } from '@/features/subscription/components';
import { PageLayout } from '../../_components/PageLayout';

export default function SpecialDealPage() {
  return (
    <PageLayout activeItem="plans" role="main">
      <SpecialUnsubscriptionDeal />
    </PageLayout>
  );
}
