include Nanoc::Helpers::Blogging
module Paginate

  def create_paginate
    articles_to_paginate = sorted_articles

    article_groups = []
    until articles_to_paginate.empty?
      article_groups << articles_to_paginate.slice!(0..config[:page_size]-1)
    end

    puts "#{article_groups.length} article groups!"

    article_groups.each_with_index do |subarticles, i|
      puts "#{subarticles.length} subarticles!"
      first = i*config[:page_size] + 1
      last  = (i+1)*config[:page_size]

      url = "/" if i == 0
      url = "/archive/#{i}/" if i > 0
      title = nil #if i == 0
      #title = "Archive (articles #{first} to #{last})" if i > 0
      prev_link = nil if i == 0
      prev_link = '/' if i == 1
      prev_link = "/archive/#{i-1}/" if i > 1
      next_link = nil if article_groups.length == i+1
      next_link = "/archive/#{i+1}/" if article_groups.length > i+1


      @items << Nanoc::Item.new(
        "= render 'pagination_page', :item_id => #{i}",
        { :title => title, :prev_link => prev_link, :next_link => next_link, :kind => 'post_index', :archive_index => i+1, :archive_total => article_groups.length},
        url
      )
    end
  end
end

include Paginate
