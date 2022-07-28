# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


(Note: I'm making the assumption that the DB is relational, but included some details if it is NoSQL.)


---- 
Ticket 1: update DB schema with new table: Agent_ID_Mapping

Details: 

New fields to add: agent_id (pk), facility_agent_id (UUID, NOT NULL)

(If it's NoSQL then we'd simply add a new facility_agent_id to the JSON schema of the Agent table/collection)

Outstanding Questions for Product Team: none

Time estimate: 
- 1 hour (or small if T-shirt sizes, 1 if story points, etc)

Acceptance Criteria: 
  (if relational/SQL) : a new Agent_ID_Mapping table exists with the agent_id and facility_agent_id fields
  (if NoSQL): the facility_agent_id field is addd to the Agents table/collection

Testable by QA?: no

How will this impact production: minimally

What Regressions might this cause?: should be low risk of regression.

Rollback plan? 

Code Review to be done by: DB/Back end lead

-----


Ticket 2: Perform DB migration 

Details: Updating the DB schema from ticket 1 may necessitate a DB migration.  

Outstanding Questions for Product Team: none

Time estimate: 
Depends on size of existing DB, production impact, etc.  Probably large. Would want dry run in non-prod env with prod dataset to get sense of impact and time.

Acceptance Criteria: 
The Agents table retains all 

Testable by QA?: Yes

How will this impact production: 

What Regressions might this cause?: 
If the migration fails, could lead to system instability and bad data.

Rollback plan: 
If the migration fails there needs to be a rollback plan in place.  (Depends on your deployment/CI type.  If blue/green deploys include DB then simply waiting until successful migration before switching would be ideal.  If only one DB, then need a solid way to restore from previous backup.)

Code Review to be done by:
no code review, this is a DB migration

-----

Ticket 3:  Write function to populate facility_agent_id mappings

Details: Once the DB schema update of Ticket 1 has been finished, we need a way to take the data provided by the facilities and update the Agents table with the Agent ids provided by the facilities.  

This should be an api endpoint which accepts an JSON array of objects representing the agent ids and their corresponding facility_agent_ids.  

Outstanding Questions for Product Team: 

Time estimate: 
1 day

Acceptance Criteria: 
Basic CRUD endpoings exist to allow for bulk update of the Agent_ID_Mapping table, as well as making updated for individual agent ids.
  `:facility_id/agent_mapping` POST to create new Agent Id mappings
  `:facility_id/agent_mapping` GET to fetch all Ids
  `:facility_id/agent_mapping/id` GET to fetch individual Agent Id
  `:facility_id/agent_mapping/id` PUT to update individual Agent Id
  `:facility_id/agent_mapping/id` DELETE to fetch all Ids

Testable by QA?: yes

How will this impact production: 


What Regressions might this cause?: 
There should be little risk of regression by adding new endpoints

Code Review to be done by: back end lead

-----


Ticket 4: Update `generateReport` function to use facility_agent_ids 

Details: 

Modify the  `generateReport` function so that agent metadata uses facility_agent_ids instead of our internal agent_ids

Outstanding Questions for Product Team: 
If the facility has not provided agent ids, should the field should be blank or default to our interal id?

Time estimate: 
half-day

Acceptance Criteria: 
The PDF report produced by `generateReport` function uses the facility_agent_id for the agent, if present.  

Testable by QA?: yes

How will this impact production: 

What Regressions might this cause?: 
The report should be thoroughly tested in scenarios where we both have and do not have facility-provided ids.

Code Review to be done by: whomever



-----

Ticket 5: Update UI to handle facilities adding/changing/deleting agent ids

Details: 

The generate reports section currently has no way for facilities to provide their own internal agent ids for use in the reports we provide for them.  

This ticket is to create an upload section where facilities can upload a spreadsheet of agents and the ids that the facilities use for those agents.  

There should be functionality to export the current list of agents (based on facility id) as a CSV or Excel file, which the facility can then use to fill in their internal agent's Id.

Ideally, we would also provide a table-based view of this spreadsheet in the UI to allow facilities the ability to add and change agent ids individually.  However that feature could be added at a later time.

Assume Excel and CSV input for starters, although we may need to accomodate more input types in the future.

The data from the file should be converted to JSON and sent to the api endpoints defined in ticket 3.

Outstanding Questions for Product Team: 
What formats will be accepted for ingesting the mapping docs from facilities?  
Are we currently exposing our Agent_ids to Facilities in the report, or only name and other metadata?  Would it be ok for our agent_ids to be listed in the spreadsheet along Agent name, in order to make the mapping process easier?  If not we'd need to perform a join on Agent name in order to populate the DB.

Time estimate: 
1-2 days.

Acceptance Criteria: 
The reports page can export a file with all Agents for the logged in Facility, and can import a similar file with mappings between the agent and the 

Testable by QA?: 

How will this impact production: 

What Regressions might this cause?: 

Code Review to be done by:  front end lead


