require 'rainpress'
require 'uglifier'

# This filter can process javascript and stylesheet files and based on their
# extension it applies Rainpress or JSMin to its contents.
class MinifyFilter < Nanoc3::Filter
  identifier :minify
  def run(content, args = {})
    case @item[:extension]
    when 'css' then Rainpress.compress(content)
    when 'js' then Uglifier.compile(content)
    else
      content
    end
  end
end
