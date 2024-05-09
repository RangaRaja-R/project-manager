# project manager
## features:
- personal task scheduling
- projects with tasks inside it
- notes
v2
- chatting among team members
- file sharing
## Front end (ReactJS)
not done
- plan pages
- design
- features
prime color options
-#9361A7
 -with white - #53355F
 -with black - #C5AACF
### Pages
- sign in
- sign up
- home(should say something about project with nav bar)
- navbar
 - name of app on left
 - name of user on right(sign buttons if not logged in)
- Note(in side, like menu bar)
- Tasks(in seperate side-bar as my tasks, like vs-code explorer)
- list of all project
- project home
- has task list, members(if group)
## Back end (Django REST)
not done
- apis(80%)
- database(cloud)
- deployment
done
- user login system
- security(JWT authentication)

### models
**User:**
- Tasks
- Notes

**Project:**
- Title
- Description (optional)
- Owner (foreign key to the User model)
- Created date and time
- Due date (optional)
- Tasks(List of foreign key Task model)
- Members (ManyToManyField to User for team members)

**Task: for each user**
- Title
- Description
- Deadline (Last date to complete task)
- completion percentage
- owner (user who created)

_+for task inside projects(common for people in project)_
- owner (foreign key to the Project model)(optional)
- Priority (e.g., "High," "Medium," "Low")
- Difficulty ("high", "medium", "low", "default")
- status (e.g., "To do," "In progress," "Done")

_+if group project:_
- Assigned by (foreign key to the User model)
- Assigned user (foreign key to the User model)

_(optional)_
- Estimated duration
- Dependencies (ManyToManyField to Task for task dependencies)

**Notes:separate for users**
- text
- creation date

## phase 1: Planning
- features planing - done
## phase 2: Backend
- models - done
- serializers - done
- views
- urls
- database
- authentication - done
- testing(after every steps)
## phase 3: Frontend
- plan pages
- basic page
- API test
(ask pradosh)
- design cards 
- start designing
## phase 4: deployment
- use docker
- plan deployment
