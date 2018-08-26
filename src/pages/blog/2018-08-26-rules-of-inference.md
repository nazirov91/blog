---
templateKey: blog-post
title: Rules of Inference (Discrete Math)
date: '2018-08-26T10:46:58-04:00'
description: Rules of Inference (Discrete Math)
tags:
  - Discrete Math
  - Inference
---
## Rules of Inference


**Inference** - is a process of drawing conclusion based on the evidence and reasoning. It holds a certain level of probability relative to the premises. It could also be an educated guess.

**Premise** - a (previous) propositional statement supporting a conclusion.

**Proof** - is a *valid argument* that establishes the truth of a statement.

**Argument** in logic is a sequence of propositions. An argument is valid only when the conclusion follows from the validity of the preceding statements, or premises.

**Fallacies** - invalid arguments

Also we need to understand the notions of **hypotheses** and **conclusion** before going forward. Let's look at an example. 
- If $p$ is an odd number and if $q$ is an odd number, then sum of $p$ and $q$ is divisible by two.

Here the hypotheses are: *$p$ is an odd number and $q$ is an odd number*, and the conclusion is *sum of $p$ and $q$ is divisible by two.*

> **Valid Argument** in logic is an argument in which the truth of hypotheses constitutes the truth of conclusion. Meaning if the hypotheses are true, you must accept the conclusion to be true as well.

To infer a new statement from existing statements, and make sure it is a valid argument, we need to use some type of rules. Those rules are called - **rules of inference.** There are countless number of rules of inference but we are going to list out only the most common ones in a bit.

Example 
- "If you have the key to the door, you can open the door." "You have the key." Therefore, "You can open the door"

Let's analyze the example above by using logical notations. If $p$ denotes "If you have the key to the door", and $q$ represents "You can open the door", then this argument has the form of 
- $p$ $\rightarrow$ $q$ and $p$  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$\therefore$ $q$

The $\therefore$ sign denotes "**therefore**". This form states that when p $\rightarrow$ $q$ and $p$ are true, $q$ also must be true.

#### Basic Rules of inference
|Name|Rule of Inference|
|-|-|
|Modus Ponens|$p$ and $p \rightarrow q$ &nbsp;&nbsp;$\therefore q$
|Modus Tollens|$\neg p$ and $p \rightarrow q$ &nbsp;&nbsp;$\therefore \neg q$
|Hypothetical Syllogism|$p \rightarrow q$ and $q \rightarrow r$ &nbsp;&nbsp;$\therefore p \rightarrow r$
|Addition|$p$ &nbsp;&nbsp;$\therefore p \lor q$
|Simplification|$p \land q$ &nbsp;&nbsp;$\therefore p$
|Conjunction|$p$ and $q$ &nbsp;&nbsp;$\therefore p \land q$
|Disjunctive Syllogism|$p \lor q$ and $\neg p$ &nbsp;&nbsp;$\therefore q$

It is important to understand the reasonings behind the rules. For example, *Simplification* rule states that when $p \land q$ is true, $p$ also has to be true. In this particular case we could also say that the conclusion $q$ would be true. Because for $p \land q$ to be true, both propositions p, q must be true. 

*Disjunctive Syllogism* dictates that if $p \lor q$ and $\neg p$ are true, then $q$ should be true because one of the propositions must be true for a compound proposition of $p \lor q$ to be true.

Let's take a quick quiz on the basic rules of inference. 

Find which rule of inference is used in the argument below:
> If it snows today, we will not play soccer. If we do not play soccer today, we will play soccer tomorrow.

*Answer:* Let $p$ be the proposition "It snows today," $q$ be the "We will not play soccer," and let $r$ be the propositions "We will play soccer tomorrow." In that case, we can construct an *argument form* like this:
* $p \rightarrow q$ and $q \rightarrow r$ &nbsp;&nbsp; $\therefore p \rightarrow r$

*Fallacies*
Sometimes a logical argument seems to be valid even when in fact it is not. For example, 
>If the sun is shining, then it is summer. It is summer. So the sun must be shining.

Here the conclusion does not follow the hypotheses. Even though most of the days in summer are sunny, there are days when the sun does not shine. Hence, we would make the **fallacy of affirming the conclusion error** if we considered the argument above as valid.

#### Rules of inference for arguments involving quantifiers

There are special rules to deduce valid arguments from statements with quantifiers. They are usually trickier to understand at first. But a moment's thought is enough to realize that all the rules boil down to plain common sense when looked at from correct perspective. 

*Quantification rules*
|Name|Rule of inference|
|-|-|
|Universal Instantiation|$\forall P(x) \therefore P(c)$ if $c$ is in the domain of $x$|
|Existential Instantiation|$\exists P(x) \therefore P(c)$ for some $c$ is in the domain of $x$|
|Universal Generalization|$P(c)$ for arbitrary $c$ in the domain of $x$ $\therefore \forall x P(x)$|
|Existential Generalization|$P(c)$ for some  $c$ in the domain of $x$ $\therefore \forall x P(x)$|

**Universal Instantiation** states that if $\forall P(x)$ is true, then we can say that for every object $o$ in the domain, $P(o)$ is true. For example, say we have a statement "All humans are mortal" and the domain of this statement includes *John*. Then we can conclude that "John is mortal."
##
Let's analyze an argument to wrap up the rules we've covered so far.
> All movies directed by Robert are sad. Robert directed a movie about time. So, there is a movie about time that is sad.

The arguments can be symbolized using predicates:
1. $R(x)$ : $x$ was directed by Robert
2. $S(x)$ : $x$ is sad
3. $T(x)$ : $x$ is about time

The domain for $x$ in each case is all movies. In symbolic form the the argument and a proof are:

*Argument:* 

$$
\frac{
\begin{aligned}
\forall x(R(x) \rightarrow S(x)) \\
\exists x(R(x) \land T(x))
\end{aligned}
}{
\therefore \exists x(T(x) \land S(x))
}
$$

*Proof*

|||
|-|-|
|$\exists x(R(x) \land T(x))$ | Hypothesis (There is a movie directed by Robert and that is about time)|
|$R(c) \land T(c)$ for some $c$|Existential Instantiation|
|$R(c)$|Simplification|
|$\forall x(R(x) \rightarrow S(x))$|hypothesis|
|$R(c) \rightarrow S(x)$|Universal instantiation|
|$S(c)$|Modus Ponens|
|$T(c) \land R(c)$|Logical equivalence|
|$T(c)$|Simplification|
|$T(c) \land S(c)$|Conjunction|
|$\exists x(T(x) \land S(x))$|Existential Generalization|
 
