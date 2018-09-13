---
templateKey: blog-post
title: Algorithmic Complexity
date: '2018-09-11T23:09:14-04:00'
description: 'Asymptotic notations | Big O | Loop analysis '
tags:
  - Algorithms
  - BigO
  - Computer Science
---

# Algorithmic Complexity
In previous post about algorithms ([Algorithms Intro](https://blog.sardor.io/blog/2018-08-24-algorithms/)), we briefly discussed the notion of algorithms and saw couple of examples. In this post, let us dive in little deeper.

Besides the modularity, user friendliness and security of an algorithm, we have to consider the performance of an algorithm. Let's discuss the ways to analyze this matter here to write better and faster algorithms.

To describe the complexity or runtime of an algorithm, we use the concept of **Asymptotic notations**. They help us determine the time/space it takes to perform an algorithm as the _size of the input increases_. There are 3 common notations that we need to know:

* **Big O ($O$)**

* **Big Omega ($\Omega$)**

* **Big Theta ($\Theta$)**

**Big O** defines the _**upper bound**_ of an algorithm's runtime. It computes the _worst case scenario_ for an algorithm or the longest amount of time it can possibly take to complete the task.

**Big Omega** defines the _**lower bound**_ of an algorithm's runtime. It computes the _best case scenario_ for an algorithm or the shortest amount of time it can possibly take to complete the task.

**Big Theta** defines the _**lower and upper bound**_ of an algorithm's runtime. It computes the _average (expected) case_ scenario.

Out of all 3, the most important one is the Big O. Because the best case time complexity is not very useful when describing the performance of an algorithm and for the most part, average case and worst case are the same.

**Common runtimes** (n - input size)

|Name|Runtime|
|--:|:--|
|Constant|$O(1)$|
|Logarithmic|O(\log n)$|
|Linear|$O(n)$|
|N log N|$O(n\log n)$|
|Quadratic|$O(n^2)$|
|Cubic|$O(n^3)$|
|Exponential|$O(2^n)$|

### Space complexity

Space complexity is usually confused with the **Auxiliary Space** used by an algorithm.

* **Auxiliary space** is the temporary space required by an algorithm during runtime

* **Space complexity** is the entire amount of space needed for an algorithm to run, based on the size of the input. It is the combination of Auxiliary space and the space utilized by input.

### Analysis of Loops
Iterative loops play a significant role in building algorithms. Let's look at the commonly used forms

**O(1)**
Complexity of a function is considered to be O(1) if there are no loops or recursions. Also, no calls to other loop including functions must be present.
```javascript
function add(n){
	if(n > 1){
		return 0;
	} else {
		return n+1;
	}
}
```

**O(n)**
Loop is considered to have a complexity of *O(n)* when the loop variable is incremented or decremented by a constant number.
```js
function getSum(let arr){//'arr' is an array of integers
	let sum = 0;
	for(let i = 0; i < arr.length; n++){
		sum += arr[i];' 
	}
	return sum;
}
```

**O(log n)**
Loop is considered to have a complexity of *O(n)* when the loop variable is ***divided*** or ***multiplied*** by a constant number.

```js
function (let n, let c){ // 'c' is a constant number
	let sum = 0;
	for(let i = 0; i < n; i *= c){
		sum += i;
	}
	// OR
	for(let i = n; i >= 0; i /= c){
		sum += i;
	}
}
```
**O(n$^c$)**
Nested loops have O(n$^c$) time complexity, *c* being the total number of loops used. 
The following function has a complexity of O(n$^2$)
```js
function multiplty(let arr){
	let sum = 0;
	for(let i = 0; i < arr.length; n++){
		for(let k = arr.length-1; k >= 0; n--){
			sum += i*k;
		} 
	}
}
```

