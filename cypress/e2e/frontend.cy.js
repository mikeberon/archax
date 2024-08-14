describe('FE Tests', () => {
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
    });

    it('should start with a $1000 USD balance', () => {
        cy.checkStartingBalance(); 
    });

    it('should have 4 coin options', () => {
        cy.checkCoinOptions(4);
    });
    it('should buy a coin at a ticket price and sell it when the price increases', () => {
        const coin = 'A'; // Example coin, change to 'B', 'C', or 'D' as needed
        const quantity = 3; // Example quantity
        const maxRetries = 10; // Maximum number of retries
        const retryInterval = 5000; // Interval between retries in milliseconds
    
        const waitForPriceIncrease = (initialPrice, retriesLeft) => {
            cy.getTicketPrice(coin).then((currentPrice) => {
                if (currentPrice > initialPrice) {
                    // Sell the coin if the current price is higher
                    cy.sellCoin(coin, quantity);
                } else if (retriesLeft > 0) {
                    // Wait for a while before retrying
                    cy.wait(retryInterval); // Wait for 5 seconds
                    // Retry checking the price
                    waitForPriceIncrease(initialPrice, retriesLeft - 1);
                } else {
                    // Fail the test if the price did not increase within the retries
                    assert.fail('Current ticket price did not increase within the allowed time.');
                }
            });
        };
    
        //Buy the coin and save the initial price
        cy.getTicketPrice(coin).then((initialPrice) => {
            cy.buyCoin(coin, quantity);

            cy.wait(2000);
    
            //Check the current price and sell when it increases
            waitForPriceIncrease(initialPrice, maxRetries);
        });
    });
    
    it('should assert the quantity owned and market value after buying a coin', () => {
        const coin = 'A'; // Example coin, change to 'B', 'C', or 'D' as needed
        const quantity = 3; // Example quantity
    
        // Get the ticket price at the time of buying
        cy.getTicketPrice(coin).then((ticketPriceWhenBought) => {
            // Buy the coin
            cy.buyCoin(coin, quantity);
    
            // Wait for some time or ensure the buy operation is complete
            cy.wait(2000); // Wait for 2 seconds
    
            // Assert the "Coins owned" and "Market value" after buying
            cy.checkCoinsOwned(coin, quantity); // Assert that coins owned has incremented
            cy.checkMarketValue(coin, quantity, ticketPriceWhenBought); // Assert that market value reflects cost per coin
        });
    });
});