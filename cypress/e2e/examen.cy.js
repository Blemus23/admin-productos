// SERIE II - Pruebas del examen (admin-productos)
describe("Examen - Admin de Productos", () => {
  beforeEach(() => {
    cy.clearLocalStorage()   // empezar siempre sin sesion ni productos guardados
    cy.visit("/")            // baseUrl = http://localhost:3000 (cypress.config.js)
  })

  // 1. Iniciar sesion y verificar que el panel de administracion sea visible
  it("inicia sesion y muestra el panel de administracion", () => {
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()
    cy.get("#admin").should("be.visible")
    cy.get("#login").should("not.be.visible")
  })

  // 2. Agregar un producto y verificar que aparezca en la tabla
  it("agrega un producto y aparece en la tabla", () => {
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()

    cy.get("#nombre").type("Webcam")
    cy.get("#precio").type("350")
    cy.get("#stock").type("4")
    cy.get("#btn-guardar").click()

    cy.contains("#tabla-productos .col-nombre", "Webcam").should("be.visible")
    cy.get("#tabla-productos tbody tr").should("have.length", 6)
  })

  // 3. Validacion: no permite agregar un producto con precio 0
  it("no permite agregar un producto con precio 0", () => {
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()

    cy.get("#nombre").type("Gratis")
    cy.get("#precio").type("0")
    cy.get("#stock").type("1")
    cy.get("#btn-guardar").click()

    cy.get("#form-msg").should("have.text", "El precio debe ser un numero mayor que 0.")
    cy.contains("#tabla-productos .col-nombre", "Gratis").should("not.exist")
    cy.get("#tabla-productos tbody tr").should("have.length", 5)
  })
})
