require 'nokogiri'

class CssInjectFilter < Nanoc3::Filter
  identifier :css_inject
  def run(content, args = {})
    if @item[:css]
      doc = Nokogiri::HTML(content)
      head = doc.at_css('head')
      @item[:css].each do |style|
        puts "Injecting <link> node for: #{style}"
        node = Nokogiri::XML::Node.new("link", doc)
        node['href'] = style
        node['rel'] = 'stylesheet'
        node['type'] = 'text/css'
        head << node
      end
      return doc.to_html
    else
      return content
    end
  end
end
