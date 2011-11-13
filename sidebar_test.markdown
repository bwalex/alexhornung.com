---
title: Sidebar Test
layout: default

sidebars:
  - title:    Sidebar 1
    content:  "<b>content!</b>"
    items:
      - url:  "#"
        text: Home

      - url:  "#"
        text: Foo

      - url:  "#"
        text: Bar

  - title:    Sidebar 2
    items:
      - url:  "#"
        text: Haha

      - url:  "#"
        text: Hoho
---

# Test

This is just a test page, exercising the sidebar that is specified in the YAML front matter.

Testing markdown with_many_underscores_in_a_single_word and_with_less underscores!

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}

Cheers, yo.
