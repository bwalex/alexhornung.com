--- 
title: Serialization and Synchronization (2)
tags: 
- Software
comments: true
---


In the previous post I discussed the basic ideas behind serialization and synchronization on multiprocessor systems and introduced critical sections as one possible per-CPU approach. In this post I'll present the 
first real multiprocessor serialization/synchronization mechanism: the spinlock.


## Spinlocks

Spinlocks are in principle the simplest locking method. The concept behind them is to actively wait (spin) for a lock to become available, then acquire, hold it while doing the processing and finally release it so the 
next thread can acquire it. They are suitable only for (very) short and non-blocking code sections, though. A typical usage example would be access, insertion and deletion from a list. After all you wouldn't want 
someone else to change your list while you are iterating through it.

A main keyword before was the active wait, or spinning. This means that the acquisition routine actually loops until it can acquire the lock, so the thread will (possibly) remain scheduled. The typical spinlock 
implementation on common desktop systems (x86, x86_64/amd64) will use the highly efficient cmpxchg instruction. It allows to atomically compare a value and if it fulfills a certain condition (refer to some CPU 
programming manual) exchange it for some other. More generically, without using the cmpxchg instruction, the acquisition routine could look like this:

```c
int lock_acquired = 0;
void spin_lock()
{
	while(lock_acquired == 1)
		;
	lock_acquired = 1;
}

void spin_unlock()
{
	lock_acquired = 0;
}
```

Actual implementations are somewhat more complicated and can allow for a shared access model. In this model both exclusive and shared locks exist. The concept is that a lock can be shared/held by multiple threads at 
once if they requested shared locking and only perform read operations. Whenever another thread requests an exclusive lock, this will only be granted once all shared lock holders have released it.

Some implementations also refrain from simply actively looping until the lock becomes available and instead use what is called 'adaptive spinlocks'. This variation will use a hybrid approach: it will loop for some 
time, then sleep for some time; repeatedly, until the lock becomes available. This is clearly more efficient than just actively looping all the time, but also complicates the code.
It is important to note that spinlocks should only be used for short code sections and are not suitable to be held across blocking conditions. If these conditions are met, spinlocks offer a simple, fast and low 
overhead locking mechanism.
