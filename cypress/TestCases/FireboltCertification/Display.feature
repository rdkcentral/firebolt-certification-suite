Feature: Display

    Background: Launch FCA for 'Display'
        Given the environment has been set up for 'Display' tests
        And 3rd party 'certification' app is launched

    @Display @coreSDK @sdk @transport
    Scenario Outline:Display.<Method> - Positive Scenario: <Scenario>
        When '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Validation_Key>'
        Examples:
            | Scenario                                | Method                | API_Key                            | Validation_Key                          |
            | Validate display colorDepth             | colorDepth            | get display colorDepth             | expected display colorDepth             |  
            | Validate display colorimetry            | colorimetry           | get display colorimetry            | expected display colorimetry            |   
            | Validate display hdrProfiles            | hdrProfiles           | get display hdrProfiles            | expected display hdrProfiles            |  
            | Validate display manufacturer           | manufacturer          | get display manufacturer           | expected display manufacturer           |  
            | Validate display productName            | productName           | get display productName            | expected display productName            |  
            | Validate display refreshRate            | refreshRate           | get display refreshRate            | expected display refreshRate            |  
            | Validate display resolution             | resolution            | get display resolution             | expected display resolution             |  
            | Validate display resolutionName         | resolutionName        | get display resolutionName         | expected display resolutionName         |  
            | Validate display size                   | size                  | get display size                   | expected display size                   |  
            | Validate display sourcePhysicalAddress  | sourcePhysicalAddress | get display sourcePhysicalAddress  | expected display sourcePhysicalAddress  |  