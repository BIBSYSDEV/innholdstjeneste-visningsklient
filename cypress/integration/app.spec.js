import { mockIsbnThatTriggersServerError } from '../../src/services/mock-interceptors';
import { oriaKeyword, SearchParameters } from '../../src/services/api';

context('start', () => {
  beforeEach(() => {
    cy.visit('?isbn=1234567');
  });

  it('successfully shows a full page', () => {
    cy.get('[data-testid="page-header"]').should('exist');
    cy.get('[data-testid="page-footer"]').should('exist');
    cy.get('[data-testid="description-short-box"]').should('exist');
    cy.get('[data-testid="description-short-box-contents"]').should('exist');
    cy.get('[data-testid="description-long-box"]').should('exist');
    cy.get('[data-testid="description-long-box-contents"]').should('not.exist');
    cy.get('[data-testid="description-toc-box"]').should('exist');
    cy.get('[data-testid="description-toc-box-contents"]').should('not.exist');
    cy.get('[data-testid="cover-image-container"]').should('exist');
  });

  it('shows errormessage when api-call fails', () => {
    cy.visit(`?isbn=${mockIsbnThatTriggersServerError}`);
    cy.contains('Failed to retrieve the resource, please try again.');
  });

  it('hides header and closes all expandables if oria-parameter is set', () => {
    cy.visit(`?isbn=1234567&${SearchParameters.system}=${oriaKeyword}`);
    cy.get('[data-testid="description-short-box"]').should('exist');
    cy.get('[data-testid="description-short-box-contents"]').should('not.exist');
    cy.get('[data-testid="description-long-box"]').should('exist');
    cy.get('[data-testid="description-long-box-contents"]').should('not.exist');
    cy.get('[data-testid="page-footer"]').should('exist');
    cy.get('[data-testid="page-header"]').should('not.exist');
    cy.get('[data-testid="cover-image-container"]').should('not.exist');
  });

  //TODO: test summary, audio-file, missing paremeters,collapsability
});
