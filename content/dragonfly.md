---
title: DragonFly
layout: default
---
I've been a [DragonFly BSD][dragonfly] committer since mid 2009, and have since contributed to several parts of the OS,
mostly to the kernel and drivers as can be seen in the non-exhaustive list below.
If you want to contact me regarding anything DragonFly related, I suggest you do so by sending me an
 email to alexh (at) dragonflybsd (dot) org.

If you want me to work on a specific area or require some functionality that is currently not present,
you can sponsor me to do so; contact me for further details.


| Contribution                                    | Description                                                                                                                                                            | Release |
|:------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------|
| [DevFS][devfs]                                  | Device File System                                                                                                                                                     | 2.3     |
| Active Disk Probing                             | probes for on-disk metadata on connection of device                                                                                                                    | 2.3     |
| [unix98 PTY support][unix98]                    |                                                                                                                                                                        | 2.3     |
| Writing/updating/porting several drivers        | (e.g. hifn, glxsb, cs5536, nsclcsio,kbdmux, vn, aesni, ubsec, ...)                                                                                                     |         |
| Kernel minidump support                         | ported from FreeBSD                                                                                                                                                    | 2.5     |
| GPIO framework                                  | a lightweight GPIO framework, modelled after OpenBSD's                                                                                                                 | 2.5     |
| [Watchdog framework][watchdog]                  | a lightweight watchdog framework                                                                                                                                       | 2.5     |
| [Linux Emulation][linuxulator]                  | updated to Linux Kernel 2.6 syscalls                                                                                                                                   | 2.5     |
| [dsched][dsched]                                | an I/O Scheduler Framework, allowing for pluggable I/O scheduling policies                                                                                             | 2.7     |
| dsched FQ policy                                | a dsched fair queueing policy                                                                                                                                          | 2.7     |
| [proplib][proplib]                              | ported from NetBSD                                                                                                                                                     | 2.7     |
| [dm][dm]                                        | device mapper, initially ported from NetBSD, mostly rewritten by now                                                                                                   | 2.7     |
| dm_target_crypt                                 | A disk encryption target (think dm-crypt) compatible with Linux' cryptsetup, but written from sractch                                                                  | 2.7     |
| [initrd support][mkinitrd]                      | Support for an initial ramdisk, a la Linux initramfs, which can be used to mount a supported FS from any volume as root mount (e.g. LVM, crypt, ISCSI volumes)         | 2.7     |
| [udev][udevd], [libdevattr][devattr]            | A device enumeration library and supporting daemon                                                                                                                     | 2.7     |
| [opencrypto][opencrypto] SMP improvements       | involved in improving the performance of the software crypto (cryptosoft) by taking advantage of multiple CPU cores, as well as several fixes                          | 2.7     |
| [opencrypto][opencrypto] AES additional ciphers | Implemented AES XTS, Serpent CBC and XTS, Twofish CBC and XTS in opencrypto                                                                                            | 2.7, 2.11 |
| utmpx and wtmpx support                         |                                                                                                                                                                        | 2.9     |
| [VIA Padlock][padlock] RNG driver               | Added support to the VIA padlock driver to feed the kernel with entropy                                                                                                | 2.11    |
| libdm                                           | libdm is a simple BSD-licensed device mapper library that is API-compatible with libdevicemapper                                                                       | 2.11    |
| [tcplay][tcplay] and [libtcplay][libtcplay]     | tcplay is a simple BSD-licensed tool that allows reation, managing and mapping of TrueCrypt volumes. It is written from scratch and 100% compatible with TrueCrypt     | 2.11    |
| dfregress                                       | A small and UNIXy regression test framework and test driver                                                                                                            | 2.13    |




[dragonfly]: http://www.dragonflybsd.org "The DragonFly BSD Project"
[devfs]: http://leaf.dragonflybsd.org/cgi/web-man?command=devfs&section=ANY "DevFS"
[unix98]: http://leaf.dragonflybsd.org/cgi/web-man?command=posix_openpt&section=ANY "unix98 PTYs"
[watchdog]: http://leaf.dragonflybsd.org/cgi/web-man?command=watchdog&section=ANY "watchdog"
[linuxulator]: http://leaf.dragonflybsd.org/cgi/web-man?command=linux&section=ANY "linux emu"
[dsched]: http://leaf.dragonflybsd.org/cgi/web-man?command=dsched&section=ANY
[proplib]: http://leaf.dragonflybsd.org/cgi/web-man?command=proplib
[dm]: http://leaf.dragonflybsd.org/cgi/web-man?command=dm&section=4
[mkinitrd]: http://leaf.dragonflybsd.org/cgi/web-man?command=mkinitrd
[udevd]: http://leaf.dragonflybsd.org/cgi/web-man?command=udevd
[devattr]: http://leaf.dragonflybsd.org/cgi/web-man?command=devattr&section=3
[opencrypto]: http://leaf.dragonflybsd.org/cgi/web-man?command=crypto&section=9
[padlock]: http://leaf.dragonflybsd.org/cgi/web-man?command=padlock&section=4
[tcplay]: http://leaf.dragonflybsd.org/cgi/web-man?command=tcplay&section=8
[libtcplay]: http://leaf.dragonflybsd.org/cgi/web-man?command=tcplay&section=3
