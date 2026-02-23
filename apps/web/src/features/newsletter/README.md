# Newsletter Module

Newsletter subscription modal with dynamic confirmation buttons and annoying pain point patterns.

## Features

- **Dynamic Confirmations** - Button text randomly changes from a pool of options
- **Button Order Randomization** - Confirm/cancel buttons randomly swap positions
- **Scroll-based Trigger** - Modal appears after scrolling a specified distance
- **Visibility Trigger** - Modal appears when user switches away from the tab
- **Form Validation** - Email validation with Zod and React Hook Form

## Components

- **`NewsletterModalHost`** - Main pain point host that manages triggers
- **`NewsletterModal`** - The modal component itself with dynamic behavior

## Usage

```typescript
// Use the pain point host (recommended)
import { NewsletterModalHost } from '@/features/newsletter';

<NewsletterModalHost scrollDistanceTrigger={450} />

// Use modal directly
import { NewsletterModal } from '@/features/newsletter';

const [visible, setVisible] = useState(false);

<NewsletterModal
  visible={visible}
  onDismiss={() => setVisible(false)}
/>

// Use the form hook separately
import { useNewsletterForm, getNewsletterFormSchema } from '@/features/newsletter';

function CustomForm() {
  const { register, handleSubmit, formState, onSubmit } = useNewsletterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <button type="submit" disabled={!formState.isValid}>Subscribe</button>
    </form>
  );
}
```

## Configuration

- **Scroll Distance**: Default 450px, configurable via prop
- **Confirmation Messages**: Defined in translation files under `newsletter.modal.confirmations`
- **Pain Point Flag**: Can be toggled via `newsletterModal` pain point flag

The modal submission currently shows an alert but can be extended to actually submit to a newsletter service.
