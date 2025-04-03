@Lifecycle @sdk @transport @coreSDK
Feature: LifecycleManagement_Session

    Background: Launch FCA for 'Advertising'
        Given the environment has been set up for 'lifeCycleApi' tests

    @2455586
    Scenario Outline: Validate lifecyclemanagement.session call for - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario           | API_Key                     | Validation_Key                   |
            | Inactive session   | create an inactive session  | response including 2 session ids |

    @2455585
    Scenario Outline: Validate lifecyclemanagement.session call for - Positive Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario           | API_Key                     | Validation_Key                   |
            | Active session     | create an active session    | response including 3 session ids |

    @4272309
    Scenario: Validate lifecyclemanagement.session call for - Positive Scenario: New Active session
        When 1st party app invokes the 'Firebolt' API to 'create an active session for testAppId'
        Then 'Firebolt' platform responds to '1st party app' with 'response including 3 session ids'
        When 1st party app invokes the 'Firebolt' API to 'set the state of testAppId to inactive'
        Then 'Firebolt' platform responds to '1st party app' for 'set the state of testAppId to inactive'
        When 1st party app invokes the 'Firebolt' API to 'set the state of testAppId to foreground'
        Then 'Firebolt' platform responds to '1st party app' for 'set the state of testAppId to foreground'
        When 1st party app invokes the 'Firebolt' API to 'set the state of testAppId to inactive'
        Then 'Firebolt' platform responds to '1st party app' for 'set the state of testAppId to inactive'
        When 1st party app invokes the 'Firebolt' API to 'create a new active session for testAppId'
        Then 'Firebolt' platform responds to '1st party app' with 'response including a new activeSessionId'

    @3574308
    Scenario Outline: Validate lifecyclemanagement.session call for - Negative Scenario: <Scenario>
        When 1st party app invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds to '1st party app' with '<Validation_Key>'

        Examples:
            | Scenario               | API_Key                         | Validation_Key                           |
            | Session without intent | create a session with no intent | an error for lifecyclemanagement session |
