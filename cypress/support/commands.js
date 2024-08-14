let locators;

before(() => {
    cy.fixture('xpath.json').then((data) => {
        locators = data;
    });
});

Cypress.Commands.add('checkStartingBalance', () => {
    cy.xpath(locators.textStartingBalance)
        .should('exist');
});

Cypress.Commands.add('checkCoinOptions', (expectedCount) => {
    cy.xpath(locators.coinOptions)
        .should('have.length', expectedCount);
});

Cypress.Commands.add('buyCoin', (coin, quantity) => {
    cy.xpath(locators.coins[coin].textTicketPrice)
        .invoke('text')
        .then((priceText) => {
            const price = parseFloat(priceText.replace('$', '').trim());
            cy.log(`Buying ${quantity} of Coin ${coin} at price: $${price}`);
            cy.xpath(locators.coins[coin].inputQuantity)
                .clear()
                .type(quantity);
            cy.xpath(locators.coins[coin].buyButton)
                .click();
            cy.wait(2000);
        });
});

Cypress.Commands.add('getTicketPrice', (coin) => {
    return cy.xpath(locators.coins[coin].textTicketPrice)
        .invoke('text')
        .then((priceText) => {
            const price = parseFloat(priceText.replace('$', '').trim());
            return price;
        });
});

Cypress.Commands.add('sellCoin', (coin, quantity) => {
    cy.xpath(locators.coins[coin].textTicketPrice)
        .invoke('text')
        .then((priceText) => {
            const price = parseFloat(priceText.replace('$', '').trim());
            cy.log(`Selling ${quantity} of Coin ${coin} at price: $${price}`);
            cy.xpath(locators.coins[coin].inputQuantity)
                .clear()
                .type(quantity);
            cy.xpath(locators.coins[coin].sellButton)
                .click();
            cy.wait(2000);
        });
});

Cypress.Commands.add('checkCoinsOwned', (coin, expectedQuantity) => {
    cy.xpath(locators.coins[coin].ownedCoins)
        .invoke('text')
        .then((text) => {
            const ownedQuantity = parseFloat(text.replace(/[^0-9.]/g, '').trim());
            expect(ownedQuantity).to.equal(expectedQuantity);
        });
});

Cypress.Commands.add('checkMarketValue', (coin, quantity, ticketPriceWhenBought) => {
    cy.xpath(locators.coins[coin].marketValue)
        .invoke('text')
        .then((text) => {
            // Clean up the text
            const cleanedText = text.replace(/[^0-9.]/g, '').trim();
            
            const marketValue = parseFloat(cleanedText);
            const expectedMarketValue = quantity * ticketPriceWhenBought;

            expect(marketValue).to.equal(expectedMarketValue);
        });
});
