#DevTinder Api List

-POST /signup
-POST /login
-POST /logout
-GET /profile/view (for getting loggedIn User Profile Info)
-PATCH /profile/edit (for updating loggedIn User Profile Info)
-PATCH /profile/password (for updating the loggedIn User password)
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

-GET /connections
-GET /request/received
-GET /feed (gets you the profile of other users using this platform)

-status
ignored
interested
accepted
rejected
