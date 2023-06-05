import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-symbol-details',
  templateUrl: './symbol-details.component.html',
  styleUrls: ['./symbol-details.component.css']
})
export class SymbolDetailsComponent implements OnChanges {
  @Input() symbolModal = '';
  @Input() score = 0;
  @Input() avgtotalscore = 0;

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  
}
