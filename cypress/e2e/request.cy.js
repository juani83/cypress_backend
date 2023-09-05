describe('Peticiones REST', function() {
    it('Crear un empleado', function() {
        cy.request({
            url: 'employees',
            method: 'POST',
            body: {
                first_name: "Juan",
                last_name: "Becerra",
                email: "juan.becerra@platzi.com"
            }
        }).then( function (response) {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id");
        
            const id = response.body.id;
            cy.wrap(id).as("id");
        });
    });

    it('Validar que se haya creado', function() {
        cy.request("employees").then(response => {
            expect(response.body[response.body.length - 1].first_name).to.eq("Juan");
        })
    });

    it('Modificar empleado', function() {
        cy.request({
            url: `employees/${this.id}`,
            method: 'PATCH',
            body: {
                email: "nacho.becerra@platzi.com"
            }
        }).then(function(response) {
            cy.log(response);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
        });
    });

    it('Eliminar registro', function() {
        cy.request({
            url: `employees/${this.id}`,
            method: 'DELETE'  
        }).then(function(response) {
            expect(response.status).to.eq(200);
        });
    });
});