import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';

const CREATE_UNDANGAN = gql`mutation mutation_createUndangan($canva_link: String, $slug: String, $title: String) {
  createUndangan(input: {
    canva_link: $canva_link,
    slug: $slug,
    title: $title
  }) {
    undangan {
      slug
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class UndanganService {

  private apollo: ApolloBase;
  constructor(
    private apolloProvider: Apollo
  ) {
    this.apollo = this.apolloProvider.use('Momentum');
  }

  create(undangan: any) {
    const { canva_link, slug, title } = undangan;
    return this.apollo.mutate({
      mutation: CREATE_UNDANGAN,
      variables: {
        canva_link,
        slug,
        title
      }
    });
  }
}
