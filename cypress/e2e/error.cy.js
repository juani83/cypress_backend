describe('Validando un error', () => {
    it('Probando errores 1', () => {
        cy.request({url: 'https://pokeapi.co/api/v2/pokemon/5454', failOnStatusCode: false})
            .then(response => {
                expect(response.status).to.eq(404);
                expect(response.body).to.be.eq('Not Found');
        });
    });

    it('Probando errores 2', () => {
        cy.request({url: 'https://rickandmortyapi.com/api/location/500', failOnStatusCode: false})
            .then(response => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('error', 'Location not found');
        });
    });
});