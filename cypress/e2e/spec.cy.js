describe('mijn eerste test', () => {
  it('draait applicatie', () => {
    // expect(true).to.equal(true) // we verwachten dat true gelijk is aan true
    cy.visit('http://localhost:5173');
    cy.get('div').should('exist'); // hoe werkt dit met chakra heading??
  });
});