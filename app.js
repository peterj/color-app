const express = require('express');
const morgan = require('morgan');

const app = express();

morgan.token('req-headers', function(req,res){
  return JSON.stringify(req.headers)
 });

app.use(morgan(':method :url :status :req-headers'));
app.set('view engine', 'ejs');

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
