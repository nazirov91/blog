---
templateKey: blog-post
title: "What are React Hooks \U0001F3A3 and why you should care about them (Part 1)"
date: '2019-03-02T19:03:57-05:00'
description: (~10mins)
tags:
  - React
  - React Hooks
---
![header](https://drive.google.com/uc?export=view&id=1l-FHunuytQsURlqEmDz7AO6OdHA-VTJL)

* Required version of React: 16.8+

1. Part 1 (This article)
2. [Part 2](https://blog.sardor.io/blog/2019-03-02-what-are-react-hooks-%F0%9F%8E%A3-and-why-you-should-care-about-them-part-2/)

### Outline
1. Intro
2. What is wrong with React Components now?
3. Hooks overview
4. useState
5. useEffect
6. TLDR

## Intro
There is a new kid on the block 😎. React introduced a new feature called **Hooks** which will improve the code quality even more and make creating user interfaces easier. From now on, if you are going to create a new project, you should definitely take advantage of the new addition and keep your projects lean and clean. It was actually released a while ago, but production ready stable version came out recently. So now is the time to really start using them. In this article, we will cover the main concepts and look at some examples. At the end of the article, you will have a fair amount of idea about React Hooks and you can start implementing them in your applications.

Before we dive in to the details of hooks, let us take a step back to understand the motivation behind it.

## What is wrong with React components now?
**3 things**:
1. Classes
2. Hierarchical abyss (Not reusing stateful logic)
3. Big components

#### 1. Classes
 Currently, there are mainly two ways to create components in React. 
 First way is by using stateless functions:
```js
function Greet(props){
	return <h1>Hello there, {props.name}!</h1>;
}
```
Second, using ES6 Classes:
```js
class Greet extends React.Component {
	render(){
		return <h1>Hello there, {props.name}!</h1>;
	}
}
```
*Right, so why are you saying there is something wrong with those two methods*, you ask? 

Well, first of all, there are no classes in JavaScript😳. A class is a syntactical sugar over JavaScript's prototype-based inheritance. In other words, it is just a function with special features, which creates extra work for browser to process. But that is not the problem here. The problem is, classes are harder to understand and do not play well with minifying. They cause issues with hot reloading. Also, people often struggle when deciding to use classes or functions to make the components. Which results in inconsistency. 

*So, why not to use just functions then?*
Functions are stateless. Meaning, we cannot manage state in them. We can pass props back and forth, but that makes it hard to keep track of the changes.


#### 2. Hierarchical Abyss
Just take a look at the picture below. 
![Hierarchical Abyss](https://drive.google.com/uc?export=view&id=1lFszJVsqEVMJN8ArdismuatPMaBSOW8f)

Extreme level of nested component tree makes it difficult to follow the data flow through the app. 

#### 3. Big components
Whether we like it or not, at some point of the development, our application gets large and requires  more complex components. When that happens, our components end up implementing multiple React lifecycles that might contain unrelated data. A single task can be split across different lifecycles. That creates an opportunity for bugs in the application.

## Hooks to the rescue!
Hooks solve all of the issues mentioned above. It does that by allowing us to add state management to *functional components* and use other React features. 
*Say what?*
See, it is usually preferred to use just functions to create components. But as we mentioned above, we cannot manage the state or use lifecycles in our functions. But with the hooks we can!

(If you are thinking, why not use Redux for state management, hold on to that thought. That's a discussion for another time.)

## State Hook
Let's look at an example code that changes a text when we click a button.
```js
import React, { useState } from 'react';

function FruitMaster(){
	const [fruit, setFruit] = useState('Banana');
	return (
		<div>
			<p>Selected:{fruit}</p>
			<button onClick={
				() => setFruit(fruit=='Banana'?'Apple':'Banana')
			}>Change</button>
		</div>
	);
}
```
This is what supposed to happen: <br>
![Apple-Banana gif](http://g.recordit.co/iI2cjOIfVZ.gif)
 
We have a selected text variable, which is set to Banana by default. When we click on the Change button it changes the text from Banana to Apple or vice versa.

Now, let us break down the new elements in the component.<br>
![Component analysis](https://drive.google.com/uc?export=view&id=1HjEJexzPHMf5cS5I4AJp0EPilkfCWKAN)

*What are those things in the state variable?* <br>
![state-variable](https://drive.google.com/uc?export=view&id=1rbsk6dzjAABB7y8DKYlPG9_ysA8_pN2B)

In this case, *setFruit()* is equivalent of **this.setState()**. There is one important difference though. When we use this.setState(), it merges the changes to the state object. State hook on the other hand, will completely **replace** the state with the given value.

We used a state hook called **useState** in this example. There are other hooks too. We will see them soon.

So a hook, is actually a **function** 😃 that uses React features and returns a pair of values: one to hold the state value and one function to manage the value. We can name those values whatever we want. We can set a default value by passing it to the useState function.

Note that we are using a **destructuring assignment** to retrieve the pair of values. If you are not familiar with this method, take a look at [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Having said that, we could actually get the two values this way too:
```js
const stateVariable = useState('Cherry'); //Returns an array with 2 values
const fruit = stateVariable[0];
const setFruit = stateVariable[1]; //function
```

#### Converting
Now, let's convert our functional component to a class based component:
```js
import React from 'react';

export default class FruitMaster extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fruit: 'Banana'
    };
    this.setFruit = this.setFruit.bind(this);
  }

  setFruit(value){
    this.setState({fruit: value});
  }

  render(){
    return (
      <div>
        <p>Selected: {this.state.fruit}</p>
        <button onClick={
          () => this.setFruit(this.state.fruit == 'Banana' ? 'Apple' : 'Banana')
          }>Change</button>
      </div>
    );
  }
}
```
#### Comparison
![comparison](https://drive.google.com/uc?export=view&id=1ceAJnrksgsEKPM3Zuv0rBlrBIbSo2IZX)

We can see from the picture that using hooks reduces code volume almost by half! 🎉

Now, let us address the elephant in the room. *What do we do when we **have more than one variable in state**?*
Simple! Create more state variables.
```js
const [fruit, setFruit] = useState('Banana');
const [food, setFood] = useState('Taco');
```

#### Multiple state variables 
```js
import React, { useState } from 'react';

function FruitMaster(){
	const [fruit, setFruit] = useState('Banana');
	const [food, setFood] = useState('Taco');
	return (
		<div>
			<p>Fruit: {fruit}</p>
			<p>Lunch: {food}</p>
			<button onClick={
				() => setFruit(fruit=='Banana'?'Apple':'Banana')
			}>Change Fruit</button>
			<button onClick={
				() => setFood(food=='Taco'?'Burger':'Taco')
			}>Change Lunch</button>
		</div>
	);
}
```
![fruit-lunch](http://g.recordit.co/ps8uo4r1l9.gif)

*What if I want to store all variables in one object?*, you might ask. Well, go ahead. But one thing to remember is that, **state hook function replaces the state** and not merges to it. this.setState() merges the given values to the state object, hook function does not. But there is a way to fix it. Let us see how:
```js
import React, { useState } from 'react';

function MealMaster(){
	  const [myState, replaceState] = useState({
	    fruit: 'Apple',
	    food: 'Taco'
	  });
	  return (
	    <div>
	      <p>Fruit: {myState.fruit}</p>
	      <p>Lunch: {myState.food}</p>
	      <button onClick={
	        () => replaceState(myState => ({
	          ...myState,
	          fruit: myState.fruit=='Banana'?'Apple':'Banana'
	        }))
	      }>Change Fruit</button>
	      <button onClick={
	        () => replaceState(myState => ({
	          ...myState,
	          food: myState.food=='Taco'?'Burger':'Taco'
	        }))
	      }>Change Lunch</button>
	    </div>
	 );
}
```
We have to use [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to change the only part of the state we need and keep the rest of it as it is.

## Effect Hook
*What about the lifeCycle methods of React? We could use those with classes. But now they are gone...*
Not really.
There is another hook called **useEffect** and we can use it instead of the lifecycles. In other words, we can handle side effects in our applications with hooks. (What is a [side effect](https://www.reddit.com/r/reactjs/comments/8avfej/what_does_side_effects_mean_in_react/)?)

Here is an example of a component that uses familiar lifecycles:
#### Old method
```js
import React from 'react';

class TitleMaster extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: 'Tuna'
		};
	}
	componentDidMount(){
		document.title = this.state.title; // Changes tab title
	}
	componentDidUpdate(){
		document.title = this.state.title;
	}
	updateTitle(value){
		this.setState({title: value});
	}
	
	render(){
		return (
			<div>
		        <button onClick={
		          () => this.updateTitle(this.state.title =='Tuna'?'Donut':'Tuna')
		        }>Update Title</button>
		    </div>
		);
	}
}
```
Our component in action. <br>
![change-title-gif](http://g.recordit.co/IwdvmLXTXD.gif)

The component is bulky even for a small functionality. Code in *componentDidMount* and *componentDidUpdate* is repeated.

#### With hooks
Now let's create the same component with hooks! 
```js
import React, { useState, useEffect } from 'react';

function TitleMaster(){
  const [title, updateTitle] = useState('Tuna');
  useEffect(() => {
    document.title = title;
  });
  return (
      <div>
          <button onClick={
            () => updateTitle(title =='Tuna'?'Donut':'Tuna')
          }>Update Title</button>
      </div>
    );
}

export default TitleMaster;
```
Much cleaner. Less code. Easier to understand.

As we mentioned before, a hook is a function. **useEffect** is also a function that accepts another *function* and an array. Don't worry about the array part for now.

So inside the function we pass to *useEffect*, we can perform our side effect logic. In the example above, we are updating the tab title in the browser. Another common practice is to use *data fetching in the useEffect hooks*. 

We can also use **multiple useEffect hooks in one component**.

Note that we are placing the hooks inside of our component functions. That way they will have access to the state variables.

#### Infinite loop
By default *useEffect* re-renders every time the component changes. Sometime incorrectly implementing the hook might cause infinite loop issue. Remember, we said that the useEffect takes 2 arguments? So the second argument is an object or array of values. Which tells React, "*Hey React, re-run the useEffect only when these state values change*"
```js
const [user, setUser] = userState();
useEffect(() => {
	document.title = user.id;
}, [user.id]); // Re-render the hook Only when user.id changes
```

#### Cleanup logic
**useEffect** hook can also handle cleanup logic. What does that mean? Well, sometimes we subscribe to some APIs and once we are done, we need to unsubscribe from it to prevent any leaks. Or when we create an `eventListener`, we need a way to remove it. 

*useEffect* can do it by returning a function.
```js
import React, { useState, useEffect } from 'react';

function TitleMaster(){
  const [title, updateTitle] = useState('Tuna');
  useEffect(() => {
    document.title = title;
    return () => {
		// Perform clean up logic here
	}
  });
  return (
      <div>
          <button onClick={
            () => updateTitle(title =='Tuna'?'Donut':'Tuna')
          }>Update Title</button>
      </div>
    );
}
```

### TLDR: 
React hooks are special functions that can be used in stateless components. They allow us to hook into react features and add state management to the components. There are 3 main hooks: **useState, useEffect** and **useContext**. *useState* can replaces the current way of declaring state object in the constructor and manipulating values in it by using *this.setState()*. *useEffect* can be used instead of react lifecycles. These hooks are not meant to replace the current way of creating components. They are backwards compatible. No need to rewrite your existing components using hooks. They can make your projects much cleaner by letting you write less code though.

## NEXT > [What are React Hooks 🎣 and why you should care about them (Part 2)](https://blog.sardor.io/blog/2019-03-02-what-are-react-hooks-%F0%9F%8E%A3-and-why-you-should-care-about-them-part-2/)
In Part 2 we will cover the following:
* Context Hook
* How to make custom hooks!
* Important Rules with Hooks
* Real life application example
