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

    @Display @coreSDK @sdk @transport @notSupported
    Scenario Outline: Display.<method> - Positive Scenario: <Scenario>
        When '3rd party app' registers for the  '<Event_Registration_Key>' event using the 'Firebolt' API
        And '3rd party app' invokes the 'Firebolt' API to '<API_Key>'
        Then 'Firebolt' platform responds with '<Method_Validation_Key>'
        When User triggers event with value as '<Event_Param>'
        Then 'Firebolt' platform triggers event '<Event_Validation_Key>'

        Examples:
            | Scenario                                      | method                | Event_Registration_Key                  | API_Key                           | Method_Validation_Key                  | Event_Validation_Key                                   | Event_Param                          |
            | validate display colorDepthChanged            | colorDepth            | display onColorDepthChanged             | get display colorDepth            | expected display colorDepth            | expected display onColorDepthChanged event             | onColorDepthChanged event            | 
            | validate display colorimetryChanged           | colorimetry           | display onColorimetryChanged            | get display colorimetry           | expected display colorimetry           | expected display onColorimetryChanged event            | onColorimetryChanged event           | 
            | validate display hdrProfilesChanged           | hdrProfiles           | display onHdrProfilesChanged            | get display hdrProfiles           | expected display hdrProfiles           | expected display onHdrProfilesChanged event            | onHdrProfilesChanged event           |
            | validate display ManufacturerChanged          | manufacturer          | display onManufacturerChanged           | get display manufacturer          | expected display manufacturer          | expected display onManufacturerChanged event           | onManufacturerChanged event          |
            | validate display productNameChanged           | productName           | display onProductNameChanged            | get display productName           | expected display productName           | expected display onProductNameChanged event            | onProductNameChanged event           |
            | validate display refreshRateChanged           | refreshRate           | display onRefreshRateChanged            | get display refreshRate           | expected display refreshRate           | expected display onRefreshRateChanged event            | onRefreshRateChanged event           |
            | validate display resolutionChanged            | resolution            | display onResolutionChanged             | get display resolution            | expected display resolution            | expected display onResolutionChanged event             | onResolutionChanged event            |
            | validate display resolutionNameChanged        | resolutionName        | display onResolutionNameChanged         | get display resolutionName        | expected display resolutionName        | expected display onResolutionNameChanged event         | onResolutionNameChanged event        |
            | validate display sizeChanged                  | size                  | display onSizeChanged                   | get display size                  | expected display size                  | expected display onSizeChanged event                   | onSizeChanged event                  |
            | validate display sourcePhysicalAddressChanged | sourcePhysicalAddress | display onSourcePhysicalAddressChanged  | get display sourcePhysicalAddress | expected display sourcePhysicalAddress | expected display onSourcePhysicalAddressChanged event  | onSourcePhysicalAddressChanged event |
 