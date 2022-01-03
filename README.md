# Tweeter Project

Tweeter is a simple, single-page Twitter clone.
The goal is to demonstrate single-page application by showing tweets being submitted and updated.
Page is updated using JQuery and 

## Final Product

### Front Page (Desktop View)
!["Desktop View"](https://github.com/jackiestchen/tweeter/blob/0bbd988837980807be6b2fe3e144bae464cb12d2/public/images/desktop-view-screenshot.png)

### Front Page (Mobile View)
!["Mobile View"](https://github.com/jackiestchen/tweeter/blob/0bbd988837980807be6b2fe3e144bae464cb12d2/public/images/mobile-view-screenshot.png)


## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.


- Type into textarea and click submit to submit tweet.
- New tweet will be shown automatically.
- Error will be shown if tweet does not meet the requirements: non-empty and less than 140 characters.
- Resize window will change page view and orientation

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
