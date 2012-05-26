include Nanoc3::Helpers::LinkTo
# relative_path_to

def absolute_url(identifier_or_item)
  @config[:base_url].gsub(/\/$/, "") + get_item_rep(identifier_or_item).path
end

def link_path(path)
  begin
    relative_path_to(path)
  rescue
    path
  end
end

def link_item(identifier_or_item)
  relative_path_to(route_path(identifier_or_item))
end

# Hyphens are converted to sub-directories in the output folder.
#
# If a file has two extensions like Rails naming conventions, then the first extension
# is used as part of the output file.
#
# sitemap.xml.erb # => sitemap.xml
#
# If the output file does not end with an .html extension, item[:layout] is set to 'none'
# bypassing the use of layouts.
#
def route_path(identifier_or_item)
  get_item_rep(identifier_or_item).path
end

def get_item_rep(identifier_or_item)
  if identifier_or_item.is_a?(Nanoc3::ItemRep) then
    identifier_or_item
  else
    item = identifier_or_item.is_a?(Nanoc3::Item) ? identifier_or_item : item_by_identifier(identifier_or_item)
    if item.nil? then
      raise Exception, "Cannot link to #{identifier_or_item}. No representation generated."
    elsif item.reps.empty? then
      raise Exception, "Cannot link to #{reps.identifier}. No representation generated."
    else
      item.reps[0]
    end
  end
end
