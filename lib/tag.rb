include Nanoc::Helpers::Blogging
module PaginateTags

  def create_tagpages
    tags = tag_set
    puts "Tags: " + tags.to_json

    for tag in tags
      count = items_with_tag(tag).length
      url = "/tag/#{tag}"
      title = "#{count} articles and links tagged with \"#{tag}\""

      @items << Nanoc::Item.new(
        "= render 'tag_page', :tag => '#{tag}'",
        { :title => title },
        url
      )
    end
  end
end

include PaginateTags
