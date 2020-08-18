# CS361-Group Project

A store inventory management system, built for the web.

### Architecture
![Monolith](./documentation/apple_cart_monolith.png)

### Contributors
* Kevin Joy - joyke@oregonstate.edu
* George Kochera - kocherag@oregonstate.edu
* Blake Lester - lesterst@oregonstate.edu
* Quinn Wilkins - wilkinsq@oregonstate.edu
* Ellen Yang - yange@oregonstate.edu

### Technology Stack

The Apple Cart uses a simple, lightweight technology stack.

Front-End      | Back-End
---------------|---------
HTML           |  Node.JS
Bootstrap CSS  |  Express
Javascript     |  Handlebars
&nbsp;         |  Sessions
&nbsp;         |  My SQL

### Database Design
<img src="./documentation/CS361_ERD.png" alt="ERD" width="500">
<img src="./documentation/CS361_Schema.png" alt="Schema" width="500">

### Setup

1. Make sure you have a version of Node.JS installed on your machine. Every system and setup is a bit different so the best instructions can be found at [Node.JS](https://nodejs.org/en/).
2. Clone the repository to your machine in whichever manner suits you best. Command-line or via an IDE.
3. Open a terminal/command-prompt window and navigate to the folder containing 'app.js'.
4. Run the following command:
`npm install package.json`
This will install all the dependencies for our team's app for you, on your local machine. (Things like handlebars, express and anything we may implement later.)

At this point, the web app is 'installed' and ready to use. Anytime you want to run the app, you would do the following from the command-line in the folder that contains 'app.js'
`node app.js`
As long as you do not get any errors, you should be able to open up your browser, and navigate to http://localhost:8080. This is the running instance of the web app. 


### Standards

- Handlebars is set to use *.hbs file-extension. To save everyone from having to type *.handlebars when creating new templates.
- The ClearDB (MySQL) database credentials are stored in process.env.CLEARDB_DATABASE_URL
- All static assets such as pictures, icons, JS files, and stylesheets can be stored in ./public and the path to those assets can be referred to in HTML as './css/example.css' or './img/apple_cart.jpg' as examples.
- When writing SQL queries, use the following convention to avoid possible conflicts down the road: (1) table and attribute references are all lowercase (2) SQL commands and reserved words are all caps. Ex: `SELECT first_name, last_name FROM users WHERE id = 1`
- New Convention: When creating new classes for use, prefix them with 'gt_' or 'gt-' so that our team knows this was a class created by one of us. GT stands for Globetrotters! This helps differentiate between standard Bootstrap classes.

## Github Best Practices

- Always work in a local branch (NOT local master). 
- If you are unsure which branch you are in, type "git branch" and it will show you all branches, as well as highlight the one you are in.
- "git branch" should be your favorite command and you should use it freqently to ensure you are not changing your local master.
- Should should only have to clone the github repository one time in the beginning. For the remainder of the project, you can use "git status" to check if your local master is up to date with the remote master on git hub. If it is not, you can use "git pull" to update your local master.


#### Assumed from here: you have a cloned github copy on your desktop, you have no unmerged branches, you want to add a new feature
  1.  In terminal, navigate to your local github repository
  2.  Use "git branch" to determine what branch you are in
  3.  Use "git checkout master" to navigate to your local master
  4.  Use "git status" to determine if you are in sync with the remote master on git hub
  5.  Use "git pull" to pull in any changes and update your local master to match git hub (not needed if there are no changes)
  6.  Use "git branch <name>" to create a new local branch based on your now updated local master
  7.  Use "git checkout <name>" to switch to the new branch
  8.  Make any changes that you want to make localy
  9.  Use "git status" to see changes
  10. Use "git diff" to review the differences line by line
  11. Use "git add <filename>" to designate the file you want to push to git hub
  12. Use "git add <filename>" again if you have another file to add (it will highlight all files added)
      - Note: Erroneous files may appear here. Some are hidden files automatically created by your computer or system. You can add these to the gitignore file on     github and you won't have to see them again.
  13. Use "git commit -m "your message here" to commit the changes on your local branch, add a breif message on what the commit changes
  14. Use "git branch" one more time to ensure you are working in your local branch
      - Warning: If you find that you accidently did your changes on your local master branch, DON'T push to master. You have a few options at this point. See "Working on master instructions".
  15. Use "git push" to push the local branch to github and create a new remote branch on git hub

Log into git hub and navigate to the branch you've just created to review your changes. If you are satisfied, you can create a "pull request" and add your programing partner as the person you are requesting to review the code.

Once the code is reviewed, your programming partner can merge the code to master, and all is done!

#### Instructions when you were accidentally working in your local master branch:
  1.  Run "git log" to see all commits
  2.  Find the most recent commit that is also on the remote master (git hub's master branch)
  3.  Copy the commit hash for that commit
  4.  Use  "git reset --soft <commit_hash>" to uncommit your current changes (this will not erase your changes, it will only un-commit them).
  5.  Use "git status" to verify that your changes are still there and they are staged (they will be green).
  6.  Use "git restore --staged <file>" to unstage the changes
  7.  Use "git status" again to verify that your changes are still there, but now they are unstaged (they will be red).
  8.  Use "git branch <name>" to create a new branch with your current changes
	9.  Use "git checkout <branch>" to switch to that branch
  10. Now you can add, commit, and push to your new branch as normal
