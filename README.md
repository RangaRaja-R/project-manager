project manager
features:
	daily task scheduler
	projects with tasks inside it
	seperate tasks
	notes
Front end (ReactJS)
	not done
		-plan pages
		-design
		-features
Back end (Django REST)
	not done
		-apis
		-user login system
		-security
		-database(cloud)
		-deployment
	models
		User:
			Tasks
			Notes
		Project:
		        Title
		        Description (optional)
		        Owner (foreign key to the User model)
		        Created date and time
		        Due date (optional)
		        Status (e.g., "Open," "In Progress," "Completed," "Archived")
		        Visibility (e.g., "Public," "Private") (optional, for collaborative projects)
			Tasks(List of foreign key Task model)
		        (optional) Members (ManyToManyField to User for team members)
		Task: for each user
		        Title
		        Description
		        Status (e.g., "To Do," "In Progress," "Completed")
			Deadline (Last date to complete task)
			completion percentage
		+for task inside projects(common for people in project)
			Project (foreign key to the Project model)(optional)
		        Priority (e.g., "High," "Medium," "Low")
			Difficulty ("high", "medium", "low", "default")
		+if group project:
			Assigned by, Assigned user (foreign key to the User model)
			(optional)
		        Estimated duration
			Category("bug", "feature", "page")
		        Dependencies (ManyToManyField to Task for task dependencies)
		Notes:(seperate for users)
			text
			creation date
			project



phase 1: Planning
	features planing
phase 2: Backend
	models,serializers
	views, urls
	database
	authentication
	testing(after every steps)
phase 3: Frontend
	plan pages
	design cards
	basic page
	API test
	start designing
phase 4: deployment
	use docker
	plan deployment