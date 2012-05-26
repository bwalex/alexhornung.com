--- 
title: Serialization and Synchronization (1)
tags: 
- Software
comments: true
---
Since multiprocessor systems became ubiquitous many years ago, software developers have found many solutions to take advantage of them without compromising stability, functionality, etc. The problem that arises with 
true multiprocessing is that several threads can execute at the same time, possibly accessing the same data structures at the same time or otherwise interact in an unwanted manner. Locking will hide intermediate 
states that are not supposed to exist and allow safe operation. Since I mostly work on kernel development, the focus here will be on solutions used in operating systems development.

In the early days of multiprocessor systems, operating systems were quickly made MPsafe (multiprocessor safe) by wrapping most if not all the code into one big mutex lock (on FreeBSD and DragonFly BSD: BGL = big giant 
lock; on Linux: BKL = big kernel lock). While this allowed safe operation on these systems, it didn't offer any performance improvements, actually it ended up decreasing performance since it would still only run one 
thread at each time but would also have the synchronization overhead. Since a mutex can only be held (exclusively) by one executing thread, while this thread was running, no other thread could. Over time, operating 
systems have been breaking down this giant lock into more fine-grained locking mechanisms, often per driver and/or per subsystem locks, but this process is still happening as making systems mpsafe is not an easy task. 
Many problems tend to crop up and some of them, in particular some race conditions are really hard to track down when they just slowly corrupt memory here and there and don't cause any instant panic.

Now let's have a look at some of the possibilities to serialize and synchronize access to resources. In this post I'll introduce critical sections. Later posts will handle other possibilities such as spinlocks, 
adaptive mutexes, serializing tokens, message passing, conditional variables, per-cpu structures, etc.



## Critical Sections

Critical sections are strictly per-CPU and will actually disallow preemption of a certain block of code. This will make any operation appear atomic. The syntax is usually along the lines of:
```c
crit_enter();
....
crit_exit();
```

The actual implementation behind this is usually along the lines of either bumping the priority of the executing thread on crit_enter() above all normal priority levels or handle a count of critical sections being 
held in the thread information and let the scheduler check if there are critical sections held before trying to preempt any thread. They also tend to disable interrupts, so they are only intended to lock rather short 
sections of code.

The limitation of critical sections should be clear: They are strictly per-CPU. They won't protect data structures from concurrent access from other CPUs or, more generally other execution units. They are only 
intended to avoid preemption by, for example, interrupt handlers, or if kernel threads preempt each other by other kernel threads. 
