// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setId("Press Me");
btn.move(10,10);
btn.onclick(function(e){
	console.log(e);
	console.log(e.target);
});
btn.stateChanged(function(e) {
	console.log(e);
});

var chkbox = new MyToolkit.CheckBox;
chkbox.move(10,10);
chkbox.setId("Complete A3");
chkbox.onclick(function(e){
	console.log(e);
});
chkbox.stateChanged(function(e) {
	console.log(e);
});

var radiobtn = new MyToolkit.RadioButtons;
radiobtn.setButtons(["apples","peas","tomatoes"]);
radiobtn.move(10,10);
radiobtn.onclick(function(e){
	console.log(e);
});
radiobtn.stateChanged(function(e) {
	console.log(e);
});

var txtbox = new MyToolkit.TextBox;
txtbox.move(10,10);
txtbox.textChanged(function(e) {
	console.log(e);
});
txtbox.stateChanged(function(e) {
	console.log(e);
});
txtbox.type("This is a textbox");


