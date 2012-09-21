require 'nokogiri'

class JsInjectFilter < Nanoc3::Filter
  identifier :js_inject
  def run(content, args = {})
    if @item[:js]
      doc = Nokogiri::HTML(content)
      head = doc.at_css('head')
      @item[:js].each do |script|
        puts "Injecting <script> node for: #{script}"
        node = Nokogiri::XML::Node.new("script", doc)
        node['src'] = script
        head << node
      end
      return doc.to_html
    else
      return content
    end
  end
end
