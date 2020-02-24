---
templateKey: blog-post
title: 'C# Generics Simplified'
date: '2020-02-24T15:44:36-05:00'
description: >
  Generics is a powerful feature of C#, which was introduced in version 2.0 to
  allow creating type-safe **classes**, **interfaces**, or **methods** without
  actually committing to a specific *data type*.
tags:
  - 'C#'
  - Generics
  - .NET
---
Outline
1. Intro
2. Generic classes
3. Generic constraints
4. Generic methods

Generics is a powerful feature of C#, which was introduced in version 2.0 to allow creating type-safe **classes**, **interfaces**, or **methods** without actually committing to a specific *data type*.

Generics is a concept. It is a particular way of creating data structures that can be reused more often. The crucial part of generics is the idea of **TYPE PARAMETERS**. Now, what the heck are type parameters? Type parameters are similar to **formal parameters**, which are declared in a method's prototype and required by the method when it is called.

```csharp
public void SomeMethod(int formalParameter1, string formalParameter2) {}
```
Type parameters are a list of parameters inside angle brackets **< >** and attached to a class, interface, or method's name to indicate that they are generics.

```csharp
// Generic Method
public void GenericMethod<T>(T value){ }

// Generic class
public GenericClass<T>
{
	public T value { get; set; }
}
```

### What type of problem do generics solve?
Let's say we want to create a method that prints string on the console. It is a straightforward method that takes a string value as a parameter and displays it on the console.

```csharp
public void PrintString(string value) { Console.WriteLine(value); }
```

Now say we need another method similar to `PrintString`, but for integers. We want to pass in an integer and and print it on the console.

```csharp
public void PrintInteger(int value) { Console.WriteLine(value); }
```
 And another one for decimals:
 
```csharp
public void PrintDecimal(decimal value) { Console.WriteLine(value); }
```

Now, this is fine. We can have three methods for printing three different data types. However, it gets messy when we want to print float, bool, or even objects to the console. It would be better if we could combine them all and create a single method that can handle all data types. That is where the Generics come in. We can combine all three methods given above into one, and still accomplish what we wanted.

```csharp
public void PrintValue<T>(T value)
{
	Console.WriteLine(value);
}

PrintValue(1); // prints "1"
PrintValue("Apple"); // prints "Apple"
PrintValue(4.6); // prints "4.6"
```

The letter T inside the brackets denotes that we can send any type of data, value type, or reference type, and it will accept that data without a problem and print it on the console.

That letter **T** between the brackets is a commonly used name for generic types. It implies *Type* or *Template*. But actually, it could be anything.

```csharp
public void PrintValue<MyFancyGenericType>(MyFancyGenericType value)
{
	Console.WriteLine(value);
}

PrintValue(1); // prints "1"
PrintValue("Apple"); // prints "Apple"
PrintValue(4.6); // prints "4.6"
```

![enter image description here](https://drive.google.com/uc?export=view&id=1mozJ0UI6ksYY1nr-xiw5KdaxnHijGfPX)

### How does this even work?
When declaring the generic methods, for example, we specify how many type parameters we want to have. C# creates sort of **_'placeholders'_** for those type parameters. The placeholders will be converted into specific data types during compile time. 

For example, the `PrintValue` method given above has 1 type parameter. When we call this method with a string type, like this `PrintValue("Banana")`, CLR creates the following method for us at compile time:

```csharp
public void PrintValue(string value)
{
	Console.WriteLine(value);
}
```
Same type of process occurs for integers or decimals.

Why not just use `object` as the universal type, you might ask. In fact, this was the only option before C# 2.0. Since all variable types derive from the `object` class, we could easily use it as a generic type to create generic data structures. However, this method causes a lot of performance issues due to boxing/unboxing. Which basically means converting various data types to objects and back. Furthermore, it would result in a loosely typed code instead of a strongly typed code. 

## Generic classes
In order to create a generic class, we declare a list of **type parameters** between the angle brackets and then put it next to the class name. Then the generic class can use those parameters with methods, properties, fields and etc.

```csharp
class RegularClass {}

class GenericClass<T> {}
```

Example

```csharp
public class GenericClass<T>
{
	private T _genericField;
	
	public GenericClass(T value)
	{
		_genericField = value;
	}
	
	public T GenericProperty { get; set; }

	public T GenericMethod(int genericValue)
	{
		GenericProperty = _genericField;
		Console.WriteLine(genericValue);
		return GenericProperty;
	}
}

// Test class
public class Book
{
	public string Title { get; set; }
}

// Using the generic class with string type
GenericClass<string> genericClassInstance = new GenericClass<string>("Peach");
var response = genericClassInstance.GenericMethod("Cherry");

// Using the generic class with an object type
GenericClass<Book> genericClassInstance = new GenericClass<Book>(new Book());
var response = genericClassInstance.GenericMethod(new Book());
```

Operations inside the class can be performed pretty much the same way regardless of the data type being stored.

We could also create generic **structures**. It works just like the way it works with classes.

```csharp
public struct GenericStruct<TKey, TValue>
{
	public Tkey Key { get; set; }
	public TValue Value { get; set; }
}
```
Generic classes are mostly used when dealing with collections such as list, hash table, queue, stack, tree, and so on. And very rarely, we create custom generic classes for such purposes, because .NET provides an [excellent library](https://docs.microsoft.com/en-us/dotnet/standard/generics/collections) right out of the box.

## Generic Constraints
Generic constraints refer to restricting type arguments when defining a generic class or method. Even though we want to have flexible type parameters, sometimes it is useful to set some boundaries to what type of arguments can be passed in. Does it not defy the purpose of having generics? You might ask. Well, it kind of does. But we do not have to use them unless it is necessary.

How to define a generic constraint?
Adding a constraint looks a lot like adding inheritance,  `T : FruitClass`, but we also add the keyword `where` right before it.

```csharp
public class GenericList<T> where T : struct
{ ... }
```

The class defined above says that you can use the GenericList class only with *value type* arguments. If you did try to instantiate it with a reference type argument, the compiler would throw an error.

```csharp
public class GenericList<T> where T : struct
{ ... }

// Correct instantiation
GenericList<int> list = new GenericList<int>();

// Incorrect instantiation. Throws an error
GenericList<Book> list = new GenericList<Book>();
```

Here is the table of applicable constraints for generics

| Constraint | Definition |
|--|--|
| `where T : class` | Type argument can be any class, interface, delegate or array type |
|`where T : struct`| Type argument must be value type |
|`where T : new()`| Type argument must have a parameterless constructor |
|`where T : <interface name>`| Type argument must be or implement the specified interface |
|`where T : <class name>`| Type argument must be or derive from the specified class |
|`where T : U`| Type argument must be or derive from the argument U. This means T and U are both generic types. |

We can also have multiple constraints chained into one.

```csharp
public class GenericList<TKey, TValue> 
	where TKey : struct
	where TValue : BookClass, new()
{ ... }
```
Generic constraints can apply to generic methods as well.

```csharp
class RegularClass
{
	public class T MyGenericClassWithConstraint<T>(T value) where : struct
	{
		Console.WriteLine(value);
		return value;
	}
}
```

### Generic class inheritance
When there is a generic class, and we need to inherit it, the type argument must be specified during the sub class declaration.

```csharp
public class BaseClass<T>
{ ... }

public class SubClass : BaseClass<string>
{ ... }
```


However, if the sub class is also generic, you can use the sub class type parameter as the specified type for base class

```csharp
public class BaseClass<T>
{ ... }

public class SubClass<T> : BaseClass<T>
{ ... }
```
Also, while deriving from a base class to a generic subclass, all of the constraints from the base class must be repeated. Otherwise, the compiler will throw an error.

```csharp
public class BaseClass<T> where T : class
{ ... }

public class SubClass<T> : BaseClass<T> where T : class
{ ... }
```

## Generic methods
As we have already seen above, we can create generic methods by adding type parameters between the angle brackets and attaching it to the method name. Most of the generic class rules apply to generic methods as well. 

```csharp
public T MyGenericMethod<T>(T genericValue)
{
	return genericValue;
}

var result = MyGenericMethod<string>("Hi");

// OR generic inference style, which allows
// to skip the type argument
var result = MyGenericMethod("Hello");
```
Just like with the classes, generic methods can define their own constraints

```csharp
public void GenericMethod<T, U>(T key, T value) 
	where T : struct
	where U : class
{
	Console.WriteLine($"Key: {key}, Value: {value}");
}
```
