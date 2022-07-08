
# Project Name: JavaScript capstone project - Your API-based webapp

A web application based on an external API that provides data about food. The webapp have 2 user interfaces.

The wireframe to be followed can be seen on this link:

For homepage:

https://github.com/microverseinc/curriculum-javascript/raw/main/group-capstone/images/Home.png

For popup window:

https://github.com/microverseinc/curriculum-javascript/raw/main/group-capstone/images/Comments.png

-- APIs used for the project:

For food content:

  Meals DB: https://www.themealdb.com/api.php

For storing and retriving data:

Involvment API:  https://www.notion.so/microverse/Involvement-API-869e60b5ad104603aa6db59e08150270


## Requirements:

User stories followed:

- Home page
1. When the page loads, the webapp retrieves data from:
  . The selected API and shows the list of items on screen.
  . The Involvement API to show the item likes.

2. Page should make only 2 requests:
  . One to the base API.
  . One to the Involvement API.

3. When the user clicks on the Like button of an item, the interaction is recorded in the Involvement API and the screen is updated.

4. When the user clicks on the "Comments" button, the Comments popup appears.

5. Home page header and navigation similar to the given mockup.

6. Home page footer similar to the given mockup.

- Comments popup
1. When the popup loads, the webapp retrieves data from:
  . The selected API and shows details about the selected item.
  . The Involvement API to show the item comments.

2. When the user clicks on the "Comment" button, the data is recorded in the Involvement API and the screen is updated.

- Counters that show:
  . The number of items (home).
  . The number of comments (comments popup).

- Counters functions are tested using Jest.

- Use of GitHub Project/Kanban for project control


## Built With:

- Major languages: Javascript, HTML, CSS
- Frameworks: webpack, Jest
- Technologies used: VSC, Github, Gitflow

## Getting Started:

- Clone the repository in your local machine using git clone and the following link:

https://github.com/maury18/JavaScript-Capstone.git

- Install webpack using the following instructions:

npm init -y
npm install webpack webpack-cli --save-dev

If needed, please visit: https://webpack.js.org/guides/getting-started/

- Please run: npm run build and then npm start to see project displayed in your browser.

## Deployment:

- Please visit:  

https://maury18.github.io/JavaScript-Capstone/dist

## Authors

👤 **Author1**

- Mauricio Gallegos

GitHub: https://github.com/maury18

Twitter: https://twitter.com/MauryRodrguez6

LinkedIn: https://www.linkedin.com/in/mauricio-gallegos-rodr%C3%ADguez-380a96183/



👤 **Author2**

- Dario Alessio

GitHub: https://github.com/DarioAlessioR

Slack: https://microverse-students.slack.com/team/U039GCFRK9B

LinkedIn: https://www.linkedin.com/in/dario-alessio-3a3b7911b


## 🤝 Contributing:

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support:

Give a ⭐️ if you like this project!

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📝 License

This project is [MIT](./MIT.md) licensed.
