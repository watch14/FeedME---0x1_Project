import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreakAfterPeriod',
  standalone: true
})
export class LineBreakAfterPeriodPipe implements PipeTransform {
  transform(value: string): string {
    // Split the text into sentences based on periods followed by space
    const sentences = value.split('. ');

    // Join the sentences with period followed by line break
    const reconstructedParagraph = sentences.join('.<br>');

    return reconstructedParagraph;
  }
}