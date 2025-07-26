import express from "express";

const app = express();
const port = 3000;
const year = new Date().getFullYear();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { year });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { year });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { year });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
