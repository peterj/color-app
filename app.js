const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// gets the style information from the env variables
// {
//   styleClass: "background-color: #000000; color: #FFFFFF",
//   message: 'Hello',
// }
function getStyleFromEnv() {
  const backgroundColor = process.env.BG_COLOR || '#000000';
  const foregroundColor = process.env.FG_COLOR || '#FFFFFF';
  const message = process.env.MESSAGE || backgroundColor;

  return {
    styleClass: `background-color:${backgroundColor}; color:${foregroundColor}`,
    message,
  };
}

app.get('/version', (req, res) => {
  const pkg = require('./package.json');
  const version = process.env.VERSION || pkg.version;
  res.json({ version });
});

app.get('*', (req, res) => {
  const { styleClass, message } = getStyleFromEnv();

  res.render('index', { style: styleClass, message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Color App running on port ${port}`);
});
