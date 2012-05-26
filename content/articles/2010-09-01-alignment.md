--- 
title: Alignment
tags: 
- Software

comments: true
---
Too many software developers these days don't know enough about the underlying hardware to appreciate some of the design considerations that should be taken into account. It usually works out just fine because of some 
magic occurring at some lower level (i.e. virtual machine, compiler, OS, hardware, ...) but it is still worth knowing about some of these. One of them is alignment.

So what do I mean when I say 'alignment'? I'm in particular referring to variable alignment in structures and on the stack, but this does also apply to alignment of blocks on disks, especially those with a non-512 
byte block size.

A variable is said to be N-byte aligned when its location (memory address) is (integer-)divisible by N. Formally this can be expressed as:

```c
ADDR(var) % N == 0
```

The  next question usually is: Why would I care? Why is it important? You often don't need to care about it directly, since it happens automatically most of the time; the compiler does the magic. Nonetheless, if you 
aren't aligning stuff properly you can get everything from slow performance to memory corruption and general protection faults.

Sometimes you'll see/use something like <code>#pragma pack(1)</code> or <code>`__attribute__((__packed__))`</code> which effectively disables the automatic alignment done by the compiler on structures. This can be desirable if you want to know 
that a structure will look exactly the same in memory as you intended, without any padding added by the compiler. It is usually used for transmitting structures as a whole over a network, over files, etc. As a nice 
side effect, your structure will also have a smaller memory footprint. But be aware that if you use packed structures you'll have to deal with alignment yourself in case you do need it for a particular variable, 
meaning you'll have to add the padding yourself.

Now on to some examples of what can happen with misaligned variables/structures.

Recently I've been writing a PHY and a MAC layer for an ARM SoC. The structure representing the MAC Header looked something like this:


```c
struct MACHdr {
  uint8_t  id;
  uint32_t data[32]
} __attribute__((__packed__));
```

During the initial testing, I did, without much thinking, something along the lines of:


```c
*(uint32_t)hdr->data = 0xffff;
```

ARM CPUs will only allow 32-bit access on addresses aligned on a 4-byte boundary, which is clearly not the case here. This effectively corrupted the 'id' in the packet. Not a nice thing to happen, so be aware of your 
architectures limitations. Especially RISC architectures tend to be very picky about unaligned memory accesses.

Another example of a more picky system is VIA's Padlock. Padlock is a security engine on some VIA CPUs proving an RNG, as well as cryptographic acceleration (for AES and some hashes). To use the AES instructions, 
you'd use something like this gcc inline assembly:

```c
		__asm __volatile(
		"pushf				\n\t"
		"popf				\n\t"
		"rep xcrypt-cbc			\n\t"
			: "+a" (iv), "+c" (count), "+D" (out), "+S" (in)
			: "b" (key), "d" (cw)
			: "cc", "memory"
		);
```

I've come across a similar code segment a year ago, where a careless developer just passed in the iv, out, key and cw without paying any attention to the alignment. This ended up in all sorts of general protection 
faults for a customer. The VIA Padlock Programming Guide is very clear about this: in the normal case the iv, output buffer, input buffer, key and control word (cw) must be aligned on a 16-byte boundary. Otherwise a 
general protection fault will occur, and if this happens in the privileged mode, you'll have a kernel panic. 

While there is a bit that can be set to avoid this strict alignment requirement, setting it and actually making use of it will incur a significant loss in performance.

This leads me to my last example: The x86 and x86_64 (amd64) architecture. On this architecture you won't end up with corruption or general protection faults (at least not usually) but you will incur a performance 
loss when using misaligned data accesses. This is especially significant for double precision floating point data, but also affects integer performance.

A misaligned access on these architectures will require two memory accesses instead of one. While keeping such data in registers and the cache will mitigate the performance hit in some cases, you still don't want to 
waste your CPU time with memory fetches or have cache-line splits if you can easily avoid it.

For more details on the issues on the x86 and x86_64 architectures you can take a look at the Intel Guide for Preparing Applications for the Intel Core Microarchitecture.
