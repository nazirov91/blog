---
templateKey: blog-post
title: Just enough TypeScript for Angular 6+
date: '2018-08-26T10:51:56-04:00'
description: Fundamentals of TypeScript needed for developing Angular applications
tags:
  - Angular
  - TypeScript
---
## Just enough TypeScript for Angular

Angular Framework is written in TypeScript. All of the pre-generated scripts and code samples are also in TypeScript. So, it makes total sense to get little bit familiar with TypeScript before we dive in to the world of Angular.

### 1. What is TypeScript?
* **TypeScript** is a superset of **Javascript**, which means it is built on top of Javascript and fully supports Javascript syntax. It mainly provides *optional* **static typing, classes** and **interfaces.**


**Why use TypeScript?**
The biggest advantage of using TypeScript instead of Javascript is that, it provides the IDEs to detect the errors in your code in *compile time* or ***as you type***, not in runtime. 

---
### 2. Variable declarations
There are two ways to declare variables in TS: Using ***var*** and ***let***:

**`var`** - is scoped to the nearest function block. The scope is global when declared outside of the function.
**`let`** - is scoped to the nearest enclosing statement or expression, which can be smaller than a function block.

*Constants* are declared using the keyword ***const***.
**`const`** - is scoped similar to `var` and allows you to create  **read only** reference to a value. Constants declared with `const` must be initialized right away.

> It is recommended to use only **let** and **const** to make your code more predictable and bug free.
---
### 3. Basic types
Below is the list of basic types in TS.
1. **Boolean**
2. **Number**
3. **String**
4. **Array**
5. **Tuple**
7. **Any**

**Boolean**
```typescript
let done: boolean = true;
let done: boolean = false;
```
**Number**
In TypeScript, all numbers are floating point values, just like in Javascript.
```typescript
const year: length = 10;
const height: number = 6.1;
```
**String**
Strings can be declared using single quotes as well as double quotes.
```typescript
const firstName = 'Michael';
const lastName = "Jackson";
```
We can also use ***Template Strings*** with back-ticks which allow us to write multiline strings and embed expressions
```typescript
let bintree = 'bintree.net';
let multiLineString = `
	Hi there,
	This is Sardor from ${bintree}
`;
```
**Array**
```typescript
const myArray: number[] = [1,2,3]; // Regular array type
let yourArray: Array<number> = [4,5,6]// Generic array type
```
**Tuple**
When we want to declare an array with different variable types, we cannot use the regular array, we have to use Tuple. 
```typescript
let todo: [number, string, boolean]; // Initialize
todo = [1, 'Go shopping', true] // Correct
todo = ['Go shopping',1, true] // Incorrect. Order must be followed
todo[2] = true; // Correct
todo[3] = 'Important'; // Correct, because it is one of number|string|boolen
```
**Any**
When we are not sure about the type of the variable we are creating or if it is going to be dynamically assigned, we can use the keyword *any*. It allows you to declare a variable that can be of any type.
```typescript
let someVariable: any;
someVariable = 2.2;
someVariable = "Now we re-assign a string";
someVariable = true;
// Also, we can use it with arrays and assign mixed types of variables
let mixedArray: any[] = ['dog', 2, true];
```

> For the complete list of types please refer to the [TypeScript Documentation](http://www.typescriptlang.org/docs/handbook/basic-types.html)
---
