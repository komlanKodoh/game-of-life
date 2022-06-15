import { GameOfLifeConfig } from 'game-of-life-engine';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EcosystemRecord } from '../state/user/reducer';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class EcosystemService {
  constructor(private http: HttpClient, private userService: UserService) {}

  saveRecord(ecosystem: GameOfLifeConfig, name: string) {
    return this.http.post('/api/ecosystem', {
      ecosystem: { ...ecosystem, name, public: true, type: 'ascii' },
    });
  }

  getMyEcosystems(name: string) {
    return this.http.get<{ data: GameOfLifeConfig }>('/api/ecosystem/mine', {
      params: {
        name,
      },
    });
  }

  getEcosystems() {
    return this.http.get<{ data: EcosystemRecord[] }>('/api/ecosystem', {
      params: {},
    });
  }
}
