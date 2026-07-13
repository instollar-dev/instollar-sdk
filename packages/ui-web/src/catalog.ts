import type { ComponentType } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Text } from './components/Text';
import { AreaTrendChart, areaTrendChartDemoData } from './components/AreaTrendChart';
import { DonutChart, donutChartDemoData } from './components/DonutChart';

export type WebComponentCategory =
  | 'Actions'
  | 'Inputs'
  | 'Typography'
  | 'Charts'
  | 'Layout';

export interface WebComponentCatalogItem {
  id: string;
  name: string;
  category: WebComponentCategory;
  description: string;
  /** Named export from `instollar-sdk` / `@instollar-dev/ui-web`. */
  importName: string;
  /** Component to render in a gallery / components list in the consuming app. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  /** Sensible default props for previewing in a components list. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewProps?: Record<string, any>;
}

/**
 * Registry for the consuming app's components list / gallery.
 * Map over this in your design-system page — components still live in the SDK.
 */
export const webComponentCatalog: WebComponentCatalogItem[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Actions',
    description: 'Primary actions with variants and sizes.',
    importName: 'Button',
    Component: Button,
    previewProps: { children: 'Continue', variant: 'primary' },
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Inputs',
    description: 'Text field with label, hint, and error states.',
    importName: 'Input',
    Component: Input,
    previewProps: {
      label: 'Email',
      placeholder: 'you@example.com',
      type: 'email',
    },
  },
  {
    id: 'text',
    name: 'Text',
    category: 'Typography',
    description: 'Typographic variants for titles and body copy.',
    importName: 'Text',
    Component: Text,
    previewProps: { variant: 'title', children: 'Section title' },
  },
  {
    id: 'area-trend-chart',
    name: 'AreaTrendChart',
    category: 'Charts',
    description: 'Smooth area chart for revenue / performance trends.',
    importName: 'AreaTrendChart',
    Component: AreaTrendChart,
    previewProps: {
      title: 'Revenue Trend',
      description: 'Last 7 days performance',
      data: areaTrendChartDemoData,
    },
  },
  {
    id: 'donut-chart',
    name: 'DonutChart',
    category: 'Charts',
    description: 'Donut chart for channel or category distribution.',
    importName: 'DonutChart',
    Component: DonutChart,
    previewProps: {
      title: 'Sales Distribution',
      description: 'By channel',
      data: donutChartDemoData,
    },
  },
];
