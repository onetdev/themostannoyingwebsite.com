import {
  createRef,
  FunctionComponent,
  memo,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { first_letter_capitalize } from './string';

import RootPortal from '@/components/templates/RootPortal';

type PrestyledNode<T extends keyof JSX.IntrinsicElements> = {
  type: T;
  className: string;
};

export const StyledNode = <T extends keyof JSX.IntrinsicElements>({
  type,
  className,
}: PrestyledNode<T>) => {
  const render = memo(
    ({
      children,
      className: internalClassName,
      ...rest
    }: React.ComponentPropsWithoutRef<T>) => {
      const Component = type as React.ElementType;

      return (
        <Component className={`${className} ${internalClassName}`} {...rest}>
          {children}
        </Component>
      );
    },
  );

  render.displayName = `StyledNode(${first_letter_capitalize(type)})`;

  return render;
};

export type ElementMeasurements = { width: number; height: number };
type ElementMeasureUtilProps = PropsWithChildren<{
  onMeasure?: (dimensions: ElementMeasurements) => void;
  measureClasses?: string;
}>;

export const ElementMeasureUtil: FunctionComponent<ElementMeasureUtilProps> = ({
  children,
  measureClasses,
  onMeasure,
}) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // We can be sure that index 0 exists because we have only one child
    const measurements = ref.current.children[0].getBoundingClientRect();

    onMeasure?.({
      width: Math.ceil(measurements.width),
      height: measurements.height,
    });
  }, [onMeasure, ref]);

  return (
    <RootPortal>
      <div className="size-0 overflow-hidden">
        <div ref={ref} className={`min-w-[100vw] ${measureClasses}`}>
          {children}
        </div>
      </div>
    </RootPortal>
  );
};

type MeasuredProps = ElementMeasureUtilProps & {
  mode?: 'measure' | 'render' | 'both';
};

/**
 * Returning measurement of the element in DOM root and while also rendering
 * the element where the root measurement is being made
 */
export const Measured: FunctionComponent<MeasuredProps> = ({
  children,
  measureClasses,
  mode = 'both',
  onMeasure,
}) => {
  const measure = mode === 'both' || mode === 'measure';
  const render = mode === 'both' || mode === 'render';

  return (
    <>
      {measure && (
        <ElementMeasureUtil
          measureClasses={measureClasses}
          onMeasure={onMeasure}>
          {children}
        </ElementMeasureUtil>
      )}
      {render && children}
    </>
  );
};

type MeasuredMultiProps = {
  items: ReactNode[];
  measureClasses?: string;
  measureTrigger?: 'first' | 'all';
  mode?: 'measure' | 'render' | 'both';
  onMeasure: (itemDims: ElementMeasurements[]) => void;
};

export const MeasuredMulti: FunctionComponent<MeasuredMultiProps> = ({
  items,
  measureClasses,
  measureTrigger = 'all',
  mode = 'both',
  onMeasure,
}) => {
  const [itemDims, setItemDims] = useState<ElementMeasurements[]>([]);

  const onMeasureProxy = (index: number, dims: ElementMeasurements) => {
    setItemDims((prev) => {
      const updated = [...prev];
      updated[index] = dims;
      return updated;
    });
  };

  useEffect(() => {
    const hasTrigger =
      (measureTrigger === 'all' && itemDims.length === items.length) ||
      (measureTrigger === 'first' && itemDims.length > 0);

    if (!hasTrigger) {
      return;
    }

    onMeasure(itemDims);
  }, [itemDims, items.length, measureTrigger, onMeasure]);

  return items.map((item, index) => (
    <Measured
      key={index}
      measureClasses={measureClasses}
      mode={mode}
      onMeasure={(dims) => onMeasureProxy(index, dims)}>
      {item}
    </Measured>
  ));
};
