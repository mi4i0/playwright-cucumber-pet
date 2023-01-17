Feature: As a user I can interact with radio buttons

  @smoke @regression
  Scenario: As a user I can interact and assert on radio buttons
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "female label" should not contain the text "Male"
    And the "male label" should not contain the text "Female"
    And the "female" radio button should be checked
    And the "male" radio button should not be checked
    Then I check the "male" radio button
    And the "male" radio button should be checked
    And the "female" radio button should not be checked
    And I check the "female" radio button
    And the "female" radio button should be checked
    And the "male" radio button should not be checked
