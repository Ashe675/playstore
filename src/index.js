const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('appName', 'Play Store');

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : false}));


app.use(express.static(path.join(__dirname,'public')));

app.use((req,res)=>{
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), ()=>{
    console.log(`Server ${app.get('appName')} on http://localhost:${app.get('port')}`);
});