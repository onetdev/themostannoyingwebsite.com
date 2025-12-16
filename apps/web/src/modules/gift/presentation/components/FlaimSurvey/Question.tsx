import { CompactFormRow, RadioButton } from '@maw/ui-lib';

export type QuestionProps = {
  data: {
    text: string;
    options: string[];
  };
  selectOption: (option: number) => void;
};

export function Question({ data, selectOption }: QuestionProps) {
  return (
    <>
      <h3 className="my-3">{data.text}</h3>
      {data.options.map((option, index) => (
        <CompactFormRow key={`${index}-${option}`} label={option}>
          <RadioButton
            value={index}
            name="flaim-survey"
            onChange={() => selectOption(index)}
            data-testid={`flaim-survey-option-${index}`}
          />
        </CompactFormRow>
      ))}
    </>
  );
}
