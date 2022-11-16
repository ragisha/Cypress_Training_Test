/// <reference types="cypress" />

describe('Fetching Data from Fixture file->Login.json', function() {
    
    //Use the cy.fixture() method to pull data from fixture file
  before(function () {
  cy.fixture('OrderProduct_AllScenario').then(function (data) {
    this.data = data;
  })
  cy.fixture('OrderProduct_Login').then(function (user) {
    this.user = user;
  })
  })
  it('Login to WebOrder and Create Order',function(){
    cy.visit(this.user.URL).then(()=>console.log(this.data))
      for(var j = 0;j  < this.data.Order.length ; j++) {
  
        cy.get('#ctl00_MainContent_username').type(this.user.uname)
        cy.get('#ctl00_MainContent_password').type(this.user.password)
        cy.get('#ctl00_MainContent_login_button').click()
      //}
      //for(var i = 0; i < this.data.Order.length; i++) {
      cy.get('#ctl00_menu > :nth-child(3) > a').should('have.text','Order').click()
      cy.get('#ctl00_MainContent_fmwOrder_ddlProduct').select(this.data.Order[j].Product)
      cy.get('#ctl00_MainContent_fmwOrder_txtQuantity').clear()
      cy.get('#ctl00_MainContent_fmwOrder_txtQuantity').type(this.data.Order[j].Quantity)
      cy.get('#ctl00_MainContent_fmwOrder_txtName').type(this.data.Order[j].Customer)
      cy.get('#ctl00_MainContent_fmwOrder_TextBox2').type(this.data.Order[j].Street)
      cy.get('#ctl00_MainContent_fmwOrder_TextBox3').type(this.data.Order[j].City)
      cy.get('#ctl00_MainContent_fmwOrder_TextBox5').type(this.data.Order[j].Zip)
      cy.get('#ctl00_MainContent_fmwOrder_TextBox6').type(this.data.Order[j].Card)
      if(this.data.Order[j].expected_result==="Select a card type."){
        console.log("Select a card type.")
      }else{
      cy.get('#ctl00_MainContent_fmwOrder_cardList_1').click()
    }
      cy.get('#ctl00_MainContent_fmwOrder_TextBox1').type(this.data.Order[j].Expire)
      cy.get('#ctl00_MainContent_fmwOrder_InsertButton').click()
      //cy.wait(5000)
      //cy.get('strong').should('have.text', '\n                    New order has been successfully added.\n                ')
      if(this.data.Order[j].expected_result==="\n                    New order has been successfully added.\n                "){
        cy.xpath("//a[normalize-space()='View all orders']").click()
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text',"Reshu")

      }
      else if(this.data.Order[j].expected_result==="Quantity must be greater than zero."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RegularExpressionValidator1']").should('have.text',"\n                        Quantity must be greater than zero.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Field 'Customer name' cannot be empty."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RequiredFieldValidator2']").should('have.text',"\n                        Field 'Customer name' cannot be empty.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Field 'Street' cannot be empty."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RequiredFieldValidator3']").should('have.text',"\n                        Field 'Street' cannot be empty.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Field 'City' cannot be empty."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RequiredFieldValidator4']").should('have.text',"\n                        Field 'City' cannot be empty.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Field 'Zip' cannot be empty."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RequiredFieldValidator5']").should('have.text',"\n                        Field 'Zip' cannot be empty.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Field 'Card Nr' cannot be empty."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RequiredFieldValidator6']").should('have.text',"\n                        Field 'Card Nr' cannot be empty.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Field 'Expire date' cannot be empty."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_RequiredFieldValidator7']").should('have.text',"\n                        Field 'Expire date' cannot be empty.\n                    ")
      }
      else if(this.data.Order[j].expected_result==="Select a card type."){
        cy.xpath("//span[@id='ctl00_MainContent_fmwOrder_CustomValidator1']").should('have.text',"Select a card type.")
      }
       //logout verification
    
        cy.get('#ctl00_logout').click()
        cy.get('#ctl00_MainContent_login_button').should('contain.value', "Login")
     
  }
  })
  })