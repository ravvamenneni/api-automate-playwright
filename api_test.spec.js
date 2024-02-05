import { test, expect } from '@playwright/test';

const externalUserId = '6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274';
const addressBookId = 1846996;
// AddressBooks Api swagger link:
// https://addressbook-api.tcgplayer-qa.com/swagger/index.html

var _stringForAddress = `{
    "id": 0,
    "externalUserId": "6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274",
    "firstName": "Automation",
    "lastName": "D",
    "addressLine1": "117030 NW Beaver Dr",
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

var requestBody = JSON.parse(_stringForAddress);

test('Get all addresses', async({request}) => {
    const getAddresses = `https://addressbook-api.tcgplayer-qa.com/v1/${externalUserId}/userAddressBooks`;
    const response = await request.get(getAddresses);
    
    var expectedObject = expect.objectContaining({
        errors: expect.arrayContaining([]),
        results: expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({
                    addressLine1: "7030 NW Beaver Dr"
                })
            ])
        ])
    });

    expect(await response.json()).toEqual(expectedObject);
});


test('Add a new address', async({request}) => {
    const _addAddress = 'https://addressbook-api.tcgplayer-qa.com/v1/userAddressBooks/add?ignoreCorrections=true';
    
    const _response = await request.post(`${_addAddress}`, { 
        // data section is for the request body 
        "data": requestBody
        
        // We can pass headers here if we want: like below but we will move this into the config
        //, headers: {}
    });
    expect(_response.status()).toBe(200);
    
    
});

test('Get a specific address by id', async({request}) => {
// TO DO For Qadirya
// Send a GET request
    const getAddressById = `https://addressbook-api.tcgplayer-qa.com/v1/${externalUserId}/userAddressBook?AddressBookId=${addressBookId}`;

    const response = await request.get(getAddressById);
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();

    var expectedObject = expect.objectContaining({
        errors: expect.arrayContaining([]),
        results: expect.arrayContaining([
            expect.objectContaining({
                id: addressBookId
            })
        ])
    });

    expect(await response.json()).toEqual(expectedObject);
});

test('Verify error message if a specific address by id is not found', async({request}) => {
    // TO DO For Qadirya
    // Send a GET request
    // https://addressbook-api.tcgplayer-qa.com/v1/6ECA3F97-BB96-423B-B5B7-BD8B8ACDA274/userAddressBook?AddressBookId=0
    const getAddressById = `https://addressbook-api.tcgplayer-qa.com/v1/${externalUserId}/userAddressBook?AddressBookId=${addressBookId - 10000}`;

    const response = await request.get(getAddressById);
    expect(response.status()).toBe(404);
    await expect(response).not.toBeOK();

    var expectedObject = expect.objectContaining({
        errors: expect.arrayContaining([
            expect.objectContaining({
                code: "ADDRESSBOOKSAPI-2",
                message: "AddressBookNotFound"
            })
        ]),
        results: expect.arrayContaining([])
    });

    expect(await response.json()).toEqual(expectedObject);
});

test('Update an existing address', async({request}) => {
    var stringForAddress = `{
        "id": ${addressBookId},
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
});
    
test('Set an existing address to default address', async({request}) => {
    const setDefaultAddress = `https://addressbook-api.tcgplayer-qa.com/v1/${externalUserId}/userAddressBooks/setdefault/${addressBookId}`;

    const response = await request.post(setDefaultAddress);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Delete an address', async({request}) => {
    // TO DO For Bharati
    const deleteAddress = `https://addressbook-api.tcgplayer-qa.com/v1/${externalUserId}/userAddressBooks/delete/${addressBookId}`;

    const response = await request.delete(deleteAddress);

    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
});