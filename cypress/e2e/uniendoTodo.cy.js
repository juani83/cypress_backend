describe('Uniendo todo', function() {
    it('Debemos eliminar el registro creado', function() {
        cy.request({
            url: 'employees/3',
            method: 'DELETE',
        }).then( response => {
            expect(response.status).to.eq(200);
        });     
    });

    it('Validar que no este en BD', function() {
        cy.task("queryDb", 'SELECT * FROM pruebas WHERE id = 3')
            .then( results => {
                cy.log(results);
                expect(results.length).to.eq(0);
            });
    });
});