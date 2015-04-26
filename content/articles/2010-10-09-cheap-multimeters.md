--- 
title: Cheap Multimeters
tags: 
- Hardware
comments: true
---

Many people buy their multimeters on eBay or similar sites, usually because they are much cheaper there. It is understandable that someone doesn't want to spend over 100 EUR/GBP for a multimeter when there are 20 
EUR/GBP multimeters and even cheaper on eBay with, supposedly, the same features. Many years ago I bought one of these cheap eBay multimeters, too: a HoldPeak HP-6870; it has all the features one could hope for, 
including capacitance and inductance measurement. So why am I saying you shouldn't go for similar items?

First off, here is a photo of the multimeter in question. As can be seen it's a manual range multimeter with tons of 'features', and according to the top cover, it's even rated 'CAT II'.

![cheap multimeter, front view](//farm5.static.flickr.com/4110/5020142438_dcf608c128_z.jpg)

Since I finally decided to recycle the multimeter, I opened it up to get a closer look at what I was throwing away. Below is a picture of the front side of the PCB. The first thing that I noticed were all those little 
trimpots. Trimpots are a poor choice to calibrate a multimeter, they are definitely not accurate and don't maintain their exact position if the multimeter is moved, shocked (i.e. dropped) or similar abrupt movements.

See that piece of metal just above the inner two input jacks? That's the shunt resistor. In principle there's nothing wrong with bare shunt resistors, except that if you take a closer look, you'll see that it seems 
broken and soldered together. No, that's not a sign of quality. The input jacks themselves also don't look very sturdy; just some pieces of metal that insert themselves onto some plastic on the top side.

![cheap chinese multimeter, PCB front](//farm5.static.flickr.com/4089/5020141002_d629b7034a_z.jpg)

There's no input protection to see on the top side, so one would think it's on the back side of the PCB, right? Right...?

Well, no. On the back side of the PCB there's nothing except a cheap buzzer (top left), some very bad solder joints on the through-hole components on the other side, a dodgy wire going from the top to the bottom, some 
burn marks which clearly show that the board was hand-soldered (and assembled) and glass fuses.

Glass fuses in a multimeter? Really? Glass fuses are only rated to interrupt a current of about 3 - 10 times their rated current value, so in this case somewhere between 30A and 100A. Sounds good? It's not. You can 
easily exceed that if you work on mains, circuit breakers, etc, yet the meter is supposedly rated CAT II according to IEC 61010 as we've seen on the first photo. CAT II means that it's safe to work on a circuit 
directly connected to the mains. Usually multimeters use HRC fuses (high rupture capacity) which are rated to interrupt a current in excess of 6kA (6000A), and for good reason.

On top of that comes the fact that there is no input protection whatsoever. Any decent multimeter will have a range of input protection, but first and foremost Metal Oxide Varistors, commonly called MOVs. MOVs are 
there to absorb part of a voltage surge/transient by directing it away from the circuit it protects, since MOVs have a very low resistance at very high voltages and an extremely high resistance at normal voltages. If 
a critical threshold is reached, they melt and/or vaporize, but in doing so they protect the rest of the circuit and especially the user of the device. Yet there's not a single MOV in this multimeter. This one will 
simply blow up in your hands instead of just dying, there's not a chance on earth that this multimeter is actually in accordance with IEC 61010 CAT II.

![cheap chinese multimeter, back PCB](//farm5.static.flickr.com/4151/5019530919_7122a28d27_z.jpg)

I've mainly mentioned safety reasons not to use this kind of multimeter as it can be really dangerous to the user. If you still don't believe me, take a look at the video below.

<object width="640" height="385"><param value="//www.youtube.com/v/M-FZP1U2dkM?fs=1&amp;hl=en_US" name="movie"><param value="true" name="allowFullScreen"><param value="always" name="allowscriptaccess"><embed 
width="640" height="385" type="application/x-shockwave-flash" src="//www.youtube.com/v/M-FZP1U2dkM?fs=1&amp;hl=en_US" allowscriptaccess="always" allowfullscreen="true"></object>

You might argue that you don't really care about the safety of the meter if you only work on low voltage electronics. While I disagree with that statement, last but not least because even low currents and voltages can 
be deadly, I can understand that attitude. But there are more reasons why you'd want to spend more money on a decent multimeter. You want a multimeter that you can trust. One that gives you the same reading time and 
time again, so there is a way of comparing measurements. Well, it definitely isn't the case with these cheap ones. You want a multimeter with a decent accuracy. Don't be fooled by the supposed specifications mentioned 
on the websites of these products, they are no way near reality. The accuracy on these cheapos tends to be quite bad.

To sum it up, there are plenty of reasons not to buy one of these very cheap multimeters, first and foremost your safety. If you don't want to spend the money on a better one, then just don't buy any multimeter at 
all. If you want a good multimeter, you don't need to go all the way up to Fluke, probably the most expensive multimeters. There are plenty of other good brands that give you a high degree of safety, accuracy and 
features at a lower price: BK Precision, Extech, Agilent, ... Personally I have an Agilent U1242A with which I'm very happy:

![Agilent U1242A multimeter](//farm5.static.flickr.com/4085/5020139482_96f5e6f625_z.jpg)

