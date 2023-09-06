describe('Pruebas con base de datos NoSQL con MongoDB', function() {
    after(function() {
        cy.task("clearPlanets");    
    });
    
    it('Select', function() {
        cy.task("getListing").then(results => {
            cy.log(results);
            expect(results).to.have.length(8);
        })
    });

    it.only('Create', function() {
        cy.task("createPlanet", {
            "name": "Prueba",
            "orderFromSun": {
              "$numberInt": "1"
            },
            "hasRings": false,
            "mainAtmosphere": [],
            "surfaceTemperatureC": {
              "min": {
                "$numberInt": "-173"
              },
              "max": {
                "$numberInt": "427"
              },
              "mean": {
                "$numberInt": "67"
              }
            }
          }).then(results => {
            cy.log(results);
            expect(results.acknowledged).to.eq(true);
            expect(results).to.haveOwnPropertyDescriptor("insertedId");
        }) 
    });
});


