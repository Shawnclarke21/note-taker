const express=require("express");
const app=express();
const PORT =process.env.PORT ||3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes =require('./routes/htmlRoutes');