'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';

type FaqItem = {
  id: string;
  questionKey: AppTranslationKey;
  answerKey: AppTranslationKey;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'balance',
    questionKey: 'funding.faq.items.balance.question',
    answerKey: 'funding.faq.items.balance.answer',
  },
  {
    id: 'money',
    questionKey: 'funding.faq.items.money.question',
    answerKey: 'funding.moneyUsageDescription',
  },
  {
    id: 'sponsors',
    questionKey: 'funding.faq.items.sponsors.question',
    answerKey: 'funding.description',
  },
  {
    id: 'rights',
    questionKey: 'funding.faq.items.rights.question',
    answerKey: 'funding.faq.items.rights.answer',
  },
  {
    id: 'donate',
    questionKey: 'funding.faq.items.donate.question',
    answerKey: 'funding.faq.items.donate.answer',
  },
  {
    id: 'account',
    questionKey: 'funding.faq.items.account.question',
    answerKey: 'funding.faq.items.account.answer',
  },
];

export type DonationFaqProps = {
  className?: string;
};

export function DonationFaq({ className }: DonationFaqProps) {
  const t = useTranslations();

  return (
    <section className={cn('flex flex-col gap-2', className)}>
      <h2>{t('funding.faq.heading')}</h2>
      <Accordion className="w-full">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{t(item.questionKey)}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {t.rich(item.answerKey, { br: () => <br /> })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
