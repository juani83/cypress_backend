describe('Pruebas a bases de datos', () => {
    it('Select', () => {
        cy.task("queryDb", "SELECT * FROM pruebas").then(results => {
            cy.log(results);
        })
    });
});