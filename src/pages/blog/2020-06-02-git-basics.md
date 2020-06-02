---
templateKey: blog-post
title: Git Basics
date: '2019-10-01T12:02:31-04:00'
description: >
  Git is a version control tool that allows to keep track of changes to files.
  It keeps record of changes to every single file: when it was changed, who
  changed it and what was the actual change. File copies are handled by git
  branches. Git is not the same thing as GitHub. GitHub and other similar
  services such as GitLab, BitBucket are remote git repositories on the cloud.
tags:
  - git
  - github
---

![git flow](https://drive.google.com/uc?export=view&id=1QnzNbpRaPb5CBZajw3xRNG3Vx1qOb-gk)


TL;DR

|Command| Description |
|--|--|
| `git init` | Initialize Git and create working directory |
| `git add .` | Add changes to git staging area |
| `git commit -m "Commit message"` | Add changes from the staging area to repository |
| `git remote add origin git@github.com:<USERNAME>/<REMOTE_GIT_PATH>.git` |Connecting local repo with remote repo|
| `git push -u origin master` | Pushing local changes to master branch in the remote repo |
| `git push` | Pushing changes to remote after establishing connection |

## 1. Initial configuration
Whether you are trying to version control your project on your local machine or trying to keep a copy in the cloud, you need to let the file system know that you want Git to watch over your files. We do it by running 
```
git init
```

This command basically initializes git and declares the project folder as a working directory for git.

To give yourself an identity when dealing with Git files, you should set your name and email address:
```git
git config --global user.name 'Sardor Nazirov'
git config --global user.email 'abc@email.com'
```

## 2. Adding changes to staging area
Once you `git init` in your project folder, you are good to go to make modifications to your files. After you are satisfied with the changes, next you need to add the changes to the git staging area. Staging area is a place where changes get organized/collected before actually saving it in the repository.

To add a specific file to staging area:
```
git add <file name>
```
For example, `git add start.py`.

To add multiple specific files to staging area:
```
git add <file name> <file name>
```

To add all changes to the staging area:
```
git add .
```

Notice the dot (.) in the third approach. It tracks down all changes in the project and adds them under control of git. 

#### Removing files from staging area
```
git rm --cached <file name>
```

## 3. Committing changes to repository
When necessary changes are added to the staging area, next we need to  **commit** them to the repository.

```
git commit -m "Initial Commit"
```

You can also check the status by running `git status`.

## 4. Pushing local repository to cloud (Github)
First of all, navigate to Github and create a repository. Then copy the remote repository location:

![enter image description here](https://drive.google.com/uc?export=view&id=1AxhqMuP1nXYm8aK7BCkVvm6SFhfgrGvC)

Then on the git working directory, run

```
git remote add origin git@github.com:nazirov91/git_basics_demo.git
git push -u origin master
```

Make sure to change the repo name.

`git push -u origin master` this command is executed only once. After you add the changes to the master branch, you can simply run  `git push` to push your changes to remote repository.

## 5. Branching

In order to create a new branch from the master branch, run
```
git checkout -b <branch name>
```

See a list of branches
```
git branch
```

Checkout a branch MyBranch
```
git checkout MyBranch
```

Merge MyBranch to master branch while on master branch

```
git merge MyBranch
```

## 6. Stashing
Stashing is just like putting changes on the side and reverting back to original temporarily. It is really useful when you are in the middle of making changes and then you realize you need to switch branches to check something.

Stash changes
```
git stash
```

Take the last change off the stash

```
git stash pop
```


### Summary
|Command| Description |
|--|--|
| `git init` | Initialize Git and create working directory |
| `git add .` | Add changes to git staging area |
| `git rm --cached <file name>` | Remove a specific file from staging |
| `git commit -m "Commit message"` | Add changes from the staging area to repository |
| `git remote add origin git@github.com:<USERNAME>/<REMOTE_GIT_PATH>.git` |Connecting local repo with remote repo|
| `git push -u origin master` | Pushing local changes to master branch in the remote repo |
| `git push` | Pushing changes to remote after establishing connection |
| `git clone <repository path>` | Clone an existing local/remote git repository |
|`git checkout branch_name`| Switch to branch_name branch |
| `git checkout -b my_branch` | Create a new branch called my_branch and switch to newly created branch |
