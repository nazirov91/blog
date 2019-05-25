---
templateKey: blog-post
title: >-
  Why Blockchain Is Too Big To Ignore Or Build A Blockchain With JavaScript
  (Part 1)
date: '2019-05-25T00:55:52-04:00'
description: (~7min read)
tags:
  - Blockchain
  - Bitcoin
  - Cryptocurrency
  - Hashing
---
![\[HEADER\]](https://drive.google.com/uc?export=view&id=1k6OYBj3ToAHUKzRSPvObnlInlHV90_ny)

- Part 1 (This article)
- Part 2

Prerequisites: Basic knowledge of JavaScript

You might be thinking, why would you even want to build a "Blockchain" system with JavaScript. Isn't it a language to make websites? Well, it is. But it can also be used to explain the concepts of blockchain in a simple way. Blockchain is already **way to big** to ignore. Some people still think that blockchain is the same as Bitcoin. Although it may have started with cryptocurrencies, blockchain could be applied in many other areas of our lives, beyond the cryptos, that can change the way our societies function today. In this article, let us clear out the fog before the notion of blockchain and create a simple blockchain system of our own to see how it works under the hood.

## A simple explanation of blockchain
In 1440, humanity invented one of the most essential tools in the history - printing press. The printing press allowed us to distribute knowledge to ordinary people, which was only available to a tiny percentage of the population before. Unlike carving or handwriting, printing machines copied and created educational materials much faster. This invention filled a massive gap in the development of human history. Let's call that gap the "**Knowledge Gap**." 

![a](https://drive.google.com/uc?export=view&id=1FSLqOp939dCq74TCB3SKOS4QjBs8K47e)

Then, towards the end of the 1800s, we invented the first engine. It enabled us to run most of the devices and machines without the use of human labor. It was one of the reasons for abandoning slavery. We could say that this invention filled the "**Power Gap**"

![\[Power gap\]](https://drive.google.com/uc?export=view&id=1Y45s2ZAyzIdJWKKUJNsfIezctgCQWnXE)

In the 1980s, there was another invention, that changed the way we communicate, interact, and socialize today - the internet. It was the stepping stones of building the world where the meaning of distance would change completely. The Internet brought everyone closer regardless of their locations. This revolution filled one more gap in history, which is the **Distance Gap**

![\[Distance gap\]](https://drive.google.com/uc?export=view&id=1CXdU5Q2Mgh9YtVRTehDHJArN5EVJEy87)

Now, you probably guessed where I am going with this. The blockchain technology is going to fill another gap - the **Trust Gap.** It may seem like people do not care that much about trust for it to be called a *"gap in history"*, but in many areas, such as business, trust is everything. Success in business heavily depends on trust. People are naturally inclined not to trust businesses. It is a normal thing to do. However, there is an underlying reason for that. The way transact today is not totally transparent. Exchange of goods and services relies on many layers of intermediaries (middlemen). Those middlemen differ from one another with they way keep records, conduct business, etc.

![\[Trurst Gap\]](https://drive.google.com/uc?export=view&id=1Sv-mPXyGo_8-3OZVFFHgwutS4Xd6m8rf)

Let's take buying a used car as an example. There are multiple ways to buy a used car: we could buy it from a dealership or from an individual. Either way, it can be really challenging to get the full history of the car, from the time it was manufactured, to the time it was put on the market for resale. People always try to sell their cars at the highest price. Even if that means hiding an accident or lying about some damages, it may not be possible to see the mechanical issues of the car at the time of testing or negotiation. 

What if there was a system of records, where every single event in a car's history would be captured and visible to everyone? What if it had a secure authentication process and ensured that the records could not be modified once it was added? This is where the blockchain comes in. A blockchain is a distributed, decentralized and immutable public ledger. It uses a reliable set of algorithms to add and keep records of anything we want and make them available to the public.

Before continuing with the article, we need to clarify the meaning of some words.

The first one is **decentralized**.

**Decentralized** - means power is delegated from a central authority to regional and local authorities. There is no single point for decision making. For example, look at the fast food franchise chains. Even though they have a parent restaurant that monitors the overall progress, chains are responsible for their own operations. Centralized refers to placing the power and authority in a center. For example, when you want to send a funny picture through Gmail, you log in to your Gmail account, upload the image and send it to a receiver. In this case, you have to trust that Google keeps your message private. You have to trust that they don't decide to sell your data to someone one day. Also, if the Gmail servers are down, all of your data is gone.

![a](https://drive.google.com/uc?export=view&id=17xD88aPF8loUaEAoG64-hnoewplylsj1)
A - Centralized | B - Decentralized

**Distributed** - refers to the differences of locations. In a non-distributed environment, all the parts of a system are in a single physical location. In a distributed environment, parts of the system are placed in separate locations. For example, say you create a powerpoint presentation and save it your computer. Currently, that document is stored only on your local machine and it is not distributed. Now, say you take a copy of the exact same material and send it to a few of your peers as a backup. Then your document would be stored in a distributed environment.

![\[Distributed vs Non-Distributed\]](https://drive.google.com/uc?export=view&id=1Ea-zw4tx0O8DhExonsWkwVxpiK8_aR7z)

**Immutable** - means once a record is created, it can never be modified.

**Ledger** - is another name for a book or digital system that contains a list of records. For example, a financial accounts book of a company where they track debits and credits.

![\[Ledger example picture\]](https://drive.google.com/uc?export=view&id=1vKkDr2fykco-4mA5F8fa4ZX89qcH-ToR)

>By the way, actually there are some services, such as **_Carfax_**, that keep track of changes to motor vehicles. However, they lack critical components of a trustworthy system: they can be tampered with, and only the company profits from selling information gathered by the community. 


##  Technical details of blockchain

So a blockchain is a **chain of information blocks** stored in a *distributed* database that maintains a continuously increasing list of records (ledger). 

There are three main components of a block: 
1.  **data**
2. **hash of the current block**
3. **hash of the previous block**

The type of data in a block depends on the kind of blockchain system. **Bitcoin** for example stores the history of a transaction between the receiver and sender and the number of coins in a block.

**Hash** - is just like a digital signature of a block. Each block would have a unique hash value. In technical terms, a hash is a result of turning an arbitrarily large amount of data into a fixed-length key by running it through a hashing algorithm. Bitcoin, for example, uses [SHA-256](https://en.wikipedia.org/wiki/SHA-2) hashing algorithm.

![\[HASHING and HASH\]](https://drive.google.com/uc?export=view&id=1Vf869WoUVHVni235bVDxYD-LRn5eyn2B)

Furthermore, each block must be linked to the previous block by its hash key. It is critical to keep the chains connected; otherwise the whole system collapses. That is also one of the main advantages of blockchain technology. Even a small change in the chaining invalidates all of the previous blocks.

In order to prevent attacks or tampering on the chains, blockchains implement a mechanism called **Proof-Of-Work**. It basically slows down the process of adding new blocks. In bitcoin's case, it takes about 10 minutes to add a new block. 

Another vital element of a blockchain system is the **Consensus**. It means validating each new block by more 50% of the peers before adding it to the chain. 


### Summary
Blockchain is the next revolution that will change the foundation of trust in business. Even though it started out with the popular cryptocurrency - Bitcoin, people have realized that it can be applied in almost any field where the exchange of value occurs. Blockchain is a distributed, decentralized and immutable public ledger that is available for the public. It uses complex cryptographic algorithms to secure and maintain the system. 

In the second part of the article, we will be building a simple blockchain system using JavaScript.

### Part 2 > Why Blockchain Is Too Big To Ignore Or Build A Blockchain With JavaScript (Part 2)
