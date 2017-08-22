![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Spotlight Readme
### Installation and setup

- Download or clone the repo for both the back and the front end.
- `yarn` to install dependencies
- `gulp` to compile the sourec code and open in browser.

> **Note**: You'll need to have `gulp-cli` installed glboally
> `npm i -g gulp-cli`

## Project Description
As it was our final project within our time at GA, we decided to work in a team of three to develop a social awareness forum. We wanted to create a forum for users to be able to share issues and information on social subjects that they find important and want to share with others. 

The back end of the app was made using Ruby on Rails and for the front end we used AngularJS. We used a PostgresQL database and join tables to create relationships between users their posts and comments and notifications so that information can be shared accessed at different points in the project.

![Posts Index](http://i.imgur.com/UmPMnIS.png "Posts Index page")
 
 * On arrival to the page, any user is able to access the index page of posts to be able to view what others have posted. However to be able to post themselves, or leave comments, a user has to register and login. 

* A user can access a show page from each post by clicking on a post on the index page. Once within the show page, if the user has created the post they are able to to access edit and delete buttons to the post. A registered user is also able to add comments to a post.

![Post Show Page](http://i.imgur.com/xu643Bi.png "Post show page")

* Within the comments section, we wanted to give users the ability to be able to 'mention' each other. This way, if there was a post that a user thinks another user may like, they can mention them in a post and a notification will be sent to the receiver immediately to direct them straight to the post. 

![Comments section](http://i.imgur.com/S65kXHe.png "Comments section on post page")

* Once a user receives a notification, there is an alert in the navigation bar. The notification tells the receiver who has sent the notification and when clicked takes them directly to the post and comment in which they have been mentioned.

![Notifications](http://i.imgur.com/WodFKvk.png "Notifications") 

## Technologies Used
Below is a list of the technologies that we used to create this project.


* HTML5
* SASS3
* Yarn
* Bower
* Babel
* Gulp
* AWS
* JavaScript ES6
* PostgresQL
* AngularJS
* Angular UI Router
* Angular Messages
* Angular Sanitize
* Bulma
* AWS-SDK
* Git
* GitHub
* Ruby on Rails
* Ruby

## Challenges

### The main feature of our app was to allow users to 'mention' each other in posts.

We started this feature by creating a 'mentions' directive that would form the basis of the comment section under the post.
We decided to have the app handle the mentions from the front end of the app so we could use a filterFilter to be able to search through the comments that are posted and detect a mention.

A RegEx was created to detect, whilst the user is typing, if they have placed an '@' in the comment        followed by any letters that could be the beginning of a user name. Once an @ has been detected, an unordered list appears above the comments section with all the possible usernames that can be mentioned. A user can then click on a name or use arrow keys to select and enter the username they require. Then we used $$postDigest
to allow the directive to carry on searching through the comment for more mentions so that more than one user can be highlighted.

Once the whole comment is complete and has been posted the username that has been mentioned is highlighted blue to let the user know that a mention is within the comment. This is completed by a function that is made in the posts controller, where the same RegEx created in the directive is used to detect and replace the user name with a span that shows a highlighted username.

## Future Improvements
There are few features that we would like to add to the site, these include:

#### PDF Reader
we wanted to add a PDF Reader to be able to create even easier access to reading materials or to be able to upload/download open letters.

#### External APIs
In particular an API such as Tumblr, as an easy way to be able to find blogs that you may not have heard of and see what others are saying about subjects discussed on the forum.

This project was created by:
[**Angela Maugey**](https://github.com/maugeya)
[**Mike de Groot**](https://github.com/mikejdegroot)
[**Jack May**](https://github.com/Jack11709)

##Using The Site
If you are interested in registering and using the Spotlight app please visit [here.](https://intense-shelf-36393.herokuapp.com/)


