# PetStoreTestSuite
Test Suite for Pet Store API

## Objective
The objective of this project is to create a test suite that is able to identify errors in the different flows of
the store services in the petstore application.

## Justification of service selected
For selecting the service to test I took two different approaches. Firstly, I studied and identified the different 
requests and responses to see which one of the services had more impact on the others. After this analysis I found out
that the service which had more impact was the pet service, as it affects the get inventory request from the store service.
Secondly, I thought about the services from a business point of view. Taking into account that the business is a pet store, the
mission of the company should be directly related to selling products (pets), this means that the service that gives more value to the company is the store services, as it allows the creation of purchase orders. Finally, after studying both points of view, I selected the store service because it supports the core of the business.

## Framework justification
In this projects I used three main frameworks: Jest, Faker js and Axios. 

Jest is a testing framework that has different oracle-like functions called matchers. In addition, it has global functions like afterAll(), that simplify setup and teardown of test cases. Finally, it supports the grouping of test cases that require the same setup using the describe() functions. I selected it because it is easy to setup and requires no configuration.

Axios is a promised based http client. I used it to access the endpoint that was going to be tested.

Faker is a nodejs library for faking data. I used it to generate random data when testing different test cases. As testing with random data is a useful way to find bugs that might not be discovered when testing with "normal" data.

## Setup and execution.

1. Clone the repository using:
```
git clone https://github.com/jm-dominguez/PetStoreTestSuite
```
2. Open the project
```
cd PetStoreTestSuite
```
3. Install dependencies
```
npm install
```
4. Go to config.properties file and configure the project using the API key and the base url
``
BASE_URL = https://petstore.swagger.io/v2/
API_KEY = special-key

``
5. Execute
```
npm test
```

## Testing approach

For testing the different functionalities the approach was the following:

- Firstly, I studied the different urls and identified the "happy path" of each url. In other words, I identified the conditions under which the response of the the request should be succesful and created the corresponding test cases.

- Then, I identified business logic erros that could happen in an individual request and created the corresponding test cases, for instance: 
    - Creating an order with future shipment date, but with a delivered status.
    - Creating a purchase order with a negative quantity.

- Thirdly, I created test cases corresponding to negative testing. This means,  creating test cases where an invalid input is used. For example: 
    - Querying an order with an invalid id.
    - Creating an order with an invalid id.

- Fourthly, I identified more complex business logic scenarios, that depended on more services and created the corresponding test cases, for example:
    - Creating a purchase order for a pet that does not exists.
    - Modifying pet status and checking that the inventory is updated.
    - Adding new pet status and checking that the inventory is updated.
    - Creating a purchase order for a pet that is already sold.

- After identifying the test cases, I wrote them with their respective pre-conditions, steps and expected results in an Excel file. It can be found under the /docs directory of this repository. In the same document I also gave a priority to the test cases, giving the highest priority to the cases that directly tested business logic for orders, as this is the main function an the one that is more mission critical. Then, I gave a second priority to the cases that tested inventory business logic as this is the secondary function of the module. Finally, I gave a third priority to the test cases that tested input (negative tests). 


- Finally, after I started writing the test cases, I separated the different test cases in two groups: Logic testing and Negative testing. Then, inside each group I separated each test case depending on the service (order/inventory). Each service is named as in the Excel file.