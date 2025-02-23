let countryId;

describe('DB Check', () => {

  it('Successfully connects to Pagila database', () => {
    cy.queryDb('SELECT version()')
      .then((result) => {
        expect(result.length).to.equal(1);
        expect(result[0].version).to.include('PostgreSQL');
        cy.log('Database version:', result[0].version);
      });
  });

  it('Lists all tables in database', () => {
    cy.queryDb(`
      SELECT 
        table_name,
        table_type
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `).then((tables) => {
      expect(tables.length).to.be.greaterThan(0);
      cy.log('Found tables:');
      tables.forEach(table => {
        cy.log(`- ${table.table_name} (${table.table_type})`);
      });

      cy.log(`\n Total tables: ${tables.length}`);
    });
  });

  it('Checks country ID in database', () => {
    cy.fixture('country').then((data) => {
      const countryName = data.country;
      cy.queryDb(`SELECT country_id FROM public.country WHERE country = '${countryName}'`)
        .then((result) => {
          expect(result.length).to.be.greaterThan(0);
          countryId = result[0].country_id;
          expect(countryId).to.exist;
          cy.log(`${countryName} ID: ${countryId}`);
        });
    });
  });

  it('Inserts a new city into the database', () => {
    cy.wrap(null).then(() => {
      expect(countryId).to.exist;
      expect(countryId).to.be.a('number');

      cy.fixture('city').then((data) => {
        const cityName = data.city;
        cy.queryDb(`
          SELECT city_id, city, country_id 
          FROM public.city 
          WHERE city = '${cityName}' AND country_id = ${countryId}
        `).then((existingCities) => {
          if (existingCities.length > 0) {
            const existingCity = existingCities[0];
            expect(existingCity.city).to.equal(cityName);
            expect(existingCity.country_id).to.equal(countryId);
            cy.log(`City ${cityName} already exists with ID: ${existingCity.city_id}`);
          } else {
            const insertQuery = `
              INSERT INTO public.city (city, country_id)
              VALUES ('${cityName}', ${countryId})
              RETURNING city_id, city, country_id;
            `;

            cy.queryDb(insertQuery)
              .then((result) => {
                expect(result.length).to.equal(1);
                const newCity = result[0];
                
                expect(newCity.city_id).to.be.a('number');
                expect(newCity.city_id).to.be.above(0);
                expect(newCity.city).to.equal(cityName);
                expect(newCity.country_id).to.equal(countryId);

                
                cy.queryDb(`
                  SELECT city_id, city, country_id 
                  FROM public.city 
                  WHERE city_id = ${newCity.city_id}
                  `).then((verifyResult) => {
                    expect(verifyResult.length).to.equal(1);
                    expect(verifyResult[0].city).to.equal(cityName);
                    expect(verifyResult[0].country_id).to.equal(countryId);
                  });

                cy.log(`✅ Inserted new city ${cityName} with ID: ${newCity.city_id}`);
              });
          }
        });
      });
    });
  });

});