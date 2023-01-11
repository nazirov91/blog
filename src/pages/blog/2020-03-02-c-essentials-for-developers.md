---
templateKey: blog-post
title: 'C# Essentials for Developers'
date: '2020-03-02T21:02:35-05:00'
description: >-
  A member of the C-style language family C# was developed in around 2000 by
  Microsoft. Since then its popularity has increased tremendously. Today it is
  one of the top five languages in the world, and there are millions of
  applications created using this object-oriented, imperative language. Big
  companies such as Intuit, StackOverflow, OpenTable, Dell, and many others are
  using it for their mission-critical products. One of the most popular game
  development engines - Unity uses C# as their primary coding language. All of
  it is to say that there are several good reasons to learn this awesome
  language if you are not already familiar with it.
tags:
  - 'C#'
  - .NET
  - Microsoft
  - OOP
  - .NET Core
  - .NET Framework
---
![\[TITLE PIC\]](https://drive.google.com/uc?export=view&id=1CTtnCtTj4UlPzBNkRHdPLzkl14_j7sCJ)

## C# and .NET
Most people usually confuse .NET with C#. What is the difference between those two? It is actually pretty simple. C# is a programming language, and .NET is a platform for building various types of apps (websites, desktop/server/console/gaming apps and more) using C#, F#, or Visual Basic.

An important thing to know about .NET is that there are two similar **implementations** of it:
- **.NET Framework**
- **.NET Core**

The significant difference between these implementations is - .NET Core is open-source, and *cross-platform* (which means it car run on any operating system) and .NET Framework works mostly on Windows.

While we are discussing the .NET ecosystem, we should also mention the *third implementation* of the .NET platform, which is **Xamarin/Mono** and the **.NET Standard**. Xamarin/Mono is another implementation that is designed for building applications for mobile phones running iOS, Android, or others.
.NET Standard is a specification of the APIs that are common across all .NET implementations.
 
- **C#** - *Object oriented programming language*
- **.NET** - *A platform for building different types of apps*
	- Implementations
		- **.NET Framework** - *Windows oriented, requires license*
		- **.NET Core** - *open source, cross-platform version of .NET Framework*
		- **Xamarin** - *for mobile apps*
	- Specifications
		- **.NET Standard** - *a set of common APIs across all implementations*

## .NET Components and Architecture
There are two main components of the .NET platform: **CLR** (Common Language Runtime) and **Class Library**. 

- **Common Language Runtime** - is a *just-in-time compilation* environment that is part of the .NET platform and its only job is to convert *Intermediate Language code* into native code. We get the intermediate language code from compiling C# source code, for example.

The architecture of the .NET applications is relatively straightforward. At the root of all applications, there are **classes**. When we have a large number of classes connected together, we need a way to organize them. We use **Namespaces** for that purpose. A collection of namespaces is called **Assembly**, which is usually in the format of .EXE or .DLL (Dynamically Linked Library). An **application** is a collection of assemblies.

![.NET Core application architecture simple](https://drive.google.com/uc?export=view&id=1W2RbRiAnkOoSc7RFcTT61334NDXA2Ku9)

Differences between EXE and DLL are as follows:
**EXE**
An exe always runs as a separate process and the purpose is to launch a separate application of its own.

**DLL**
A dll always needs a host exe to run. i.e., it can never run in its own address space. The purpose of a DLL is to have a collection of methods/classes which can be re-used from some other application. DLL is Microsoft's implementation of a shared library.

## Value Types and Expressions
Before we start writing any code, please make sure that you have the latest version of [Visual Studio](https://visualstudio.microsoft.com/downloads/) IDE.

For practice purposes, once you open the visual studio, create a new Console Application (New Project -> Console Application (.NET Core)). 


Usually, when you create a new project, visual studio adds a template code similar to this:

```csharp
namespace Then 
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
		}
	}
}
```

It is a simple hello world console application. You can observe from the code that, there is a namespace containing a class called Program. Inside the class, we have a single method named Main. And we print to the console by utilizing the `Write` or `WriteLine` methods of the **Console** class. 

An important thing to know about C# is the naming convention. It is advised to use **Proper case** in contrast to Camel case or others.
- MyClass - *Proper case*
- myClass - *Camel case*
 
 There are nine most commonly used primitive types in C#:
 1. byte
 2. short
 3. int
 4. long
 5. float
 6. double
 7. decimal
 8. char
 9. bool

They are very similar in use to other programming languages such as Java. The only things to watch out for are the followings:
- When we want to declare a variable of type **decimal** we need to specify this by adding the letter *m* or *M* at the end of declared value. Otherwise, the variable type would be of type **double**, which is the default type. For example:

```csharp
// Declare a decimal variable
var num1 = 1.5; // NOT a decimal variable
var num1 = 1.5m; // Decimal variable
var num1 = 1.5M; // Decimal variable
``` 

- Same thing with the float. We need to tell the compiler specifically that we want to create the variable of type **float** by adding the letter *f* or *F* at the end.

```csharp
// Declare a float variable
var num1 = 1.5; // NOT a float variable
var num1 = 1.5f; // float variable
var num1 = 1.5F; // float variable
``` 

## Non-Primitives or reference types
 Firs reference type we use the most is the **Class** type. To create a class we use an *access modifier* (determines who has access to the class), class keyword and identifier (name of the class):

```csharp
public class Car {}
``` 

And to create a new object for the class we have to allocate new memory for it by defining it with the **new** keyword.

```csharp
Car car1 = new Car();
// OR
var car1 = new Car1();
```

## Classes and associations
A class is a blueprint for an object and a building block of software application. Each class in an application is supposed to fulfill a particular behavior.

A class in C# has two major parts:
- Data (represented by fields)
- Behavior (described as methods)

Declaring a class

```csharp
public class Person
{
	// Fields
	// Methods
}
```

```csharp
public class Person
{
	public string Name;
	public void Greet()
	{
		Console.WriteLine($"Hello {Name}");
	}
}
```

Creating objects

```csharp
Person person = new Person();
person.Greet();
```

**Class members**
There are two types of members in C# classes. 
- **Instance** members: accessible from an object
	- Example: var person  = new Person(); person.Greet();
	- 
- **Static** members: accessible from the class
	- Example: `Console.WriteLine()`

**Constructor**
Example of a regular constructor:

```csharp
public class Person
{
	public string Name;
	public Customer(strig name){
		this.Name = name;
	}
}
```

Constructor overloading:
```csharp
public class Person
{
	public string Name;
	public int Age;
	
	public Customer(strig name){
		this.Name = name;
	}
	public Customer(int age){
		this.Age = age;
	}
}
```

**Object initializer**

With C# 3.0, Microsoft introduced a concept called *Object Initialization syntax*. It is not the same thing as just instantiating an object from a class. It is similar, but with an extra feature. 
Let us say that we have a class called `Person` and that class has three fields: Name, Id, and Age.

```csharp
public class Person
{
	public string Name;
	public int Age;
	public int Id;
}
```

To accommodate different scenarios, we need to create multiple constructors (constructor overloading).

```csharp
public class Person
{
	public string Name;
	public int Age;
	public int Id;

	public Person(int id){}
	public Person(int id, string name){}
	public Person(int id, string name, int age){}
}
```

This method is handy when we have only the name of the person, and other information is missing, but we still need to create an object, or similar.

So to avoid this redundancy, we can do the following instead: 

```csharp
public class Person
{
	public string Name;
	public int Age;
	public int Id;

	public Person(int id){}
	public Person(int id, string name){}
	public Person(int id, string name, int age){}
}

// In Main
var Person = new Person()
{
	Name = "Mike",
	Id = 12345
}
```

This way the compiler knows what fields to assign and what fields to skip. All of that happens without the help of the overloaded constructors.

**Fields**

 Difference between **const** and **readonly** keywords in C#
| const | readonly |
|--|--|
| constant fields are created using *const* keyword | readonly fields are created using *readonly* keyword |
|const is a **compile-time** constant| readonly is a **runtime** constant |	
| value of the const field cannot be changed | value of the const field can be changed |
| const fields can be declared inside methods | readonly fields cannot be declared inside methods |
| we can assign values to const fields only during declaration |we can assign values to readonly fields during declaration and in constructors|
| const cannot be used with static access modifier | const can be used with static access modifier |

---
What is the difference between a **field** and a **property**?

Properties expose fields. Fields should (almost always) be kept private to a class and accessed via get and set properties. Properties provide a level of abstraction, allowing you to change the fields while not affecting the external way they are accessed by the things that use your class.

```csharp
public class SomeClass
{
    // this is a field.  It is private to your class and stores the actual data.
    private string _someField;

    // this is a property. When accessed it uses the underlying field,
    // but only exposes the contract, which will not be affected by the underlying field
    public string SomeProperty
    {
        get
        {
            return _someField;
        }
        set
        {
            _someField = value; // value holds the sent in value. It is always `value`
        }
    }

    // This is an AutoProperty (C# 3.0 and higher) way of declarnig the same thing
    // which is a shorthand syntax used to generate a private field for you.
    public int SomeProperty { get; set; } 
}
```

Thank you for reading!
