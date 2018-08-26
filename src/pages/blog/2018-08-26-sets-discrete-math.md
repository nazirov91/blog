---
templateKey: blog-post
title: Sets (Discrete Math)
date: '2018-08-26T10:48:25-04:00'
description: Sets refresher for Algorithms
tags:
  - Discrete Math
  - Sets
---
# Sets

### Definitions

**Set** - is an unordered collection of objects. Usually sets are denoted by capital letters. A set *contains* its **elements**.
* $a \in A$

In the example above, the special character $\in$ means that the lower case letter *$a$ is an element of the set $A$*.  If $a$ is not an element of $A$, we write $a \notin A$.

When two sets contain the same elements, they are said to be equal. $A$ = {e}, $B$ = {e} means that $A = B$ or $A = B$ provided that $\forall e(x \in A \iff e \in B)$.

***Describing sets***

*Roster method*
There are a few ways of describing sets. One of them is the roster method. In **roster method** *curly braces* are used to list out the elements of a set.  $A$ = {1,2,3} is a set of positive integers between 1 and 3 inclusive. It is fundamental to note that the order inside set does not matter: {1,3,2} = {1,2,3} because $x \in$ {1,3,2} and $x \in$ {1,2,3}, that is 
* $\forall x(x \in$ {1,3,2} $\iff x \in$ {1,2,3}). 

Also, notice that we separate the elements with comma and we ignore the duplicates.

When the quantity of the elements is large, roster method does not fit well for the purpose. We would not want to list out all 1000 elements when we need to create a set that contains integers from 1 to 1000. One solution is to use three dots **...** (which is also called **ellipsis**). So $A$ = {1,2,3 ..., 1000} would describe a set with positive integers 1 to 1000.

*Set-builder notation*
A set can also be described as **set-builder notation** $A$ = {$x \mid p(x)$} - set of all objects $x$ for which the predicate $p(x)$ is true. 
A set $S$ of all even positive integers less than 5 can be written as 
* $S$ = {$x \mid x$ is an even integer less than 5}

Or $A$ = {1,2,3 ..., 1000} can be written as
* $A$ = {$x \mid x$ is a whole number and 1 $\le x \le$ 1000} 

Some sets appear so often that they have special notations for them.

 |Set|Definition|
|--|--|
|$\mathbb{N}$ = {0,1,2,3, $\mathellipsis$}|Natural numbers|
|$\mathbb{Z}$ = {$\mathellipsis$ -2,-1,0,1,2,3, $\mathellipsis$}|Integers|
|$\mathbb{Z}^{+}$ = {$\mathellipsis$ -2,-1,0,1,2,3, $\mathellipsis$}|Positive integers|
|$\mathbb{Q}$ = {$x \mid x = \frac{p}{q}, p$ and $q$ are integers with $q \neq 0$}|Rational Numbers|
|$\mathbb{R}$ = {$x \mid x$ is a real number}|Real numbers|
|$\mathbb{R^{+}}$ = {$x \mid x$ is a positive real number}|Positive real numbers|

***Empty and Universal sets***
* $\emptyset$ - is the notation to define an empty set (also written as { })
* $U$ denotes a universal set

For example, $A$ = {$x \in \mathbb{R}\mid x^2 = -2$} = $\emptyset$

There are two traps that a lot of people fall into when dealing with sets.
1. $\emptyset = 0$ 
This is incorrect because it is like comparing apples and oranges, one of them is set and the other one is a number
2. $\emptyset$ = {$\emptyset$}
This is incorrect as well because the left side is an empty set while the right side is a set with a single element (which is also called a **singleton set**)

***Subsets***
If every element of set $S$ is also an element of set $O$, we can say that $S$ is a subset of $O$ or $S \subseteq O$.  For example,
* $S \subseteq O$ when $\forall x(x \in S \implies x \in O)$ is true
* {apple, banana, cherry} $\subseteq$ {apple, banana, cherry, lemon, kiwi}
* {4,5,6} $\subseteq$ {7,8,4,5,6}

When an element exists in one set and not in the other, we use the $\nsubseteq$ notation:
* {2,3,4} $\nsubseteq$ {3,4,5,6}
because the number 2 is not present in the second set

> The empty set is a subset of every set


***Proper set***
When every elements of set $A$ is also an element of set $B$ but there is at least one element in set $A$ that is not in set $B$, $A$ is a **proper subset** of $B$. In symbols we write $A \subset B$. 
For example,
* {3,4} $\subset$ {3,4,5,6}

***Cardinality***
Cardinality of a set is the number of elements a set contains. For example, $A$ = {6,7,8,9}  has four elements, therefore the cardinality of the set $A$ is 4, often written as |$A$| = 4.
The empty set has a cardinality of 0: $E$ = { } = $\emptyset$
* $\mid E \mid$ = 0

A set can be *finite* and *infinite*. The cardinality symbol | | above is used to describe finite sets.

***Power sets***
Let's say there is a set $S$ which contains $a$ and $b$: 
* $S$ = {$a,b$}. 

If wanted to get the *all* subsets of set $S$, they would be the followings:
1. $\emptyset$ (since it is a subset of any set)
2. {$a$}
3. {$b$}
4. {$a,b$}

Now, the **power set** of $S$, is the **set of all subsets**. It is denoted by the special sign $\mathcal{P}$
* $S$ = {$a,b$}
* $\mathcal{P}(S)$ = {$\emptyset$, {$a$}, {$b$}, {$a,b$}}

 If the size of a set is written as 
 * $\mid A \mid$ = $n$ 
 
then the size of a power set is 
* $\mid \mathcal{P}(A) \mid = 2^n$
