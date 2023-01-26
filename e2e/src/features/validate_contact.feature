Feature: As a user I expect to be able to validate a new contact

  @smoke
  @regression
  Scenario: As a user I can hit a validation error on each field then create a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And I click the "save" button
    And the "error message" should contain the text "Error: The "name" field can't be empty."
    And I fill in the "name" input with "Bart Simpson"
    And I click the "save" button
    And the "error message" should contain the text "Error: The "phone" field can't be empty."
    And I fill in the "phone" input with "939-555-0113"
    And I click the "save" button
    And the "error message" should contain the text "Error: The "street" field can't be empty."
    And I fill in the "street" input with "742 Evergreen Terrace"
    And I click the "save" button
    And the "error message" should contain the text "Error: The "city" field can't be empty."
    And I fill in the "city" input with "Springfield"
    And I click the "save" button

    And I fill in the "search" input with "Bart Simpson"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should contain the text "Bart Simpson"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "742 Evergreen Terrace, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed

  @regression
  Scenario: As a user I can hit a validation error on each field on edit contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And I fill in the "name" input with "Lisa Simpson"
    Then I select the "Female" option from the "gender"
    And I fill in the "phone" input with "939-555-0113"
    And I fill in the "street" input with "742 Evergreen Terrace"
    And I fill in the "city" input with "Springfield"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Lisa Simpson"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should contain the text "Lisa Simpson"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Female"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "742 Evergreen Terrace, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed

    And I click the "edit" button
    And I am directed to the "edit contact" page
    And I fill in the "name" input with " "
    And I click the "save" button
    And the "error message" should contain the text "Error: The "name" field can't be empty."
    And I fill in the "name" input with "Bart Simpson"
    Then I select the "Male" option from the "gender"
    And I fill in the "phone" input with " "
    And I click the "save" button
    And the "error message" should contain the text "Error: The "phone" field can't be empty."
    And I fill in the "phone" input with "939-555-0113"
    And I fill in the "street" input with " "
    And I click the "save" button
    And the "error message" should contain the text "Error: The "street" field can't be empty."
    And I fill in the "street" input with "742 Evergreen Terrace"
    And I fill in the "city" input with " "
    And I click the "save" button
    And the "error message" should contain the text "Error: The "city" field can't be empty."
    And I fill in the "city" input with "Springfield"
    And I click the "save" button

    And I fill in the "search" input with "Bart Simpson"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should contain the text "Bart Simpson"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "742 Evergreen Terrace, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed