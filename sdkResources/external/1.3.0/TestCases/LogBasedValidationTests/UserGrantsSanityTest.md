# UserGrants Sanity Test Execution

### Log snippet of UserGrants.grant

2025-02-12T09:48:14.354Z ripple[13500]:  [DEBUG][eos_distributor::util::http_client][eos]-execute: Ok(Request { method: PUT, uri: https://ess-stg.exp.xvp.na-1.xcal.tv/v1/partners/xglobal/accounts/5910694746181713281/privacySettings?clientId=ripple&entityReferenceFilter=xrn%3Axvp%3Aapplication%3Acomcast.test.firecert, version: HTTP/1.1, headers: {}, body: Body(Full(b"{\"xcal:appDataCollection\": [{\"allowed\":true,\"expiration\":\"2026-02-12T09:48:14Z\",\"ownerReference\":\"xrn:xcal:subscriber:account:5910694746181713281\",\"entityReference\":\"xrn:xvp:application:comcast.test.firecert\"}]}")) })
2025-02-12T09:48:15.595Z ripple[13500]:  [DEBUG][eos_distributor::util::http_client][eos]-status=200 OK https://ess-stg.exp.xvp.na-1.xcal.tv/v1/partners/xglobal/accounts/5910694746181713281/privacySettings?clientId=ripple&entityReferenceFilter=xrn%3Axvp%3Aapplication%3Acomcast.test.firecert

### Log snippet of UserGrants.deny

2025-02-12T09:48:17.248Z ripple[13500]:  [DEBUG][eos_distributor::util::http_client][eos]-execute: Ok(Request { method: PUT, uri: https://ess-stg.exp.xvp.na-1.xcal.tv/v1/partners/xglobal/accounts/5910694746181713281/privacySettings?clientId=ripple&entityReferenceFilter=xrn%3Axvp%3Aapplication%3Acomcast.test.firecert, version: HTTP/1.1, headers: {}, body: Body(Full(b"{\"xcal:appDataCollection\": [{\"allowed\":false,\"expiration\":\"2026-02-12T09:48:17Z\",\"ownerReference\":\"xrn:xcal:subscriber:account:5910694746181713281\",\"entityReference\":\"xrn:xvp:application:comcast.test.firecert\"}]}")) })
2025-02-12T09:48:18.548Z ripple[13500]:  [DEBUG][eos_distributor::util::http_client][eos]-status=200 OK https://ess-stg.exp.xvp.na-1.xcal.tv/v1/partners/xglobal/accounts/5910694746181713281/privacySettings?clientId=ripple&entityReferenceFilter=xrn%3Axvp%3Aapplication%3Acomcast.test.firecert

### Problem

The second log line with `status=200 OK` is the same for UserGrants.grant and UserGrants.deny. Since there is no differentiation in the log line, the pattern written in the usergrants.js matches the same line (first hit) in this case.

### Solution

1. Execute the tests with tag `@UserGrantsPart1` and `@UserGrantsPart2` separately to avoid false positive results in the Log Based Validation.

2. The execution with each tag can be done on separate devices followed by log based validation script against each log. Be aware that - if the run included UserGrants.grant and not UserGrants.deny, then the log based validation for UserGrants.deny might fail in that case and vice versa.

3. If the execution with each tag is done in the same device, then log based validation should be immediately done after each run and we should take care of clearing the first set of logs to avoid false positive results.
