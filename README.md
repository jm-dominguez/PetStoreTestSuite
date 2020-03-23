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
4. Execute
```
npm test
```


