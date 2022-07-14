import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

const USER = gql`query Viewer{
  viewer{
    username
      avatar{
        url
      }
      email
      jwtAuthExpiration
  }
}`
const LOGIN = gql`mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    authToken
    refreshToken
    user{
      username
      avatar{
        url
      }
      email
      jwtAuthExpiration
    }
  }
}`

const REGISTER = gql`mutation registerUser($username: String!, $password: String, $email: String) {
  registerUser(input: {username: $username, email: $email, password: $password}) {
    user {
      username
      email
    }
  }
}`

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apollo: ApolloBase

  authSubject = new BehaviorSubject(false);
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token: string;
  $token = new BehaviorSubject({});
  $userdata = new BehaviorSubject(null);

  constructor(
    private apolloProvider: Apollo,
    private storage: Storage,
  ) {
    this.createStorage()
    this.loadToken()
    this.apollo = this.apolloProvider.use('Momentum');
  }
  createStorage() {
    this.storage.create();
  }
  async loadToken() {
    const token = await this.storage.get(environment.TOKEN_KEY);
    if (token) {
      this.token = token;
      this.$token.next(token);
      this.isAuthenticated.next(true);
      this.getMe();
    } else {
      this.token = '';
      this.$token.next({});
      this.isAuthenticated.next(false);
    }
  }
  async setToken(data: any) {
    await this.storage.set(environment.TOKEN_KEY, data?.login?.authToken)
    localStorage.setItem(environment.TOKEN_KEY, data?.login?.authToken)
    this.$token.next(data?.login?.authToken);
    this.$userdata.next(data?.login?.user)
    this.isAuthenticated.next(true);
  }
  login(userdata: FormGroup) {
    const { username, password } = userdata.value
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        username,
        password
      }
    })
  }
  register(userdata: FormGroup) {
    const { username, password, email } = userdata.value
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        username,
        password,
        email
      }
    })
  }
  getMe() {
    return this.apollo.watchQuery({
      query: USER
    })
  }
  async logOut() {
    await this.storage.remove(environment.TOKEN_KEY)
    await this.apollo.client.resetStore();
    localStorage.removeItem(environment.TOKEN_KEY)
    window.location.href = '/apps/auth/login'
  }
}
