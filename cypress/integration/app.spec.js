context('start', () => {
  beforeEach(() => {
    cy.visit('?isbn=1234567');
  });

  it('shows page', () => {
    cy.contains('Failed to retrieve the resource, please try again.');
  });
});
