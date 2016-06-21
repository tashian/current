Build a simple social media aggregator in Node!

- Every five minutes:

- Pull Instagram media via their API
'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + INSTAGRAM_ACCESS_TOKEN

- Medium posts via RSS
https://medium.com/feed/@tashian

- Twitter timeline
https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=tashian&exclude_repies=true&count=20

- Final JSON output format
[
  {
    "source": "twitter",
    "createdAt": "2016-04-23T18:25:43.511Z",
    "text": "This is a tweet about dogs",
    "url": "http://twitter.com...",
  },
  {
    "source": "instagram",
    "createdAt": "2016-04-22T18:25:43.511Z",
    "caption": "Sunset pic.",
    "images": { ... },
    "url": "http://instagram.com...",
    "type": "image"
  },
  {
    "source": "instagram",
    "createdAt": "2016-04-21T18:25:43.511Z",
    "caption": "Sunset video!!",
    "videos": { ... },
    "images": { ... },
    "url": "http://instagram.com...",
    "type": "video"
  },
  {
    "source": "medium",
    "createdAt": "2016-04-20T18:25:43.511Z",
    "title": "Article about clouds",
    "url": "http://medium.com...",
    "readingTime": "7 mins",
    "image": "https://cdn-images-1.medium.com/max/1200/1*DeiKjabeUsFcTYtUfH-SlQ.jpeg"
  }
]
