import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {

  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('Momentum');
  }

  getData(): any {
    return this.apollo.watchQuery({
      query: gql`
        {
          undangans {
            edges {
              cursor
              node {
                link
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            nodes {
              slug
              uri
              title
              date
              meta {
                canvaLink
              }
            }
          }
        }
      `,
    });
  }
}
