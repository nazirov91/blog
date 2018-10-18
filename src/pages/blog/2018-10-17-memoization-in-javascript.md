---
templateKey: blog-post
title: Memoization in JavaScript
date: '2018-10-17T20:26:57-04:00'
description: >-
  Memoization is a concept of caching function returns in a hash table (object)
  so that the next time we need to call the same function again we will get the
  result in a constant time - O(1) without even executing the function
tags:
  - JavaScript
  - Memoization
  - Cache
---


 ### Steps for caching function returns

1. Create a memoizer function which accepts a function as a parameter returns another function with some logic
	```js
	function memoizer(fn){
		return function(){
			// logic
		}
	}
	```
2. Create an object (cache) to store function returns
	```js
	function memoizer(fn){
		const cache = {};
		return function(){
			// logic
		}
	}
	```
3. That function would have some arguments (or no argument at all). We can access those arguments by using the `arguments` Object that comes with JS.
	```js
	function memoizer(fn){
		return function(){
			// 'arguments' is an `Array`-like object accessible 
			// inside functions that contains the values of the 
			// arguments passed to that function. Eg:{0:12, 1:25}
			const key = JSON.stringify(arguments);
		}
	}
	```
4. Next we add the caching logic to the function that we want to return
	- If the cache objects contains the return value for the given arguments, we return that value. For example, if the function call is   `someFunction(4,5)`, in this case arguments would be 4 and 5, we check the object for these values. If it exists, we return the *value*
	```js
	/* 
	cacheObject = {
		{4,5}: 9,
		{2,2}: 4
	}
	*/
	return cacheObject[{4,5}] // returns 9
	```
	- If the cache object does not contain the a value for given arguments, we forcefully call the function with given arguments using `.apply()` and store the result in the cache object for future usage.

```js
// Memoizer function. Accepts & Returns a function
function memoizer(fn){
	const cache = {};
	return function(){
		// Arguments. e.g: {0: 'apple', 1: 'kiwi'}
		const key = JSON.strinigify(arguments);
		if(cache[key]){
			return cache[key];
		} else {
			// .apply() returns the value of the function
			const value = fn.apply(this, arguments);
			cache[key] = value;
			return value
		}
	}
}

// Wild and calculation heavy function that needs memoization
function multiplier(num){
	return num * num;
}

// We convert the function above into a memoized version of itself
multiplier = memoizer(multiplier);

multiplier(2);
```
---
Same memoizer function with ES6 features
```js
// Memoizer function. Accepts & Returns a function
function memoizer(fn){
	const cache = {};
	return function(...args){// Arguments. e.g: {0: 'apple', 1: 'kiwi'}
		if(cache[args]){
			return cache[args];
		} else {
			const value = fn.apply(this, args);
			cache[args] = value;
			return value
		}
	}
}
```
---

**Memoization** is basically key-value pairs with function arguments as the keys and function returns as the values. If the user provided input exists in the table, we return the value without executing the function, and store the new value in the table if it does not exist. 

One downside of this method is the memory consumption. It may take a lot of space if the volume is high. So it is best to utilize memoization with [pure](https://en.wikipedia.org/wiki/Pure_function) and repetitive functions.

One great use case of memoization is with **recursive** version of the **Fibonacci** function.
```js
// Calculates the nth fibonacci number
function fib(n){
	if(n < 2){
		return n;
	}
	return fib(n - 1) + fib(n - 2);
}

// Memoizing it
fib = memoizer(fib);
```
