Feature: Keyboard_Manage_RpcOnly

    # Note: Reboot required after running this feature file

    @transport @ripple @requiresPlatformImplementation
    Scenario Outline: Keyboard.<Scenario> - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'Keyboard-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the '<ManageEventName>' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to '<MethodParam>'
        And Fetch response for '<EventName>' event from 1st party app
        And 1st party app invokes the 'Firebolt' API to '<FocusMethod>'
        And 1st party app invokes the 'Firebolt' API to '<ResponseMethod>'
        And Fetch response for '<MethodName>' method from 3rd party app
        Then 'Firebolt' platform responds with '<MethodResponse>'
        Examples:
            | Scenario          | ManageEventName                   | EventName                  | MethodName        | MethodParam                                              | FocusMethod                         | ResponseMethod                       | MethodResponse        |
            | onRequestEmail    | keyboard onRequestEmail manage    | keyboard onRequestEmail    | keyboard email    | prompt the user for their email address with signin type | request focus for email provider    | send response from email provider    | entered email address |
            | onRequestStandard | keyboard onRequestStandard manage | keyboard onRequestStandard | keyboard standard | prompt the user for their standard platform              | request focus for standard provider | send response from standard provider | entered username      |
            | onRequestPassword | keyboard onRequestPassword manage | keyboard onRequestPassword | keyboard password | prompt the user for their password                       | request focus for password provider | send response from password provider | entered password      |

    @transport @ripple @requiresPlatformImplementation
    Scenario Outline: Keyboard.<FocusMethod> - Negative Scenario: Validating rpc method
        Given the environment has been set up for 'Keyboard-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the '<ManageEventName>' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to '<MethodParam>'
        And Fetch response for '<EventName>' event from 1st party app
        And 1st party app invokes the 'Firebolt' API to '<FocusMethod>'
        And Fetch response for '<MethodName>' method from 3rd party app
        Then 'Firebolt' platform responds with '<MethodResponse>'

        Examples:
            | Scenario              | ManageEventName                   | EventName                  | MethodName        | MethodParam                                              | FocusMethod                       | MethodResponse        |
            | Validating rpc method | keyboard onRequestEmail manage    | keyboard onRequestEmail    | keyboard email    | prompt the user for their email address with signin type | send error from email provider    | entered email address |
            | Validating rpc method | keyboard onRequestStandard manage | keyboard onRequestStandard | keyboard standard | prompt the user for their username                       | send error from standard provider | entered username      |
            | Validating rpc method | keyboard onRequestPassword manage | keyboard onRequestPassword | keyboard password | prompt the user for their password                       | send error from password provider | entered password      |