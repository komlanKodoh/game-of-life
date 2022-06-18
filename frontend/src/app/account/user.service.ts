import { logUserOut, loadEcosystems } from './../state/user/actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppState } from '../state';
import { setUserProfile, setUserToken } from '../state/user/actions';
import { Profile, Token, User } from '../state/user/reducer';
import { selectUser } from '../state/user/selectors';
import { AccountModule } from './account.module';
import { EcosystemService } from './ecosystem.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static tokenExpiryCheckInterval: ReturnType<typeof setTimeout>;
  // in seconds
  private static TOKEN_EXPIRY_CHECK_DELAY = 10 * 60;
  private user!: User | null;

  constructor(
    private http: HttpClient,
    private ecosystemService: EcosystemService,
    private appState: Store<AppState>
  ) {
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

  async logout(): Promise<null | string> {
    try {
      await lastValueFrom(
        this.http.get('/api/auth/logout', {
          responseType: 'text',
        })
      );

      this.appState.dispatch(logUserOut());
      this.stopTokenExpiryChecks();

      return null;
    } catch (e: any) {
      return e.error.error.message;
    }
  }

  async updateUserData() {
    if (!this.user?.token) return;

    const { data } = (await lastValueFrom(
      this.http.get('/api/user', {
        headers: {
          Authorization: `Bearer ${this.user.token.value}`,
        },
      })
    )) as { data: Profile };

    this.startTokenExpiryChecks();
    this.appState.dispatch(setUserProfile(data));
    this.ecosystemService.getMyEcosystems().subscribe(({ data }) => {
      this.appState.dispatch(loadEcosystems({ payload: data }));
    });
    return null;
  }

  refreshToken() {
    try {
      this.http
        .get<{ data: Token }>('/api/auth/refreshToken')
        .subscribe(({ data }) => {
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

  startTokenExpiryChecks() {
    if (!this.user?.token) return;
    this.stopTokenExpiryChecks();

    UserService.tokenExpiryCheckInterval = setInterval(() => {
      if (!this.user?.token)
        throw ' Interval called whilst user user toke does not exist';

      if (
        this.user.token.expires - new Date().getTime() / 1000 <=
        UserService.TOKEN_EXPIRY_CHECK_DELAY
      ) {
        this.refreshToken();
      }
    }, UserService.TOKEN_EXPIRY_CHECK_DELAY * 1000);
  }

  stopTokenExpiryChecks() {
    UserService.tokenExpiryCheckInterval &&
      clearInterval(UserService.tokenExpiryCheckInterval);
  }
}
