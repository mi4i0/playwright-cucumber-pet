Feature: As a user I expect to be able to create contacts

  @smoke @regression
  Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    Then I fill in the "name" input with "Terry Barks"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input with "939-555-0113"
    And I fill in the "street" input with "742 Puma Terrace"
    And I fill in the "city" input with "Springfield"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Terry Barks"
    And the "search" should not equal the text "Terry Bark"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Terry Barks"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "742 Puma Terrace, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed

  @smoke @regression
  Scenario: As a user I do not expect saved contacts to persist after a page refresh
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    Then I fill in the "name" input with "Tanya Hardie"
    And I select the "Female" option from the "gender"
    And I fill in the "phone" input with "0434677333"
    And I fill in the "street" input with "152 Margi Court"
    And I fill in the "city" input with "Shelbyville"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Tanya Hardie"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Tanya Hardie"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Female"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "152 Margi Court, Shelbyville"
    And the "edit" should be displayed
    And the "delete" should be displayed

    And I refresh the "home" page

    And I fill in the "search" input with "Tanya Hardie"
    Then the "contact" should not be displayed
