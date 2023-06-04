describe("Submit e2e", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it("should check if the input and submit button exist", () => {
        cy.get('input#text').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it("should allows write text in the field", () => {
        const fakeText = 'Animals';
        cy.get('input#text').type(fakeText);
        cy.get('input#text').should('have.value', fakeText);
    });

    it("should submit form and show the text", () => {
        const fakeText = 'Animals';
        cy.get('input#text').type(fakeText);
        cy.get('input#text').should('have.value', fakeText);
        cy.get('form').eq(1).submit();
        cy.get('h1#submitted').should('be.visible').and('contain', 'Form Submitted');
    });
});