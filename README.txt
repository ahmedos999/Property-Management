*** Property Management system ****

this project is used to manage properties and their leads

project allow all kind of operations on the property (create,delete,update,read) with adding customer
and link them to each property

**technical aspects**

for Backend
*technologies*
project uses typescript with Nodejs for logic, expressjs for creating APIs,
Mongoose and mongoDB for Database
jwt is used for authorizing requests with token, token expires in 5 days ONLY for development purposes
bcryt is used to hash passwords before storing in database  
jest for unit testing

*folder structure*
Model: for the Database schemas 
controllers: for the functions manipulating data 
middleware: helper function to ensure correct executions
routes: for defining the API Endpoints for each controller function
server.ts is main server file

*work flow*
First schema is created
then necessary functions are created in the controller using schema to Query database
then middleware are applied if needed
then routes are used to assign each function to endpoint
then the server connected to MongoDB to be ready for use

 to run server:	npm run start

for Frontend
*technologies*
project use typescript with Nextjs, tailwind for styling, ContextAPI for state management 

*folder structure*
components: are reusable parts of the UI that used here to display and show forms for CURD options
context: is for CONTEXTAPI to keep state global for the project and to manage state
home: is page to display properties and leads, with forms to add and update and them

NOTE : *for updating and linking click the card of property it will show all options*

hooks : are reusable custom Hooks, functions made to make code easy to understand and reuse

types: are special types used for typescript in this project to represent data like (user,property,leads)

to run frontend: npm run dev

NOTE: all files have been committed for the test reasons etc(.env file) 



