describe('Backend API Tests', () => {
    it('should successfully purchase a coin and return updated inventory', () => {
      // Make a purchase request
      cy.request('POST', 'http://localhost:3100/purchase-coin', {
        coinId: 3, // Example coin ID
        amount: 5  // Example amount
      }).then((response) => {
        // Verify the response
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('success', true);
        expect(response.body.inventory).to.be.an('array');
        
        // Optionally check specific inventory updates
        const coinB = response.body.inventory.find((item) => item.coinId === 3);
        expect(coinB).to.have.property('amountOwned', 5); // Adjust based on the actual expected amount
      });
    });
  });