#!/usr/bin/env tsx
/**
 * Audit the shadcn components in @maw/ui-lib against the upstream `base-vega`
 * registry (the Base UI build this library targets — see ADR 31).
 *
 * It catches the kind of silent drift that a plain "does it compile" check
 * misses: a component whose exports, `data-slot` parts or offset defaults have
 * fallen behind the registry (e.g. the Tooltip arrow and the Select offset).
 *
 * Run with `pnpm --filter @maw/ui-lib audit:registry`. Exits non-zero on drift.
 * When the registry is unreachable it warns and exits 0 so it never blocks
 * offline work or CI without network.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const STYLE = 'base-vega';
const REGISTRY = `https://ui.shadcn.com/r/styles/${STYLE}`;

/** Local file (relative to `src/components`) -> upstream registry item name. */
const COMPONENTS: Record<string, string> = {
  'atoms/Avatar.tsx': 'avatar',
  'atoms/Badge.tsx': 'badge',
  'atoms/Button.tsx': 'button',
  'atoms/Checkbox.tsx': 'checkbox',
  'atoms/Collapsible.tsx': 'collapsible',
  'atoms/Empty.tsx': 'empty',
  'atoms/Input.tsx': 'input',
  'atoms/Label.tsx': 'label',
  'atoms/Marker.tsx': 'marker',
  'atoms/Message.tsx': 'message',
  'atoms/MessageScroller.tsx': 'message-scroller',
  'atoms/Bubble.tsx': 'bubble',
  'atoms/Progress.tsx': 'progress',
  'atoms/Select.tsx': 'select',
  'atoms/Separator.tsx': 'separator',
  'atoms/Slider.tsx': 'slider',
  'atoms/Spinner.tsx': 'spinner',
  'atoms/Switch.tsx': 'switch',
  'atoms/Textarea.tsx': 'textarea',
  'atoms/Toggle.tsx': 'toggle',
  'atoms/ToggleGroup.tsx': 'toggle-group',
  'atoms/Tooltip.tsx': 'tooltip',
  'molecules/Alert.tsx': 'alert',
  'molecules/InputGroup.tsx': 'input-group',
  'organisms/Accordion.tsx': 'accordion',
  'organisms/Card.tsx': 'card',
  'organisms/Carousel.tsx': 'carousel',
  'organisms/Chart.tsx': 'chart',
  'organisms/Dialog.tsx': 'dialog',
  'organisms/Field.tsx': 'field',
  'organisms/NavigationMenu.tsx': 'navigation-menu',
  'organisms/RadioGroup.tsx': 'radio-group',
  'organisms/Sheet.tsx': 'sheet',
  'organisms/Sonner.tsx': 'sonner',
  'organisms/Table.tsx': 'table',
  'organisms/Tabs.tsx': 'tabs',
};

const here = dirname(fileURLToPath(import.meta.url));
const componentsDir = join(here, '..', 'src', 'components');

function extractExports(src: string): Set<string> {
  const names = new Set<string>();
  for (const m of src.matchAll(/export\s+(?:async\s+)?function\s+(\w+)/g))
    names.add(m[1]);
  for (const m of src.matchAll(/export\s+const\s+(\w+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s+class\s+(\w+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of m[1].split(',')) {
      const token = part
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim();
      if (token) names.add(token);
    }
  }
  return names;
}

function extractSlots(src: string): Set<string> {
  const slots = new Set<string>();
  for (const m of src.matchAll(/data-slot=["']([^"']+)["']/g)) slots.add(m[1]);
  return slots;
}

function extractOffsetDefaults(src: string): Record<string, string> {
  const offsets: Record<string, string> = {};
  for (const m of src.matchAll(/\b(sideOffset|alignOffset) = (\d+)/g))
    offsets[m[1]] = m[2];
  return offsets;
}

function missing(registry: Set<string>, local: Set<string>): string[] {
  return [...registry].filter((value) => !local.has(value));
}

let offline = false;
let drift = false;

for (const [rel, name] of Object.entries(COMPONENTS)) {
  let local: string;
  try {
    local = readFileSync(join(componentsDir, rel), 'utf8');
  } catch {
    console.log(`• ${name}: local file ${rel} not found`);
    continue;
  }

  let registry: string;
  try {
    const response = await fetch(`${REGISTRY}/${name}.json`);
    if (!response.ok) {
      console.log(`• ${name}: registry HTTP ${response.status}`);
      continue;
    }
    const json = (await response.json()) as {
      files: { content: string }[];
    };
    registry = json.files.map((file) => file.content).join('\n');
  } catch {
    offline = true;
    break;
  }

  const problems: string[] = [];

  const missingExports = missing(
    extractExports(registry),
    extractExports(local),
  );
  if (missingExports.length) {
    problems.push(`missing exports: ${missingExports.join(', ')}`);
  }

  const missingSlots = missing(extractSlots(registry), extractSlots(local));
  if (missingSlots.length) {
    problems.push(`missing data-slot: ${missingSlots.join(', ')}`);
  }

  const registryOffsets = extractOffsetDefaults(registry);
  const localOffsets = extractOffsetDefaults(local);
  for (const [key, value] of Object.entries(registryOffsets)) {
    if (key in localOffsets && localOffsets[key] !== value) {
      problems.push(`${key} local=${localOffsets[key]} registry=${value}`);
    }
  }

  if (problems.length) {
    drift = true;
    console.log(`✗ ${name}`);
    for (const problem of problems) console.log(`    ${problem}`);
  }
}

if (offline) {
  console.warn(
    `⚠ Registry ${REGISTRY} is unreachable — skipped the drift audit.`,
  );
  process.exit(0);
}

if (drift) {
  console.log(
    `\nRegistry drift detected against ${STYLE}. Sync the items above.`,
  );
  process.exit(1);
}

console.log(`✓ No ${STYLE} registry drift detected.`);
