Bucket
------

An event finding application.

Bucket matches users with events based on availability, location, user
preference and friends

Users are presented with one event at a time, and are given the option to keep
the event, or put it back in the bucket.

Events (when kept) are added to the users bucket list. Bucket lists are day
based, and users can follow/share bucket lists.

Events are administered by the creating user, and can be closed-list, open to
friends/friends of friends, and fully open. 

Back-end
--------

The back-end will be an API that:
- gathers and stores user information from an oauth provider
- allows users to create and administer events (with option of scheduling
    events based on availability of users)
- matches users with events based on availability, distance, event type and
    friends in attendance
- catalogs attendance and rating information
- stores and validates bucket lists (a nightly schedule of events) to share
    and follow

Front-end
---------

Front end UI will be a collection of 5 views:
- User login
- the bucket
- the bucket list
- User settings
- Event administration

The most fundamental part of UX is the notion that a Swiping up is putting an
event (back) into the bucket (rejection in the case of a user, or sharing in
the case of an event admin) and Swiping down is taking an event from the bucket
and putting it into your list.

REST spec
---------

| method | secured | owned | URL                  | spec                            |
|:------:|:-------:|:-----:|:--------------------:|:-------------------------------:|
|GET     | ×       | ×     | /                    | test route                      |
|GET     | ✓       | ×     | /users               | secured test route              |
|POST    | ×       | ×     | /users               | login w/fb, returns api id+auth |
|GET     | ✓       | ✓     | /me                  | my profile and private info     |
|PUT     | ✓       | ✓     | /me                  | update profile                  |
|DELETE  | ✓       | ✓     | /me                  | remove profile                  |
|GET     | ✓       | ×     | /users/:user_id      | public user profile             |
|GET     | ✓       | ×     | /users/:user_id/list | public bucket list              |
|PUT     | ✓       | ✓     | /me/list             | my bucket list                  |
|POST    | ✓       | ×     | /pins                | create new event                |
|GET     | ✓       | ×     | /pins                | returns queue of matched events |
|PUT     | ✓       | ✓     | /pins/:pin_id        | update event                    |
|DELETE  | ✓       | ✓     | /pins/:pin_id        | delete event                    |

