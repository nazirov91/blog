---
templateKey: blog-post
title: Getting wise with Bitwise
date: '2020-02-24T15:48:53-05:00'
description: >-
  Bitwise operations, shifting bits, two's complement, and other similar terms
  related to bit manipulation seem like a scary topic people always try to
  avoid. However, they still come up a lot when dealing with code that requires
  precision and performance. Even though this topic is old and has been around
  for a long time, it is worth brushing up on this field once in a while to
  improve your skills. In this article, we will refresh our memory on binary
  numbers and look into the primary bitwise operations.
tags:
  - Bit
  - binary
  - bitwise
  - coding
  - decimal
  - bitwise operations
---
![\[\[GIF BINARY OR BITWISE\]\]](http://g.recordit.co/1clElWWaNQ.gif)

*Bitwise operations, shifting bits, two's complement*, and other similar terms related to bit manipulation seem like a scary topic people always try to avoid. However, they still come up a lot when dealing with code that requires precision and performance. Even though this topic is old and has been around for a long time, it is worth brushing up on this field once in a while to improve your skills. In this article, we will refresh our memory on binary numbers and look into the primary bitwise operations.

Outline
1. What is bit manipulation and why is it still important to know
2. Starting from the bottom
3. Bitwise operations

## What is bit manipulation, and why is it still important to know?
![w](https://drive.google.com/uc?export=view&id=1-xvokHrBlY13NJNRjoaJo96Nm0sIn_Rw)

*Bit manipulation in the digital programming world is the procedure of performing logical operations on bit patterns and twiddling data on a binary level.*

Woah! Easy there. What does this even mean?

Well, it means that our computers, at a very low level, work with bits - 1s and 0s. And even though those bits get bundled up into more human-readable elements like integers or strings in, we still have the option of working directly with the bits. This process is called **bit manipulation**. Bit manipulation involves using **bitwise operations** such as:
- OR
- AND
- XOR
- NOT
- Bit Shifting

To see a quick example, let's take a look at **AND** and **OR** bitwise operations. AND operation takes two bits and return 1 if *both* of the bits are 1s. OR on the other hand, takes two bits and returns 1 if *either* of the bits are 1.

```js
// AND
0 & 0 // Results in 0
1 & 0 // Results in 0
1 & 1 // Results in 1
0101 & 0011 // Results in 0001

// OR
0 | 0 // Results in 0
1 | 0 // Results in 1
1 | 1 // Restults in 1
0010 | 1100 // Results in 1110 
```

### But why do I need to know all this stuff?
Because these things are extensively used in areas such as
- Cryptography
- Computer graphics
- Hash functions
- Compression algorithms
- Network protocols
- Data compression
- and More

Using bitwise operations was critical back in the days when the computers had low computing power. Because on a low-cost processor, bit operations are significantly **faster** than division, multiplication and addition operations. Even though today modern processors perform arithmetic operations just as fast as bitwise operations, due to their improved architecture, bitwise operations still use less resources, hence utilize less power to run. This matter is even more important when we are working with IoT devices because they usually have small hardware capacity and processing power.

Also, if you are planning to take a coding interview in the new future, there is a really good chance that one of the questions will be related to bit manipulation.

## Starting from the bottom

Before we start dealing with the bit manipulation, we need to brush up on the **binary** concepts first.

#### Base 10 - Decimal
The number system we use on a daily basis is called **base 10**. And the reason is, each digit can be of the *ten* possible values - 0,1,2,3,4,5,6,7,8,9. 
Computers, on the other hand, can only hold *bits* with two possibles values - 0 and 1.

Base 10 number system is also called **decimal**, and base 2 system is called **binary**.

In order to understand the binary, let's take a look at the decimal number 10

![\[BASE 10 pic\]](https://drive.google.com/uc?export=view&id=1r5OlXDaFDtoLSfhnsblJBFXf3lmjjDGE)

(The $1^0$ in the first picture is supposed to be $10^0$. Sorry about that :) )


This indicates that there are three digits 1, 2, and 3, and we start counting from the rightmost digit. We can see that **there are 3 ones, 2 tens and 1 hundred**. The placeholders start from 1 from the right side and increase by the power of 10 - 1s, 10s, 100s, 1000s and so on.

#### Base 2 - Binary
Just like in the base 10 nubers placeholders are sequential powers of 10, **in binary the placeholders are sequential powers of 2.**
- $2^0$ = 1
- $2^1$ = 2
- $2^2$ = 4
- $2^3$ = 8
- $2^4$ = 16
- $2^5$ = 32
- ...

![\[BINARY PICS\]](https://drive.google.com/uc?export=view&id=1hTkxGk4NuQqV1Lv4z9YZHKM9h3_vauKD)

#### Counting in binary
|Base 10|Binary  | Binary interpretation
|--|--|--|
| 0 | 0000 |0 + 0 + 0 + 0|
| 1 | 0001 |0 + 0 + 0 + 1|
| 2 | 0010 |0 + 0 + 2 + 0|
| 3 | 0011 |0 + 0 + 2 + 1|
| 4 | 0100 |0 + 4 + 0 + 0|
| 5 | 0101 |0 + 4 + 0 + 1|
| 6 | 0110 |0 + 4 + 2 + 0|
| 7 | 0111 |0 + 4 + 2 + 1|
| 8 | 1000 |8 + 0 + 0 + 0|
| 9 | 1001 |8 + 0 + 0 + 1|

### But... but... how do you represent Negative numbers in Binary?
Negative numbers in binary are usually illustrated utilizing **two's complement** encoding. In this type of encoding, the **leftmost** placeholder is negative, and the other digits are positive.

Let's convert the binary number 1011 mentioned above to two's complement:

![twos complement](https://drive.google.com/uc?export=view&id=1emuto-uINbatAkZQQwF_Lh1wcn6qg60T)

How to count two's complement:
| Decmima | Binary in two's complement | Breakdown |
|--|--|--|
| -3 | 1101 | -8 + 4 + 0 + 1 |
| -2 | 1110 | -8 + 4 + 2 + 0 |
| -1 | 1111 | -8 + 4 + 2 + 1 |
| 0 | 0000 | 0 + 0 + 0 + 0 |
| 1 | 0001 | 0 + 0 + 0 + 1 |
| 2 | 0010 | 0 + 0 + 2 + 0 |
| 3 | 0011 | 0 + 0 + 2 + 1 |



## Bitwise operations

As we have mentioned above, bit manipulation consists of several *bit*wise operations:
- OR
- AND
- XOR
- NOT
- Bit Shifting

Let's crack them down one by one.

### Bitwise OR - |
The **OR** operation takes two bits and evaluates to 1 **if one or both of the bits are 1**. If both of the bits are 0, it evaluates to or returns 0.
```js
0 | 0 -> 0
0 | 1 -> 1
1 | 0 -> 1
1 | 1 -> 1
```
In other words, it is 0 only when both of the bits are 0.

How does it evaluate a collection of bits?
```js
0011 | 1010 -> ?

// It needs to be evaluated one by one at the bit level
0011 |
1010
= 1011
```

### Bitwise AND - &
The **AND** operation takes two bits and evaluates to 1 **only when both of the bits are 1**. The rest of the times, it evaluates to or returns 0.

```js
0 & 0 -> 0
0 & 1 -> 0
1 & 0 -> 0
1 & 1 -> 1
```

How does it evaluate a collection of bits?
```js
0011 | 1010 -> ?

// It needs to be evaluated one by one at the bit level
0011 |
1010
= 0010
```

### Bitwise XOR - ^
The **XOR** operation takes two bits and evaluates to 1 **only when exactly one of the bits is 1**. The rest of the times, it evaluates to or returns 0.

```js
0 ^ 0 -> 0
0 ^ 1 -> 1
1 ^ 0 -> 1
1 ^ 1 -> 0
```

How does it evaluate a collection of bits?
```js
0011 | 1010 -> ?

// It needs to be evaluated one by one at the bit level
0011 |
1010
= 1001
```

### Bitwise NOT - ~
The **NOT** operation inverts each bit and represents the set of bits in **two's complement**.

Huh?

So there are multiple things that happen when we use a NOT operator (~) in front of a decimal, for example.
- **Step 1**: Invert every single bit in a set of bits. Meaning if the bit is 0, turn it into 1, and if it is 1, turn it into 0. For example, decimal 2 equals to 0010 in binary. Inverting this value means switching the bits: 1101
- **Step 2**: Represent the inverted value in two's comlement encoding. As we have mentioned above, two's comlement means that the leftmost placeholder or digit is negative. In our case **1101** would be represented as -8 + 4 + 0 + 1 = -3. So **~2** => 0010 => 1101 => (two's complement) -8 + 4 + 0 + 1 => **-3**. Or ~2 -> -3

```js
~2 -> -3 // ~2 => 0010 => 1101 => (-8 + 4 + 0 + 1) => -3
~5 -> -6 // ~5 => 0101 => 1010 => (-8 + 0 + 2 + 0) => -6
~0 -> -1 // 0000 => 1111 => (-8 + 4 + 2 + 1) => -1
~7 -> -8  // 0111 => 1000 => (-8 + 0 + 0 + 0) => -8
```
If you have noticed, there is a pattern. In order to perform the NOT operation we are simply adding 1 to the decmil and negating the value.

### Bit Shifting
Bit shifting means shifting each digit in a binary number to left or right. There are three kinds of shifts:
1. Left shift
2. Logical right shift
3. Arithmetic right shift

#### Left Shift
When we want to shift one bit in a binary representation to the left, we remove the **leftmost** bit (most-significant bit) and **add 0 to the right side**. The left shift operator is denoted as **<<**. 

```js
0001 << 1 -> 0010
0001 << 2 -> 0100
```

One left shift of a bit on a binary number multiplies it by 2

```js
0001 << 1 -> 0010

0001 is 1
0010 is 2
```

Two left shifts multiply the binary number by 4
```js
0001 << 2 -> 0100

0001 is 1
0100 is 4
```

#### Logical Right Shift
When we want to shift one bit in a binary representation to the right, we remove the **rightmost** bit (least-significant bit) and **add 0 to the left side**. The logical right shift operator is denoted as **>>>**. 

```js
0100 >>> 1 -> 0010
0100 >>> 2 -> 0001
```

One logical right shift of a bit on a binary number divides it by 2

```js
0100 >>> 1 -> 0010

0100 is 4
0010 is 2
```

Two logical right shifts divides the binary number by 4
```js
0100 >>> 2 -> 0001

0100 is 4
0001 is 1
```

### Arithmetic Right Shift
Arithmetica right shift is a little different from the logical right shift. When we shift a single bit the arithmetic way, we lose the rightmost (least-significant) bit and **copy** the leftmost (most-significant) bit. The arithmetic right shift in JavaScript is denoted as **>>**

```js
0001 >> 1 -> 0000
1000 >> 1 -> 1100
1010 >> 1 -> 1101

0011 >> 2 -> 0000
0100 >> 2 -> 0001
```

Thanks for reading!
