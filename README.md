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
- [Expenses](#Expenses)


### Users

| Name     | Type   | Required | Unique | Notes |
| -------- | ------ | -------- | ------ | ----- |
| id       | integer| yes      | yes    | User's id |
| username | string | yes      | yes    | User's username |
| password | string | yes      | no     | User's hashed password |
| email    | string | yes      | yes    | User's email |


### Profile

| Name      | Type    | Required | Unique | Notes |
| --------- | ------  | -------- | ------ | ----- |
| profile_id| integer | yes      | yes    | profile's id |
| username  | string  | yes      | yes    | User's username|
| first_name| string  | no      | yes    | user's name |
| last_name | string  | no      | yes    | user's last name |


### Trips

| Name      | Type    | Required | Unique | Notes |
| --------- | ------  | -------- | ------ | ----- |
| trip_id   | integer | yes      | yes    | Trip id |
| destination| string | yes      | yes    | Trip's destination |
| description| string | yes      | yes    | Trip description/comments |
| create_trip| integer| yes      | yes    | create trip |
| trip_start| date    | no       | yes    | Start Date |
| trip_end  | date    | no       | yes    | End Date |
| completed | expenses| no       | yes    | Completed: Yes/No|


### Expenses

| Name        | Type    | Required | Unique | Notes |
| ----------- | ------  | -------- | ------ | ----- |
| expense_id  | integer | yes      | yes    | expense id |
| trip_id     | integer | yes      | yes    | Trip ID |
| description | string  | yes      | no     | Trip description/comments |
| amount      | integer | yes      | no     | Trip total amount |
| countUsers  | integer | yes      | no     | Number of people on trip |
| folksPaid   | integer | no       | no     | Number of people that paid |



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
https://bw-trip-split.herokuapp.com/api/profile/:id

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

To update if completed:
https://bw-trip-split.herokuapp.com/api/trips/:id/updateStatus

To add a trip:
https://bw-trip-split.herokuapp.com/api/trips/addTrip

Expects an object with this format as the request body:

```
  --header "Content-Type: application/json"
  --data: 
{
	trip_id: 1,
	destination: 'Test Place 1',
	description: 'Test Trip 1',
	create_trip: 1,
	trip_start: Date.now()
}
```


### Expenses
https://bw-trip-split.herokuapp.com/api/:tripid/expenses/

Expects an object with this format as the request body:

```
  --header "Content-Type: application/json"
  --data: 
{
	expense_id: 1,
	trip_id: 3,
	description: 'Test 1',
	amount: 1
}
```



