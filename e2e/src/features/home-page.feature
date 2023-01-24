Feature: As a user I expect to be able to create contacts

  @smoke @regression
  Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    And the "header logo" should be displayed
    Then the "contacts header" should contain the text "Contacts"

  @smoke @regression
  Scenario: As a user I don't expect to see a contact that does not exist
    Given I am on the "home" page
    And I fill in the "search" input with "Funky Name"
    Then the "contact" should be displayed