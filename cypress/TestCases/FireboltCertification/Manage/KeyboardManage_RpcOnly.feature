Feature: Keyboard_Manage_RpcOnly

    # Note: Reboot required after running this feature file

    @transport @ripple
    Scenario Outline: Keyboard.<Scenario> - Positive Scenario: Validating rpc method
        Given the environment has been set up for 'Keyboard-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the '<ManageEventName>' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to '<MethodParam>'
        And Fetch response for '<EventName>' event from '1st party app'
        And 1st party app invokes the 'Firebolt' API to '<FocusMethod>'
        And 1st party app invokes the 'Firebolt' API to '<ResponseMethod>'
        And Fetch response for '<MethodName>' method from '3rd party app'
        Then 'Firebolt' platform responds with '<MethodResponse>'
        Examples:
            | Scenario          | ManageEventName                   | EventName                  |  MethodName        | MethodParam                                              | FocusMethod                | ResponseMethod                | MethodResponse        |
            | onRequestEmail    | keyboard onRequestEmail manage    | keyboard onRequestEmail    |  keyboard email    | prompt the user for their email address with signin type | get keyboard emailFocus    | get keyboard emailResponse    | entered email address |
            | onRequestStandard | keyboard onRequestStandard manage | keyboard onRequestStandard |  keyboard standard | prompt the user for their standard platform              | get keyboard standardFocus | get keyboard standardResponse | entered username      |
            | onRequestPassword | keyboard onRequestPassword manage | keyboard onRequestPassword |  keyboard password | prompt the user for their password                       | get keyboard passwordFocus | get keyboard passwordResponse | entered password      |

    @transport @ripple
    Scenario Outline: Keyboard.<FocusMethod> - Negative Scenario: Validating rpc method
        Given the environment has been set up for 'Keyboard-rpc-Only' tests
        And 3rd party 'certification' app is launched
        When 1st party app registers for the '<ManageEventName>' event using the 'Firebolt' API
        When '3rd party app' invokes the 'Firebolt' API to '<MethodParam>'
        And Fetch response for '<EventName>' event from '1st party app'
        And 1st party app invokes the 'Firebolt' API to '<FocusMethod>'
        And Fetch response for '<MethodName>' method from '3rd party app'
        Then 'Firebolt' platform responds with '<MethodResponse>'

        Examples:
            | Scenario              | ManageEventName                   | EventName                  | MethodName        | MethodParam                                              | FocusMethod                | MethodResponse        |
            | Validating rpc method | keyboard onRequestEmail manage    | keyboard onRequestEmail    | keyboard email    | prompt the user for their email address with signin type | get keyboard emailError    | entered email address |
            | Validating rpc method | keyboard onRequestStandard manage | keyboard onRequestStandard | keyboard standard | prompt the user for their username                       | get keyboard passwordError | entered username      |
            | Validating rpc method | keyboard onRequestPassword manage | keyboard onRequestPassword | keyboard password | prompt the user for their password                       | get keyboard standardError | entered password      |