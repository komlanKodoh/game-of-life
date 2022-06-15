import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppState } from '../state';
import { setUserProfile, setUserToken } from '../state/user/actions';
import { Profile, Token, User } from '../state/user/reducer';
import { selectUser } from '../state/user/selectors';
import { AccountModule } from './account.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: User | null;

  constructor(private http: HttpClient, private appState: Store<AppState>) {
    this.appState.select(selectUser).subscribe((user) => (this.user = user));
  }

  async createUser(username: string, password: string) {
    try {
      await lastValueFrom(
        this.http.post('/api/user/', {
          user: {
            username,
            password,
          },
        })
      );
    } catch (e: any) {
      return e.error.error.message;
    }
  }

  async login(username: string, password: string): Promise<null | string> {
    try {
      const { data } = (await lastValueFrom(
        this.http.get('/api/auth/token', {
          params: {
            username,
            password,
          },
        })
      )) as { data: Token };

      this.appState.dispatch(setUserToken(data));

      await this.updateUserData();

      return null;
    } catch (e: any) {
      return e.error.error.message;
    }
  }

  logout() {}

  async updateUserData() {
    if (!this.user?.token) return;

    const { data } = (await lastValueFrom(
      this.http.get('/api/user', {
        headers: {
          Authorization: `Bearer ${this.user.token.value}`,
        },
      })
    )) as { data: Profile };

    this.appState.dispatch(setUserProfile(data));
    return null;
  }

  refreshToken() {
    try {
      this.http
        .get<{ data: Token }>('/api/auth/refreshToken')
        .subscribe(({data}) => {
          this.appState.dispatch(setUserToken(data));
          this.updateUserData();
        });

      return null;
    } catch (e: any) {
      return e.error.error.message;
    }
  }

  getToken() {
    return this.user?.token?.value;
  }
}
