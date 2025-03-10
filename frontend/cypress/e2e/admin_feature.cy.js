describe('Admin Feature - Manage Admins', () => {
    it('Navigate to the New Admin page when the New Admin button is clicked', () => {
        cy.visit('https://asu-capstone.onrender.com/#/adminusers'); // Begin test on Admin Users page
        cy.get('.new-admin-button').click();
        cy.url().should('include', '/adminnew');  // Verify the correct URL after navigating
      });

    it('Add a new admin', () => {
      cy.visit('https://asu-capstone.onrender.com/#/adminnew'); // Begin test on Admin New page
      
      // Wait for input fields to be visible with timeout
      cy.get('#firstName', {timeout: 10000}).should('be.visible');
      cy.get('#lastName', {timeout: 10000}).should('be.visible');
      cy.get('#email', {timeout: 10000}).should('be.visible');
      cy.get('#username', {timeout: 10000}).should('be.visible');

      // Fill out the form with admin details
      cy.get('#firstName').type('testfirst');
      cy.get('#lastName').type('testlast');
      cy.get('#email').type('testemail@asu.edu');
      cy.get('#username').type('testusername1');
  
      // Submit the form
      cy.get('.submit-button').click();

      // Verify that the new admin is listed in the Admin Users list
      cy.contains('testfirst testlast').should('be.visible'); // Check for the new admin's first and last name
    });
  
    it('Modify an existing admin', () => {
      cy.visit('https://asu-capstone.onrender.com/#/adminusers'); // Begin test on Admin Users page

      // Click the action button for the first admin in the list
      cy.get('.user-info-row').first().find('.action-button').click();

      // Wait for the dropdown to appear and click the Edit button
      cy.get('.dropdown-menu li').contains('Edit').should('be.visible').click();

      // Wait for the edit input fields are visible
      cy.get('.edit-input').should('be.visible');
  
      // Edit the admin details
      cy.get('.edit-input').eq(0).clear().type("Jane");
      cy.get('.edit-input').eq(1).clear().type("Smith");
      cy.get('.edit-input').eq(2).clear().type("jsmith@asu.edu");
      cy.get('.edit-input').eq(3).clear().type("jsmith123");
  
      // Save the changes
      cy.get('.save-btn').click();
  
      // Ensure the changes are reflected in the list
      cy.contains("Jane Smith").should('be.visible');
      cy.contains("jsmith@asu.edu").should('be.visible');
      cy.contains("jsmith123").should('be.visible');
    });
   
    it('Delete an admin', () => {
      cy.visit('https://asu-capstone.onrender.com/#/adminusers'); // Begin test on Admin Users page

      // Click the action button for the last admin in the list
      cy.get('.user-info-row').last().find('.action-button').click();

      // Wait for the dropdown to appear and click the Remove button
      cy.get('.dropdown-menu li').contains('Remove').should('be.visible').click();
    
      // Ensure the admin is removed from the list
      cy.contains('testfirst testlast').should('not.exist'); // Ensure deleted admin is no longer listed
    });
    
  });
  