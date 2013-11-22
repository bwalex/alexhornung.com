require 'time'


def tags(items=nil)
  count_tags(items).sort_by{|k,v| k}.map{ |x| x[0] }
end


def partial(identifier_or_item)
  item = identifier_or_item.is_a?(Nanoc3::Item) ? identifier_or_item : item_by_identifier(identifier_or_item)
  item.compiled_content(:snapshot => :pre)
end

def item_by_identifier(identifier)
  items ||= @items
  items.find { |item| item.identifier == identifier }
end


def is_front_page?
    @item.identifier == '/'
end

def site_name
  @config[:site_name]
end

def pretty_time(time)
  #puts time.inspect
  time = Time.parse(time) if not time.is_a?(Time) and not time.nil?
  time.strftime("%d %b %Y") unless time.nil?
end

def featured_count
  @config[:featured_count].to_i
end

def excerpt_count
  @config[:excerpt_count].to_i
end

def to_month_s(month)
  Date.new(2010, month).strftime("%B")
end

