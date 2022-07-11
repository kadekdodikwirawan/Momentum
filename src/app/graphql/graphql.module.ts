/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment';


const uri = environment.graphql_url;
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));
  const auth = setContext(async (_, { headers }) => {
    // return {}
    const token = localStorage.getItem(environment.TOKEN_KEY)
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();
  return {
    Momentum: {
      link,
      cache
    }
  }
}
@NgModule({
  imports: [BrowserModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS, // <-- Different from standard initialization
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule { }
