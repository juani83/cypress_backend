describe('Pruebas a bases de datos', function() {
    after(() => {
        cy.task("queryDb", "DELETE FROM pruebas");
    });

    it('Insert', function() {
        cy.task("queryDb", "INSERT INTO pruebas (nombre, apellidoMaterno, apellidoPaterno) VALUES ('Juan', 'Indart', 'Becerra')").then(results => {
            cy.log(results);
            expect(results.affectedRows).to.eq(1);
            cy.wrap(results.insertId).as("id");
        });
    });

    it('Comprobar insert', function () {
        cy.task("queryDb", `SELECT * FROM pruebas WHERE id=${this.id}`).then(results => {
            cy.log(results);
            expect(results[0].nombre).to.eq("Juan");
            expect(results[0].apellidoMaterno).to.eq("Indart");
            expect(results[0].apellidoPaterno).to.eq("Becerra");
        });
    });

    it('Update nombre', function() {
        cy.task("queryDb", `UPDATE pruebas SET nombre = "Ignacio" WHERE id=${this.id}`).then(results => {
            cy.log(results);
            expect(results.affectedRows).to.eq(1);
            expect(results.serverStatus).to.eq(2);
        });
    });

    it('Comprobar update', function () {
        cy.task("queryDb", `SELECT * FROM pruebas WHERE id=${this.id}`).then(results => {
            cy.log(results);
            expect(results[0].nombre).to.eq("Ignacio");
            expect(results[0].apellidoMaterno).to.eq("Indart");
            expect(results[0].apellidoPaterno).to.eq("Becerra");
        });
    });

    it('Delete', function() {
        cy.task("queryDb", `DELETE FROM pruebas WHERE id=${this.id}`).then(results => {
            cy.log(results);
            expect(results.affectedRows).to.eq(1);
            expect(results.serverStatus).to.eq(2);
        });     
    });
});