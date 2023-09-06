describe('Pruebas con base de datos NoSQL con MongoDB', function() {
    it('Select', function() {
        cy.task("getListing").then(results => {
            cy.log(results);
            expect(results).to.have.length(10);
        })
    });
});