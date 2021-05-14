// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setId("Press Me");
btn.move(20,20);
btn.onclick(function(e){
	console.log(e);
	console.log(e.target);
});
btn.stateChanged(function(e) {
	console.log(e);
});

var chkbox = new MyToolkit.CheckBox;
chkbox.move(20,20);
chkbox.setId("Complete A3");
chkbox.onclick(function(e){
	console.log(e);
});
chkbox.stateChanged(function(e) {
	console.log(e);
});

var radiobtn = new MyToolkit.RadioButtons;
radiobtn.setButtons(["kale","celery","lettuce"]);
radiobtn.move(20,20);
radiobtn.onclick(function(e){
	console.log(e);
});
radiobtn.stateChanged(function(e) {
	console.log(e);
});

var txtbox = new MyToolkit.TextBox;
txtbox.move(20,20);
txtbox.textChanged(function(e) {
	console.log(e);
	console.log(txtbox.getText());
});
txtbox.stateChanged(function(e) {
	console.log(e);
});

var scrlbar = new MyToolkit.ScrollBar;
scrlbar.move(20,20)
scrlbar.setHeight(400)
scrlbar.scrollChanged(function(e) {
	console.log(e);
});
scrlbar.stateChanged(function(e) {
	console.log(e);
});

