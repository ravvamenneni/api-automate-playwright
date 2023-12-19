import {test, expect } from '@playwright/test';
import exp from 'constants';

// AdressBooks Api swagger link:
// https://addressbook-api.tcgplayer-qa.com/swagger/index.html

var _bodyString = `{
    "data": {
        "type": "tests",
        "attributes": {
            "name": "Test With All the DEVs",
            "description": "Testing the pass fail status",
            "priority": "highest",
            "status": "Pass",
            "run-status": "Pass"
        },
        "steps": {
            "data": [
                {
                    "name": "step one",
                    "description": "Step 1 description",
                    "expected-results": "result"
                },
                {
                    "name": "step two",
                    "expected-results": "result2"
                }
            ]
        }
    }
}`;

var _stringForAddress = `{
    "id": 0,
    "externalUserId": "6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274",
    "firstName": "Q",
    "lastName": "D",
    "addressLine1": "7030 NW Beaver Dr",
    "addressLine2": "",
    "city": "Johnston",
    "stateProvinceRegion": "IA",
    "zipCode": "50131",
    "countryCode": "US",
    "phone": "5158670780",
    "createdAt": "2023-12-13T15:31:28.971Z",
    "lastUsedAt": "2023-12-13T15:31:28.971Z",
    "isEasyPostVerified": true,
    "easyPostShippingAddressId": "",
    "isDefaultAddress": true
  }`;

var _bodyJason = JSON.parse(_bodyString);
var _bodyJasonForAddress = JSON.parse(_stringForAddress);

test('API POST Request', async({request, baseURL}) => {
    
    const _response = await request.post(`${baseURL}/projects/20787/tests.json`, { 
        // data section is for the request body 
        "data": _bodyJason
        
        // We can pass headers here if we want: like below but we will move this into the config
        //, headers: {}
    });
    expect(_response.status()).toBe(200);
    console.log(await _response.json());
})

const getAddresses = 'https://addressbook-api.tcgplayer-qa.com/v1/6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274/userAddressBooks';

test('API GET Request', async({request}) => {
    
    const _response = await request.get(`${getAddresses}`)
    
    //
    const _responseJson = JSON.parse(await  _response.text())
    console.log(_responseJson.results[0][0])
    console.log(_responseJson.results[0][0].firstName)
    expect(_responseJson.results[0][0].firstName).toBe("Automation")
})

const _addAddress = 'https://addressbook-api.tcgplayer-qa.com/v1/userAddressBooks/add?ignoreCorrections=true';

test('Address API POST Request', async({request}) => {
    
    const _response = await request.post(`${_addAddress}`, { 
        // data section is for the request body 
        "data": _bodyJasonForAddress
        
        // We can pass headers here if we want: like below but we will move this into the config
        //, headers: {}
    });
    expect(_response.status()).toBe(200);
    
    
})

test('Get a specific address by id', async({request}) => {
// TO DO For Qadirya
// Send a GET request
// https://addressbook-api.tcgplayer-qa.com/v1/6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274/userAddressBook?AddressBookId=0
})

test('Verify error message if a specific address by id is not found', async({request}) => {
    // TO DO For Qadirya
    // Send a GET request
    // https://addressbook-api.tcgplayer-qa.com/v1/6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274/userAddressBook?AddressBookId=0
})

test('Update an existing address', async({request}) => {
    var stringForAddress = `{
        "id": 1846991,
        "externalUserId": "6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274",
        "firstName": "Ryan",
        "lastName": "D",
        "addressLine1": "440 S Warren St",
        "addressLine2": "",
        "city": "Syracuse",
        "stateProvinceRegion": "NY",
        "zipCode": "13207",
        "countryCode": "US",
        "phone": "5158670780",
        "isDefaultAddress": false
      }`;

    var bodyJasonForAddress = JSON.parse(stringForAddress);

    const updateAddress = 'https://addressbook-api.tcgplayer-qa.com/v1/userAddressBooks/update?ignoreCorrections=true';

    const response = await request.post(updateAddress, { data: bodyJasonForAddress });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // you would be able to assert on the response body like this but there is no response body for this endpoint.
    // expect(await response.json()).toContainEqual(expect.objectContaining({
    //     firstName: 'Ryan'
    // }));
})
    
test('Set an existing address to default address', async({request}) => {
    const setDefault = 'https://addressbook-api.tcgplayer-qa.com/v1/6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274/userAddressBooks/setdefault/1846991';

    const response = await request.post(setDefault);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
})

test('Delete an address', async({request}) => {
    // TO DO For Bharati
})