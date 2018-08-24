---
templateKey: blog-post
title: Algorithms
date: '2018-08-24T14:26:34-04:00'
description: Basic intro to Algorithms. Work in progress!
tags:
  - algorithms
---

### 1. What is an Algorithm?
* **Algorithm** - is a well-defined set of instructions to solve a problem. 

In other words, an algorithm is a computational **procedure** that takes in an **input**, processes it and then spits out an **output**.

![enter image description here](http://www.akashiclabs.com/wp-content/uploads/2014/07/algorithm_overview.bmp-660x225.png)


There are certain properties an algorithm must have to be considered as valid.
1.  **Input** - an algorithm is provided with input or set of inputs
2. **Output** - an algorithm produces an output
3. **Definite** - an algorithm has clearly described list of steps to execute
4. **Finite** - output is produced in finite number of steps

### 2. Efficiency of algorithms

There are many different algorithms for solving any specific type of problems. They differ in their approach, time to execute and space they need to perform the execution. For example, if we need to find a phone number in the phonebook, we could implement 2 different strategies. 
1. Open the phonebook and look at the first entry. If it is the phone number we are looking for, we are done. If not, check the next entry and so on. Until we find the item we need or until we reach the end of the phonebook.
2. Second strategy takes advantage of the alphabetized order of the phonebook. We open the middle of the phonebook and check the entry. If its what we are looking for, we are done. If not, we decide which side to ignore in the next step to find the entry we need. We repeat the last step until we find the entry or realize that the entry is not in the phonebook.

Those two strategies are actually two valid algorithms. First one is called **Linear search algorithm** and the second one is **Binary search algorithm**. 

Now, an important question is, which one is more ***efficient***? 

Unfortunately, there is no single correct answer. It depends on many factors. Say the phonebook contains 10,000 names. If the entry we are looking for is Aaron Anderson, the first algorithm will take only one or two steps to get the result. And the second algorithm will take about 14 steps. But if the name we are looking for is Zach Williams, it will probably take more than 9000 steps for the first algorithm, while it still takes around 14 steps for the second algorithm. 

Considering those factors, we can come up with more of a  general answer. 

* In order to compare two algorithms and find out which one is more efficient, we need to find the *maximum number of steps each algorithm ever takes* when applied to a problem with input size of *n*. In other words, we need to compare the **worst case scenario efficiencies** of each algorithm.

Linear search algorithm has a worst case scenario efficiency of ***n***. Meaning if the input size is *n* = 1000, it will take maximum of 1000 steps to find the correct entry or discover that it is not there.

Binary search algorithm has the worst case scenario efficiency of $\bold{log_2n}$.

> Quick **Logarithms** refresher
>  * Definition: $\log_by = x$  is equivalent to $b^x = y$
>  Example: $\log_28 = 3$ because $2^3 = 8$ 
> * Definition: $z\log_by = x$ is the same as $b^y = x^z$
> Example: $2\log_28 = 6$ that is $2^6 = 8^2$
> * $\log_2n$ means that for $n = 1024$, $\log_21024 = 10$, because $2^{10} = 1024$

Another critical part of assessing the efficiency of an algorithm is to decide what will be called a *step*. In the phonebook example above, we considered a comparison as a step. We look at an entry and compare it with the key we are looking for. That is one step. **A step must be the most time  consuming action in the algorithm** and other actions are  ignored. For example, when determining the worst case scenario, $2n + 97$ and $n$ are the same. Because when the value of $n$ is tremendous, +97 and 2X become not important.

Also, we should only compare algorithms when the input size *n* is large enough. For small inputs, it does not really make a difference which algorithm to use. 

To summarize, we need to take the following points into consideration when determining the efficiency of an algorithm:
1. Identify the the value of the $n$, which will be the size of the problem. $n$ could be the length of the array, if you are dealing with an array of numbers, for example.
2. Determine what will be considered as a step in the algorithm. A step is the most time consuming operation.
3. Drop the constants and non-dominant terms. Out of this worst case schenario value: $n^2 + n + 1024 - 23$, only $n^2$ matters because the rest of the terms grow more slowly than $n^2$.
4. Analyze the worst case scenario function for the algorithm.

Let us look at an example to solidify the rules we discussed.

**Example 1.** *Perform a worst case scenario computation for the following algorithm.*

**Find the maximum value from a list of numbers**

**Input:** A list of numbers $v_1, v_2, v_3,..., v_n$
**Output:** max($v_1, v_2, v_3,..., v_n$)

1: *max_value* $\leftarrow v_1$
2: *next* $\leftarrow$ 2
3: **while** *next* $\le$ *n.length* **do**
4: $\thickspace\thickspace$ **if** *max_value* $\lt v_{next}$
5: $\thickspace\thickspace\thickspace\thickspace$ *max* $\leftarrow v_{next}$ 
6: $\thickspace\thickspace$ **end if**
7: $\thickspace\thickspace$ *next $\leftarrow$ next + 1*
8: **end while**
9: **output** *max_value*

**Solution**
In the algorithm, the size of the problem *n* is equal to the list of the numbers given as a parameter. And comparing the next value to the max value can be counted as one step. We are making **two** comparisons with each of the items in the list. So this algorithm has the efficiency of ***2n***. 
* *n* - list of numbers
* Worst case scenario: ***n*** (after dropping the constant)

Let's clarify some points here. 
First of all, we only need to compare the last $n-1$ items in the list. But even then we can say that we do two comparisons for each item. Because being off by a few numbers does not really matter in this specific case. 
Second of all, where is the second comparison? I only see one for each item in the list. Well, the **first comparison is on line 3**. We check to see if the value of *next* is less than the length of *n*. The **second comparison is on line 4**. When we compare the value of the next item in the list with the *max_value*. 
Last but not least, we need to **drop the constants**.  Efficiency of **2N** is actually just **N** because we are only interested in the rate of incraese when dealing with efficiency of algorithms.

Here is the javascript version of the algorithm given above.
```javascript
function max(input){ /* input is an array of numbers */
	let max_value = input[0];
	let next = 1;
	while(next <= input.length){
		if(max_value < input[next]){
			max_value = input[next];
		}
		next++;
	}
	return max_value;
}
```
