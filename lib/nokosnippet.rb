require 'nokogiri'
require 'sanitize'

def snippet(input, num_chars = 140, truncate_string = "...")
        doc = Sanitize.clean(input)

        return doc[0..num_chars] + truncate_string
end
