import { GameOfLifeConfig } from 'game-of-life-engine';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EcosystemRecord } from '../state/user/reducer';
import { UserService } from './user.service';
import { assignDefined } from 'src/utils';

@Injectable({
  providedIn: 'root',
})
export class EcosystemService {
  constructor(private http: HttpClient) {}

  saveRecord(ecosystem: GameOfLifeConfig, name: string) {
    return this.http.post(
      '/api/ecosystem',
      {
        ecosystem: { ...ecosystem, name, public: false, type: 'ascii' },
      },
      { responseType: 'text' }
    );
  }

  getMyEcosystems(name?: string) {
    return this.http.get<{ data: EcosystemRecord[] }>(
      '/api/ecosystem/mine',
      {}
    );
  }

  getEcosystem(name: string) {
    return this.http.get<{ data: EcosystemRecord }>(
      `/api/ecosystem/unique/${name}`
    );
  }

  getEcosystems(limit?: number , startAt?: string, ) {
    return this.http.get<{ data: EcosystemRecord[] }>('/api/ecosystem', {
      params: assignDefined({ limit: limit ?? 2 }, { startAt }),
    });
  }

  updateEcosystem(ecosystem: EcosystemRecord) {
    return this.http.put(
      '/api/ecosystem',
      {
        ecosystem,
      },
      { responseType: 'text' }
    );
  }
}
