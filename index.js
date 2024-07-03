const express = require('express');
const app = express();
const PORT = 6969
let courses = [
    {
      "id": 1,
      "name": "Course 1",
      "description": "Description for course 1",
      "videos": [
        {
          "id": 1,
          "title": "Video 1",
          "url": "https://www.example.com/video1.mp4"
        },
        {
          "id": 2,
          "title": "Video 2",
          "url": "https://www.example.com/video2.mp4"
        }
      ]
    },
    {
      "id": 2,
      "name": "Course 2",
      "description": "Description for course 2",
      "videos": [
        {
          "id": 3,
          "title": "Video 3",
          "url": "https://www.example.com/video3.mp4"
        }
      ]
    }
  ];

  app.get('/courses', (req, res) => {
    res.json(courses);
  })

  app.get('/',(req, res) => {
    res.send('Hello World');
  } )

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });