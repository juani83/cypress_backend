describe('Probando el status code', () => {
    it('Validar el status code', () => {
        cy.request('employees')
            .its('status')
            .should('eq', 200);
    });

    it('Validar el status code fallido', () => {
        cy.request({url: 'employees/99', failOnStatusCode: false})
            .its('status')
            .should('eq', 404);
    });
});