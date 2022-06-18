import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcosystemService } from 'src/app/account/ecosystem.service';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss'],
})
export class EcosystemComponent implements OnInit {
  name: string;

  constructor(
    private route: ActivatedRoute,
    private ecosystem: EcosystemService
  ) {
    this.name = this.route.snapshot.paramMap.get('name') as string;
  }

  ngOnInit(): void {
    this.ecosystem.getEcosystem(this.name).subscribe((system) => {
    });
  }
}
