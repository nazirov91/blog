---
templateKey: blog-post
title: 'C# Delegates, Events, and some more.'
date: '2020-02-24T15:40:52-05:00'
description: >-
  In this article, I will be discussing C# delegates, events, and other related
  topics that involve these two. Even if you have been working with C# for a
  long time, this type of topic might seem confusing. The reason is we do not
  use them on a daily basis. Or we use it without realizing it. Either way,
  brushing up on this topic with simple and clear examples is always a good
  idea.
tags:
  - 'C#'
  - .NET
  - Delegates
  - Events
---
## Outline
1. Delegates
2. Action vs. Func
3. Events
4. Anonymous methods
5. Lambdas


## Delegates
According to the  oxford dictionary, the word *delegate* means the following:
> a person sent or authorized to represent others, in particular an elected representative sent to a conference.

And in C# it is interpreted a little bit differently:
**Delegate** - is a reference type variable, just like class or interface, that holds a reference to methods. In other words, it is a pointer to functions.

### How to create delegates
Creating a delegate looks a lot like creating an interface with a single method.
![enter image description here](https://drive.google.com/uc?export=view&id=1lYKVFg3El_C3xjLgA6bT2xg5fLBu8fSg)

```csharp
public delegate int AddNumbers(int numOne, int numTwo);
```

`AddNumbers` is now a delegate type that accepts two integers and returns an integer.

Delegate types can be created on their own outside of a class, or they can appear inside a class.

```csharp
namespace DelegatesNamespace
{
	public delegate void LogSomething(string something);
	public class Calculator
	{
		public delegate double AddFloats(float valueOne, float valueTwo);
	}
}
```
### How to use delegates
Now we know how to create a delegate type, let's see how we can create instances of this type and use it.

We create delegate instances with the `new` keyword, just like with classes. Then we pass in a method with the correct signature as the parameter.

For example, let us say there is this method:

```csharp
public int SomeMethod(int num1, int num2)
{
	return num1 + num2;
}
```

We can pass this method as a parameter while creating an instance of `AddNumbers` delegate that was created above.

```csharp
AddNumbers addNumbersDelegate = new AddNumbers(SomeMethod);
```

When `addNumbersDelegate` delegate instance is called, it will behave just like calling the `SomeMethod` directly.

```csharp
int result = addNumbersDelegate(1, 2); // result = 3

// addNumbersDelegate(1,2) could also be
// writted as addNumbersDelegate.Invoke(1,2)
```

**But what is the point of wrapping the method in a delegate when you can just call it directly?**


There is not much benefit from having a delegate instance pointing to a single method. The real advantage comes in when we want to execute multiple methods from a single instance. That feature of the delegates is called **Multicasting**.

### Multi-casting delegates
Multi-casting is essentially having list of function pointers. We can add as many methods as we want to the **combined** delegate and execute all of referenced methods by invoking the delegate instance.

```csharp
using System;

// C# program to illustrate Multicasting of delegates
namespace ChatGroup
{	
	// Messenger class which contains delegate type and associated methods
	public class Messenger
	{
	    // Delegate type that returns nothing, and accepts a string
		public delegate void SendMessage(string message);

		// "ShowMessageToPeopleInTheGroup" method
		public void ShowMessageToPeopleInGroup(string message)
		{
			Console.WriteLine(
				"Delivered the message to chat group members: " + message);
		}
	
		// "SaveMessageInDatabase" method
		public void SaveMessageInDatabase(string message)
		{
			Console.WriteLine("Saved the message in the database: " + message);
		}

		// Main method
		public static void Main(String []args)
		{
			// Creating an object of Messenger class
			Messenger messenger = new Messenger();

		    // Create delegate instance with pointer to the first function
		    SendMessage sendMessageInstance = 
			    new SendMessage(messenger.ShowMessageToPeopleInGroup);

			// Add/Multicast the second method to the list of methods
		    sendMessageInstance += messenger.SaveMessageInDatabase;

			// Call the delegate instance
		    sendMessageInstance("Hello");
		}
	}
}

// CONSOLE
// Delivered the message to chat group members: Hello
// Saved the message in the database: Hello
```

## Events
Event - is a syntactic sugar over multi cast delegates. It triggers certain actions when there is an *event*. An event has a **publisher** and multiple **subscribers**.

We need to do 3 things to create an event with C#.
1. Define a delegate
2. Define an event based on that delegate
3. Raise/Publish an event

Define a delegate for an event

```csharp
// Define a delegate
public delegate void MessageReceivedEventHandler(object source, EventArgs args);
```
`EventArgs` is a class that can hold additional information we can send to the **subscribers**. We will see an example of this below. `object source` is just a C# syntax we need to follow.

Define an event

```csharp
public event MessageReceivedEventHandler MessageReceived;
```

Raise an event.
To raise an event all we have to do is to call the `MessageReceived(this, EventArgs.Empty)` event. But first, need to make sure that the event has some subscribers. If it does not, and we publish the event, the program will throw an exception. So the best way to trigger an event is to have a *protected virtual* method that checks for subscribers and then publishes the event.

```csharp
protected virtual void OnMessageReceived()
{
	if(MessageReceived != null)
	{
		MessageReceived(this, EventArgs.Empty);
	}
}

OnMessageReceived();
```

`EventArgs.Empty` implies that we are not sending any additional information to the subscribers.

Let's create a small program that handles purchases in an online shop. When a user buys something, we want to send an email to the buyer about the purchase, and also send a text message to the owner of the shop.

### Online shop sale event example

```csharp
using System;

namespace OnlineShop
{

  // ----------- ITEM CLASS--------------
  // Item class for products in the shop
  public class Item
  {
    public string Name { get; set; }
  }

  // ----------- EMAIL SERVICE CLASS --------------
  public class EmailService 
  {
    // Method that handles sending an email
    public void SendEmail(object source, EventArgs e)
    {
      Console.WriteLine("Hi buyer, Thank you for the purchase!");
    }
  }

  // ----------- MESSAGE SERVICE CLASS --------------
  public class TextMessageService
  {

    // Method that handles sending SMS messages
    public void SendTextMessage(object source, EventArgs e)
    {
      Console.WriteLine(
      "Hi owner, someone made a purchase on the website. Take a look!");
    }
  }

  // ----------- CASH REGISTER CLASS--------------
  public class CashRegister 
  {
    // Delegate type for the event
    public delegate void SaleEventHandler(object source, EventArgs args);

    // Event declaration
    public event SaleEventHandler SaleEvent;

    public void Sell(Item item)
    {
      Console.WriteLine("Sale has been recorded! Notifying parties...");

      // Publish sale event
      OnSale();
    }

    protected virtual void OnSale()
    {
      if(SaleEvent != null) // Check if there are any subscribers
        SaleEvent(this, EventArgs.Empty); // Trigger all subscribers

      Console.WriteLine("Finished notifying all parties");
    }
  }

  // ----------- MAIN CLASS --------------
  public class Program {
    public static void Main (string[] args) {
      var backpack = new Item() { Name = "Backpack" };
      var cashRegister = new CashRegister(); // Publisher

      var emailService = new EmailService(); // Subscriber
      var textMessageService = new TextMessageService(); // Subscriber

      // Adding subscribers to the event
      cashRegister.SaleEvent += emailService.SendEmail;
      cashRegister.SaleEvent += textMessageService.SendTextMessage;

	  // Executing the sell method
      cashRegister.Sell(backpack);
    }
  }
}
// CONSOLE
// Sale has been recorded! Notifying parties...
// Hi buyer, Thank you for the purchase!
// Hi owner, someone made a purchase on the website. Take a look!
// Finished notifying all parties
```

Now if we want to send the details of the purchase, we need to take advantage of the second parameter `EventArgs` in the delegate type. To do that we need to create a new class that derives from the EventArgs. In our case, the new class should be called `ItemEventArgs`

```csharp
public class ItemEventArgs : EventArgs
{
	public Item Item { get; set; }
}
```

Then we can modify the `CashRegister` class to send the `ItemEventArgs` instead of regular `EventArgs`

```csharp
  // ----------- CASH REGISTER CLASS--------------
  public class CashRegister 
  {
    // Delegate type for the event
    public delegate void SaleEventHandler(object source, ItemEventArgs args);

    // Event declaration
    public event SaleEventHandler SaleEvent;

    public void Sell(Item item)
    {
      Console.WriteLine("Sale has been recorded! Notifying parties...");

      // Publish sale event
      OnSale(item);
    }

    protected virtual void OnSale(Item item)
    {
	  // Check if there are any subscribers
      if(SaleEvent != null) 
        // Trigger all subscribers
        SaleEvent(this, new ItemEventArgs() { Item = item }); 

      Console.WriteLine("Finished notifying all parties");
    }
  }
```

So the final program would look like this:
#### Final online cash register program

```csharp
using System;

namespace OnlineShop
{

  // ----------- ITEM CLASS--------------
  // Item class for products in the online shop
  public class Item
  {
    public string Name { get; set; }
  }

  // ----------- ItemEventArgs CLASS--------------
  // EventArgs for Item class
  public class ItemEventArgs : EventArgs
  {
    public Item Item { get; set; }
  }

  // ----------- EMAIL SERVICE CLASS --------------
  public class EmailService 
  {
    // Method that handles sending an email
    public void SendEmail(object source, ItemEventArgs e)
    {
      Console.WriteLine($"Hi buyer, Thank you for purchasing {e.Item.Name}!");
    }
  }

  // ----------- MESSAGE SERVICE CLASS --------------
  public class TextMessageService
  {

    // Method that handles sending SMS messages
    public void SendTextMessage(object source, ItemEventArgs e)
    {
      Console.WriteLine(
        $"Hi owner, someone bought a {e.Item.Name} on the website. Take a look!");
    }
  }

  // // ----------- CASH REGISTER CLASS--------------
  public class CashRegister 
  {
    // Delegate type for the event
    public delegate void SaleEventHandler(object source, ItemEventArgs args);

    // Event declaration
    public event SaleEventHandler SaleEvent;

    public void Sell(Item item)
    {
      Console.WriteLine("Sale has been recorded! Notifying parties...");

      // Publish sale event
      OnSale(item);
    }

    protected virtual void OnSale(Item item)
    {
      if(SaleEvent != null) // Check if there are any subscribers
        SaleEvent(this, new ItemEventArgs() {Item = item}); // Trigger all subscribers

      Console.WriteLine("Finished notifying all parties");
    }
  }

  // ----------- MAIN CLASS --------------
  public class Program {
    public static void Main (string[] args) {
      var backpack = new Item() { Name = "Backpack" };
      var cashRegister = new CashRegister(); // Publisher

      var emailService = new EmailService(); // Subscriber
      var textMessageService = new TextMessageService(); // Subscriber

      // Adding subscribers to the event
      cashRegister.SaleEvent += emailService.SendEmail;
      cashRegister.SaleEvent += textMessageService.SendTextMessage;

      cashRegister.Sell(backpack);
    }
  }
}

// CONSOLE
// Sale has been recorded! Notifying parties...
// Hi buyer, Thank you for purchasing Backpack!
// Hi owner, someone bought a Backpack on the website. Take a look!
// Finished notifying all parties
```

The last important thing about events is the built-in `EventHandler` and `EventHandler<TEventArgs>` delegates that come with C#. It means we do not really have to create our own delegate in order to create an event. We can skip the delegate variable.

```csharp
// Event declaration
public event EventHandler<ItemEventArgs> SaleEvent;
```

Or if there is no need to pass any event arguments to the subscribers, we can just use the `EventHandler` delegate. 

```csharp
public event EventHandler SaleEvent;
```
