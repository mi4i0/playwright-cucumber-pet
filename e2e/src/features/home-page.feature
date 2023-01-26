Feature: As a user I expect to be able to create contacts

  @smoke
  @regression
  Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    And the "header logo" should be displayed
    Then the "contacts header" should contain the text "Contacts"
