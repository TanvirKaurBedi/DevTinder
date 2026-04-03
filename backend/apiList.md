#DevTinder Api List

Auth Router
-POST /signup
-POST /login
-POST /logout

Profile Router
-GET /profile/view (for getting loggedIn User Profile Info)
-PATCH /profile/edit (for updating loggedIn User Profile Info)
-PATCH /profile/password (for updating the loggedIn User password)

ConnectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
(We can make the status dynamic one api for above for apis that is below
-POST /request/send/status/:requestId)

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId
(We can make the status dynamic one api for above for apis that is below
-POST /request/review/status/:requestId)

User Router
-GET /user/connections
-GET /user/request/received
-GET /user/feed (gets you the profile of other users using this platform)

-status  
ignored
interested
accepted
rejected
