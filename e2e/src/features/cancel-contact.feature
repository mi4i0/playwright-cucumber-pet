Feature: As a user I expect to be able to create a new contact

  @smoke
  @regression
  Scenario: As a user I can cancel creating a a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And I fill in the "name" input with "Milhouse Van Houten"
    Then I select the "Male" option from the "gender"
    And I fill in the "phone" input with "111-525-2313"
    And I fill in the "street" input with "730 Evergreen Terrace"
    And I fill in the "city" input with "Springfield"
    And I click the "cancel" button
    And I am directed to the "home" page

    And I click accept on the alert dialog
    And I click the "delete" button
    And I am directed to the "home" page
    And I fill in the "search" input with "Nelson Muntz"
    And the "contact" should not be displayed
    And the "no items message" should contain the text "There are no items to display"

  @regression
  Scenario: As a user I can cancel an edit to a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And I fill in the "name" input with "Nelson Muntz"
    Then I select the "Male" option from the "gender"
    And I fill in the "phone" input with "664-555-0113"
    And I fill in the "street" input with "710 Evergreen Terrace"
    And I fill in the "city" input with "Springfield"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Nelson Muntz"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should contain the text "Nelson Muntz"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "710 Evergreen Terrace, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed

    And I click the "edit" button
    And I am directed to the "edit contact" page
    And I fill in the "name" input with "Ned Flanders"
    Then I select the "Male" option from the "gender"
    And I fill in the "phone" input with "636-555-8904"
    And I fill in the "street" input with "740 Evergreen Terrace"
    And I fill in the "city" input with "Shelbyville"
    And I click the "cancel" button

    And I fill in the "search" input with "Nelson Muntz"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should contain the text "Nelson Muntz"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "710 Evergreen Terrace, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed



