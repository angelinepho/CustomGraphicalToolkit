// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

var window = SVG().addTo('body').size('500','500')

// Implement a MyToolkit Button
var btn = new MyToolkit.Button(window, "Button");
btn.move(0,0);
btn.clickChanged(function(e){
	console.log(e);
});
btn.stateChanged(function(e) {
	console.log(e);
});

var checkBox = new MyToolkit.CheckBox(window, "Check Box");
checkBox.move(150,0);
checkBox.checkChanged(function(e){
	console.log(e);
});
checkBox.stateChanged(function(e) {
	console.log(e);
});

var radioBtns = new MyToolkit.RadioButtons(window, ["Radio Button 0", "Radio Button 1", "Radio Button 2", "Radio Button 3", "Radio Button 4"]);
radioBtns.move(0,100);
radioBtns.checkChanged(function(e){
	console.log(e);
});
radioBtns.stateChanged(function(e) {
	console.log(e);
});

var textBox = new MyToolkit.TextBox(window);
textBox.move(0,300);
textBox.textChanged(function(e) {
	console.log(e);
	console.log(textBox.getText());
});
textBox.stateChanged(function(e) {
	console.log(e);
});
//console.log(textBox.getText());

var scrollBar = new MyToolkit.ScrollBar(window, 400);
scrollBar.move(400,0)
scrollBar.scrollChanged(function(e) {
	console.log(e);
});
scrollBar.stateChanged(function(e) {
	console.log(e);
});

var progressBar = new MyToolkit.ProgressBar(window, 400, 25);
progressBar.move(0,450)
progressBar.incrementChanged(function(e) {
	console.log(e);
});
progressBar.stateChanged(function(e) {
	console.log(e);
});
progressBar.increment(50)
// progressBar.increment(100)

var toggle = new MyToolkit.ToggleButton(window);
toggle.move(0,350)
toggle.toggleChanged(function(e) {
	console.log(e);
});
toggle.stateChanged(function(e) {
	console.log(e);
});