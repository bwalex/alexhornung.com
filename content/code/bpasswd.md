---
title: BPasswd
layout: default
---
## Introduction

BPasswd is a strong password generator. It derives passwords from a master password and a usage-specific "salt". Since BPasswd is aimed at the web, the "salt" is usually something site-specific such as "github", "amazon", "google", etc. In other words, you get to reuse one (or a handful) of passwords, but end up with a unique password for each site. Best of all is that you don't need to carry around some key file or trust a third-party service like you'd do with a password manager.

For a more generic introduction, do read the [article](/2014/01/15/introducing-bpasswd2/).

## Firefox, Chrome and web

BPasswd2 is available as a Firefox addon, a Chrome extension and a simple website. BPasswd2 is the new version of the original BPasswd addon that has been available for over a year now. It is fully backwards compatible, but offers more advanced settings which allow you to define per-site/salt options.

The website version is pure HTML + JavaScript, so it runs on your browser only and never submits anything to any server. You can even simply download the HTML and JavaScript files and run them locally.

The derived password is generated from an input master password and a "salt" (usually the site's domain without the TLD). All three versions of BPasswd have a number of other settings that affect the generated password: "cost", "generation/mapping method" and "maximum password length". The first is described under the "How it works" section. The last one should be obvious - by default BPasswd generates 32-character (or 30-character if z85 is used) passwords, but some websites have password length limitations. This setting simply trims the password to whatever number of characters you tell it. The "generation/mapping method" option defines how the raw output of the bcrypt function is mapped back to ASCII characters:

 - base64: simple base64 encoding of the derived key, resulting in a password of length 32, using the characters: a-z A-Z 0-9 + /
 - conservative: same as base64, except the resulting password (also of length 32) only contains a-z, A-Z and 0-9 (no special characters).
 - z85: ZeroMQ Base-85 encoding[2], resulting in a password of length 30, using the characters: a-z A-Z 0-9 . - : + = ^ ! ? * ? & < > ( ) [ ] { } @ % $ #


The strongest passwords are the ones generated through the 'z85' mapping function, as they contain up to 85 different characters. However, some websites are really picky about which characters they allow in passwords, so 'base64' is the default and 'conservative' can be used for the pickiest of sites. 'base64' was the only mapping function supported and used in the first version of BPasswd.


The Firefox and Chrome version can additionally store these site/salt-specific settings (and synchronize them using firefox sync/chrome sync). The web version uses HTML5 'localStorage' (localStorage stores things locally in your browser, no server involved) to store site/salt-specific settings, but obviously cannot sync these settings.

This way you can for example store a setting for paypal, so it only ever generates passwords that are 20 characters long. Every time you generate a password for paypal, it'll automatically use the saved settings - and it'll let you know that it did, too.


## How it works

A derived password for a specific site (salt) is generated as follows:

 1. The 'salt' is hashed using HMAC-SHA-256 keyed with the SHA256-hashed 'password'.

 2. The input to bcrypt is this hashed salt, the original 'password' and the cost.

 3. The output of bcrypt is a derived key of exactly 192 bits (24 bytes). This output is mapped back to ASCII characters through the mapping function defined by the generation method input.


The 'cost' input to bcrypt defines the number of iterations of the algorithm. The higher this value, the more compute intensive the key derivation is. The actual number of iterations is 2^(cost), so increasing the 'cost' by 1 roughly doubles the time it takes to derive a key. BPasswd (and BPasswd2) use a default cost of '6', i.e. 64 iterations.


As mentioned earlier, the result of this process is not a strong crytopgrahic key due to the salt not being random. However, it is more than appropriate as a password.


[1]: //wwww.alexhornung.com/foobar
[2]: http://rfc.zeromq.org/spec:32


