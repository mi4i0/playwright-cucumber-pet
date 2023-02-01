Feature: Generate accessibility reports across our website

  @accessibility
  @regression
  Scenario: Generate an accessibility report for the Home page
    Given I am on the "home" page
    And I inject axe accessibility engine
    Then I generate an accessibility analysis report

  @accessibility
  @regression
  Scenario: Generate an accessibility report for the Create Contact page
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And I inject axe accessibility engine
    Then I generate an accessibility analysis report


  @accessibility
  @regression
  Scenario: Generate an accessibility report for the Edit Contact page
    Given I am on the "home" page
    And I click the "1st" "edit" button
    And I am directed to the "edit contact" page
    And I inject axe accessibility engine
    Then I generate an accessibility analysis report

  @accessibility
  @regression
  Scenario: Generate an accessibility report for the Playground page
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I inject axe accessibility engine
    Then I generate an accessibility analysis report
