Feature: FederatedData

    @initialization
    Scenario: Launch FCA for 'FederatedData'
        Given the environment has been set up for 'FederatedData' tests
        And 3rd party 'certification' app is launched
        When '3rd party app' invokes the 'Firebolt' API to 'get discovery entityInfo'
        And '3rd party app' invokes the 'Firebolt' API to 'get discovery purchasedContent'

    @FederatedData @coreSDK @sdk @transport
    Scenario: Discovery_content.requestDetails - Positive Scenario: Ways to watch
        When 1st party app invokes the 'Firebolt' API to 'get entityInfo data'
        Then 'Firebolt' platform responds to '1st party app' with 'expected entityInfo data'

