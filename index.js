// const fs = require('fs');
// function readCourses() {
//   const data = fs.readFileSync('courses.json', 'utf8');
//   return JSON.parse(data);
// }

// function writeCourses(courses) {
//   fs.writeFileSync('courses.json', JSON.stringify(courses, null, 2), 'utf8');
// }

// function mw(req, res, next) {
//   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   const hostname = req.hostname;
//   const date = new Date();

//   console.log(`IP: ${ip}, Hostname: ${hostname}, Date: ${date}`);
//   next();
// }

// // Middleware to parse JSON bodies
// app.use(mw);

// app.get('/courses', (req, res) => {
//   const courses = readCourses();
//   res.json(courses);
// });

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.post('/courses', (req, res) => {
//   const courses = readCourses();
//   const { name, description, videos } = req.body;
//   const id = courses.length + 1;
//   const newCourse = { id, name, description, videos };
//   courses.push(newCourse);
//   writeCourses(courses);
//   console.log("Appended course:", newCourse);
//   res.status(201).json(newCourse);  // Send back the added course as a response
// });

// // Update course name by ID
// app.put('/courses/:id', (req, res) => {
//   const courses = readCourses();
//   const courseId = parseInt(req.params.id, 10);
//   const { name } = req.body;

//   const course = courses.find(course => course.id === courseId);

//   if (course) {
//     course.name = name;
//     writeCourses(courses);
//     console.log(`Updated course with ID ${courseId}:`, course);
//     res.status(200).json(course);
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// });

// app.delete('/courses/:id', (req, res) => {
//   const courses = readCourses();
//   const courseId = parseInt(req.params.id, 10);
//   const courseIndex = courses.findIndex(course => course.id === courseId);

//   if (courseIndex !== -1) {
//     const deletedCourse = courses.splice(courseIndex, 1);
//     writeCourses(courses);
//     console.log(`Deleted course with ID ${courseId}:`, deletedCourse);
//     res.status(200).json({ message: 'Course deleted', course: deletedCourse });
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// });

const express = require('express');
const app = express();
const PORT = 6969;
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect("mongodb+srv://Sam-wiz:x1IA8Qlq77aIv35E@cluster1.dtxhy8j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("Failed", err);
  });

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: String,
    required: true
  },
  isInStock: {
    type: Boolean,
    required: true
  },
  Category: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products', async (req, res) => {
  const body = req.body;
  console.log("Request Body:", body);
  try {
    const product = await Product.create({
      product_name: body.product_name,
      product_price: body.product_price,
      isInStock: body.isInStock,
      Category: body.Category
    });
    console.log("Created Product:", product);
    return res.status(201).json({ message: "Product Created", product });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
