import { Field, FieldLabel, RadioGroup, RadioGroupItem } from '@maw/ui-lib';
import type { FlaimSurveyQuestion } from '../../schemas';

export type QuestionProps = {
  data: Pick<FlaimSurveyQuestion, 'text' | 'options'>;
  selectOption: (option: number) => void;
};

export function Question({ data, selectOption }: QuestionProps) {
  return (
    <>
      <h3 className="my-3">{data.text}</h3>
      <RadioGroup
        onValueChange={(value) => selectOption(parseInt(value, 10))}
        className="gap-4"
      >
        {data.options.map((option, index) => {
          const id = `flaim-survey-option-${index}`;
          return (
            <Field
              key={`${index}-${option.id}`}
              orientation="horizontal"
              className="items-center gap-2"
            >
              <RadioGroupItem
                value={index.toString()}
                id={id}
                data-testid={id}
              />
              <FieldLabel htmlFor={id} className="font-normal">
                {option.label}
              </FieldLabel>
            </Field>
          );
        })}
      </RadioGroup>
    </>
  );
}
