Feature: As a user I can refresh the browser and see the application

  @smoke @regression
  Scenario: As a user I can refresh the browser and be on the page expected
    Given I am on the "home" page
    And I refresh the "home" page
    When I click the "playground" button
    And I am directed to the "playground" page
    Then I refresh the "playground" page
