# Back-End
Lambda School — Trip Split Build Week Project

https://bw-trip-split.herokuapp.com/ - You should see text: 'Server Live!'

Sections:
- [Tables](#tables)
- [API Endpoints](#api-endpoints)

## Tables
Tables Content:
- [Users](#Users)
- [Profile](#Profile)
- [Trips](#Trips)
- [Trip Members](#TripMembers)
- [Expenses](#Expenses)
- [Member Expenses](#MemberExpenses)


### Users

| Name     | Type   | Required | Unique | Notes |
| -------- | ------ | -------- | ------ | ----- |
| id       | integer| yes      | yes    | User's id |
| username | string | yes      | yes    | User's username |
| password | string | yes      | no     | User's hashed password |
| email    | string | yes      | no     | User's email |


### Profile

| Name      | Type    | Required | Unique | Notes |
| --------- | ------  | -------- | ------ | ----- |
| profile_id| integer | yes      | yes    | profile's id - referenced from user table|
| username  | string  | yes      | yes    | User's username - referenced from user table|
| first_name| string  | no       | yes    | user's name |
| last_name | string  | no       | yes    | user's last name |


### Trips

| Name        | Type    | Required | Unique | Notes |
| ---------   | ------  | -------- | ------ | ----- |
| trip_id     | integer | yes      | yes    | Trip id |
| destination | string  | no       | no     | Trip's destination |
| trip_name   | string  | yes      | no     | Trip description/comments |
| trip_start  | date    | no       | no     | Start Date |
| trip_end    | date    | no       | no     | End Date |
| close_trip  | boolean | no       | no     | Completed: Yes/No|


### Trip Members

| Name         | Type    | Required | Unique | Notes |
| ---------    | ------  | -------- | ------ | ----- |
| id           | integer | yes      | yes    | Trip member id |
| trip_id      | integer | yes      | yes    | Trip id |
| trip_username| string  | no       | no     | Trip username - referencing |



### Expenses

| Name         | Type    | Required | Unique | Notes |
| -----------  | ------  | -------- | ------ | ----- |
| id  	       | integer | yes      | yes    | expense id |
| trip_id      | integer | yes      | no     | Trip ID |
| expense_name | string  | yes      | no     | Trip description/comments |
| expense_total| integer | no       | no     | Trip total amount |


### Member Expenses

| Name               | Type    | Required | Unique | Notes |
| -----------        | ------  | -------- | ------ | ----- |
| id  	             | integer | yes      | yes    | id |
| expense_username   | string  | no       | no     | username for particular expense |
| expense_id         | integer | no       | no     | expense id|
| expense_amount_paid| float   | no       | no     | Amount Paid|





## API Endpoints
Endpoints Content:
- [Login](#Login)
- [Registration](#Registration)
- [Profile](#Profile)
- [Trips](#Trips)
- [Expenses](#Expenses)


### Login


https://bw-trip-split.herokuapp.com/api/auth/login

Expects an object with this format as the request body:
```
{
  "username": "User1",   //string
  "password": "password" //string
}
```
If the username doesn't exist in the [`users`](#users) table or the password doesn't match, it will reject the request with a `401` HTTP status.

If successful, it will return a `200` HTTP status and will return a token:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTU4Mjk1NDg4LCJleHAiOjE1NTgzMDI2ODh9.Lwz-Wfyzto2JJOSJjRqalbonNSwhXSLmNyxMWH-aVRc"
}
```

### Registration

https://bw-trip-split.herokuapp.com/api/auth/register

Expects an object with this format as the request body:

```
  --header "Content-Type: application/json"
  --data: 
{

	"username": "test3", //string
  "email": "test3@test.com", //string
	"password": "test3", //string
}
```

If any of the required fields are missing, it will reject the request with a `400` HTTP status.

If successful, it will return with a `200` HTTP status.


### Profile
https://bw-trip-split.herokuapp.com/api/profile/

Expects an object with this format as the request body:
```
  --header "Content-Type: application/json"
  --data: 
{
	profile_id: 1, 
	username: 'test1', 
	first_name:'Name 1', 
	last_name: 'Last 1'
}
```


### Trips
https://bw-trip-split.herokuapp.com/api/trips

Get/Edit/Delete by id:
https://bw-trip-split.herokuapp.com/api/trips/:id


Expects an object with this format as the request body:

```
  --header "Content-Type: application/json"
  --data: 
{
	trip_id: 1,
	destination: 'Test Place 1',
	close_trip: false,
	trip_name: 'Test Trip 1',
	trip_start: Date.now(),
	trip_end: Date.now()
}
```

### Trip Members
https://bw-trip-split.herokuapp.com/api/tripMembers

Get/Edit/Delete by id:
https://bw-trip-split.herokuapp.com/api/tripMembers/:id


### Expenses
https://bw-trip-split.herokuapp.com/api/expenses/

Get/Edit/Delete by id:
https://bw-trip-split.herokuapp.com/api/expenses/:id

Expects an object with this format as the request body:

```
  --header "Content-Type: application/json"
  --data: 
{
	id: 1,
	trip_id: 1,
	expense_name: 'thing1',
	expense_total: 1
}
```

### Member Expenses
https://bw-trip-split.herokuapp.com/api/expenseMembers/

Get/Edit/Delete by id:
https://bw-trip-split.herokuapp.com/api/expenseMembers/:id



